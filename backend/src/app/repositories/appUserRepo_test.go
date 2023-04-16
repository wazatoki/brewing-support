package repositories

import (
	"brewing_support/app/domain"
	"brewing_support/app/infrastructures/viper"
	"database/sql"
	"reflect"
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

func createExpectedAppUserEntitySlice() domain.AppUsers {
	return domain.AppUsers{
		createExpectedAppUser1Entity(),
		createExpectedAppUser2Entity(),
	}
}

func TestAppUserRepo_Insert(t *testing.T) {
	viper.SetupTestConfig()
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

				err := deleteDB(db)
				if err != nil {
					return err
				}

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

func TestAppUserRepo_SelectByAccountID(t *testing.T) {
	viper.SetupTestConfig()
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
		accountID string
	}
	tests := []struct {
		name    string
		fields  fields
		args    args
		want    *domain.AppUser
		wantErr bool
	}{
		{
			name:   "select test data",
			fields: fields(*NewAppUserRepo()),
			args: args{
				accountID: "12345",
			},
			want: createExpectedAppUser1Entity(),
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
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

				err := deleteDB(db)
				if err != nil {
					return err
				}

				// テスト用データを追加
				insertQueryStr := "insert into app_users (id, account_id, password, name) values " +
					"('appUserId1', '12345', 'password 1', 'name 1')," +
					"('appUserId2', '22345', 'password 2', 'name 2');" +
					"insert into app_groups (id, name) values " +
					"('appGroupId1', 'app group name 1')," +
					"('appGroupId2', 'app group name 2');" +
					"insert into join_app_users_app_groups (app_users_id, app_groups_id) values " +
					"('appUserId1', 'appGroupId1')," +
					"('appUserId1', 'appGroupId2');"
				insertQueryStr = db.Rebind(insertQueryStr)
				_, err = db.Exec(insertQueryStr)

				return err
			})
			if e != nil {
				t.Errorf("AppUserRepo.SelectByAccountID() error = %v", e)
			}

			got, err := repo.SelectByAccountID(tt.args.accountID)
			if (err != nil) != tt.wantErr {
				t.Errorf("AppUserRepo.SelectByAccountID() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("AppUserRepo.SelectByAccountID() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestAppUserRepo_Select(t *testing.T) {
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
	tests := []struct {
		name    string
		fields  fields
		want    []*domain.AppUser
		wantErr bool
	}{
		{
			name:   "select test data",
			fields: fields(*NewAppUserRepo()),
			want:   createExpectedAppUserEntitySlice(),
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
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

				err := deleteDB(db)
				if err != nil {
					return err
				}

				// テスト用データを追加
				insertQueryStr := "insert into app_users (id, account_id, password, name) values " +
					"('appUserId1', '12345', 'password 1', 'name 1')," +
					"('appUserId2', '22345', 'password 2', 'name 2');" +
					"insert into app_groups (id, name) values " +
					"('appGroupId1', 'app group name 1')," +
					"('appGroupId2', 'app group name 2');" +
					"insert into join_app_users_app_groups (app_users_id, app_groups_id) values " +
					"('appUserId1', 'appGroupId1')," +
					"('appUserId1', 'appGroupId2')," +
					"('appUserId2', 'appGroupId1');"
				insertQueryStr = db.Rebind(insertQueryStr)
				_, err = db.Exec(insertQueryStr)

				return err
			})
			if e != nil {
				t.Errorf("AppUserRepo.Select() error = %v", e)
			}

			got, err := repo.Select()
			if (err != nil) != tt.wantErr {
				t.Errorf("AppUserRepo.Select() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("AppUserRepo.Select() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestAppUserRepo_Update(t *testing.T) {
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
	type want struct {
		name     string
		password string
		groups   domain.AppGroups
	}
	tests := []struct {
		name    string
		fields  fields
		args    args
		want    want
		wantErr bool
	}{
		{
			name:   "update test data",
			fields: fields(*NewAppUserRepo()),
			args: args{
				appUser: domain.AppUser{
					ID:        "appUserId1",
					AccountID: "12345",
					Name:      "updated name 1",
					Password:  "password 11",
					AppGroups: domain.AppGroups{
						createExpectedAppGroup1Entity(),
					},
				},
				opeUserID: "appUserId1",
			},
			want: want{
				name:     "updated name 1",
				password: "password 11",
				groups: domain.AppGroups{
					createExpectedAppGroup1Entity(),
				},
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
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

				err := deleteDB(db)
				if err != nil {
					return err
				}

				// テスト用データを追加
				insertQueryStr := "insert into app_users (id, account_id, password, name) values " +
					"('appUserId1', '12345', 'password 1', 'name 1')," +
					"('appUserId2', '22345', 'password 2', 'name 2');" +
					"insert into app_groups (id, name) values " +
					"('appGroupId1', 'app group name 1')," +
					"('appGroupId2', 'app group name 2');" +
					"insert into join_app_users_app_groups (app_users_id, app_groups_id) values " +
					"('appUserId1', 'appGroupId1')," +
					"('appUserId1', 'appGroupId2')," +
					"('appUserId2', 'appGroupId1');"
				insertQueryStr = db.Rebind(insertQueryStr)
				_, err = db.Exec(insertQueryStr)

				return err
			})
			if e != nil {
				t.Errorf("AppGroupRepo.Update() error = %v", e)
			}

			if err := repo.Update(tt.args.appUser, tt.args.opeUserID); (err != nil) != tt.wantErr {
				t.Errorf("AppUserRepo.Update() error = %v, wantErr %v", err, tt.wantErr)
			}

			user, err1 := repo.SelectByAccountID("12345")
			if err1 != nil {
				t.Errorf("AppUserRepo.Update() error = %v, wantErr %v", err1, tt.wantErr)
			}

			if user.Name != tt.want.name {
				t.Errorf("AppUserRepo.Update() = %v, want %v", user.Name, tt.want.name)
			}
			if user.Password != tt.want.password {
				t.Errorf("AppUserRepo.Update() = %v, want %v", user.Password, tt.want.password)
			}
			if !reflect.DeepEqual(user.AppGroups, tt.want.groups) {
				t.Errorf("AppUserRepo.Update() = %v, want %v", user.AppGroups, tt.want.groups)
			}

		})
	}
}
