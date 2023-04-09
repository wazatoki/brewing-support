package repositories

import (
	"brewing_support/app/domain"
	"brewing_support/app/infrastructures/viper"
	"database/sql"
	"testing"

	"github.com/jmoiron/sqlx"
)

func createExpectedAppUser1Entity() *domain.AppUser {
	return &domain.AppUser{
		ID:        "appUserId1",
		AccountID: "12345",
		Name:      "name 1",
		Password:  "password 1",
		AppGroups: createExpectedAppGroupEntity1Slice(),
	}
}

func createExpectedAppUser2Entity() *domain.AppUser {
	return &domain.AppUser{
		ID:        "appUserId2",
		AccountID: "22345",
		Name:      "name 2",
		Password:  "password 2",
		AppGroups: domain.AppGroups{
			createExpectedAppGroup1Entity(),
		},
	}
}

func TestAppUserRepo_Insert(t *testing.T) {
	type fields struct {
		database       db
		ID             string
		Del            bool
		Created_at     sql.NullTime
		Cre_user_id    sql.NullString
		Updated_at     sql.NullTime
		Update_user_id sql.NullString
		Account_id     string
		Password       string
		Name           string
	}
	type args struct {
		appUser   domain.AppUser
		opeUserID string
	}
	tests := []struct {
		name    string
		fields  fields
		args    args
		want    string
		wantErr bool
	}{
		{
			name:   "insert test data",
			fields: fields(*NewAppUserRepo()),
			args: args{
				appUser:   *createExpectedAppUser1Entity(),
				opeUserID: "opeUserID1",
			},
			want: "name 1",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			viper.SetupTestConfig()
			repo := &AppUserRepo{
				database:       tt.fields.database,
				ID:             tt.fields.ID,
				Del:            tt.fields.Del,
				Created_at:     tt.fields.Created_at,
				Cre_user_id:    tt.fields.Cre_user_id,
				Updated_at:     tt.fields.Updated_at,
				Update_user_id: tt.fields.Update_user_id,
				Account_id:     tt.fields.Account_id,
				Password:       tt.fields.Password,
				Name:           tt.fields.Name,
			}

			e := tt.fields.database.WithDbContext(func(db *sqlx.DB) error {

				queryStr := "delete from app_groups;delete from app_users;delete from join_app_users_app_groups"

				// クエリをDBドライバに併せて再構築
				queryStr = db.Rebind(queryStr)

				// データ消去
				_, err := db.Exec(queryStr)

				// 参照先のUserGroupのデータを追加
				insertQueryStr := "insert into app_groups (id, name) values " +
					"('appGroupId1', 'app group name 1')," +
					"('appGroupId2', 'app group name 2')"

				insertQueryStr = db.Rebind(insertQueryStr)
				_, err = db.Exec(insertQueryStr)

				return err
			})
			if e != nil {
				t.Errorf("AppUserRepo.Insert() error = %v", e)
			}

			_, e = repo.Insert(tt.args.appUser, tt.args.opeUserID)
			if e != nil {
				t.Errorf("AppUserRepo.Insert() error = %v", e)
			}

			e = tt.fields.database.WithDbContext(func(db *sqlx.DB) error {

				queryStr := "select from app_Users"

				// クエリをDBドライバに併せて再構築
				queryStr = db.Rebind(queryStr)

				// データ取得
				err := db.Get(repo, queryStr)

				return err
			})
			if e != nil {
				t.Errorf("AppUserRepo.Insert() error = %v", e)
			}

			if repo.Name != tt.want {
				t.Errorf("AppUserRepo.Insert() = %v, want %v", repo.Name, tt.want)
			}
		})
	}
}
