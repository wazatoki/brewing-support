package repositories

import (
	"brewing_support/app/domain"
	"brewing_support/app/infrastructures/viper"
	"database/sql"
	"reflect"
	"testing"

	"github.com/jmoiron/sqlx"
)

func createExpectedAppGroup1Entity() *domain.AppGroup {
	return &domain.AppGroup{
		ID:   "appGroupId1",
		Name: "app group name 1",
	}
}

func createExpectedAppGroup2Entity() *domain.AppGroup {
	return &domain.AppGroup{
		ID:   "appGroupId2",
		Name: "app group name 2",
	}
}

func createExpectedAppGroup3Entity() *domain.AppGroup {
	return &domain.AppGroup{
		ID:   "appGroupId3",
		Name: "app group name 3",
	}
}

func createExpectedAppGroupEntity1Slice() domain.AppGroups {
	return domain.AppGroups{
		createExpectedAppGroup1Entity(),
		createExpectedAppGroup2Entity(),
	}
}

func TestAppGroupRepo_Insert(t *testing.T) {
	viper.SetupTestConfig()
	type fields struct {
		database       db
		ID             string
		Del            bool
		Created_at     sql.NullTime
		Cre_user_id    sql.NullString
		Updated_at     sql.NullTime
		Update_user_id sql.NullString
		Name           string
	}
	type args struct {
		appGroup  domain.AppGroup
		opeUserID sql.NullString
	}
	tests := []struct {
		name   string
		fields fields
		args   args
		want   string
	}{
		{
			name:   "insert test data",
			fields: fields(*NewAppGroupRepo()),
			args: args{
				appGroup: *createExpectedAppGroup1Entity(),
				opeUserID: sql.NullString{
					String: "opeUserID1",
					Valid:  false,
				},
			},
			want: "app group name 1",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			repo := &AppGroupRepo{
				database:       tt.fields.database,
				ID:             tt.fields.ID,
				Del:            tt.fields.Del,
				Created_at:     tt.fields.Created_at,
				Cre_user_id:    tt.fields.Cre_user_id,
				Updated_at:     tt.fields.Updated_at,
				Update_user_id: tt.fields.Update_user_id,
				Name:           tt.fields.Name,
			}

			e := tt.fields.database.WithDbContext(func(db *sqlx.DB) error {

				queryStr := "delete from app_groups"

				// クエリをDBドライバに併せて再構築
				queryStr = db.Rebind(queryStr)

				// データ消去
				_, err := db.Exec(queryStr)

				return err
			})

			if e != nil {
				t.Errorf("AppGroupRepo.Insert() error = %v", e)
			}

			repo.Insert(tt.args.appGroup, tt.args.opeUserID)

			tt.fields.database.WithDbContext(func(db *sqlx.DB) error {

				queryStr := "select from app_groups"

				// クエリをDBドライバに併せて再構築
				queryStr = db.Rebind(queryStr)

				// データ取得
				err := db.Get(repo, queryStr)

				return err
			})

			if repo.Name != tt.want {
				t.Errorf("AppGroupRepo.Insert() = %v, want %v", repo.Name, tt.want)
			}
		})
	}
}

func TestAppGroupRepo_SelectByID(t *testing.T) {
	viper.SetupTestConfig()
	type fields struct {
		database       db
		ID             string
		Del            bool
		Created_at     sql.NullTime
		Cre_user_id    sql.NullString
		Updated_at     sql.NullTime
		Update_user_id sql.NullString
		Name           string
	}
	type args struct {
		id string
	}
	tests := []struct {
		name    string
		fields  fields
		args    args
		want    *domain.AppGroup
		wantErr bool
	}{
		{
			name:   "select test data",
			fields: fields(*NewAppGroupRepo()),
			args: args{
				id: "appGroupId1",
			},
			want: createExpectedAppGroup1Entity(),
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			repo := &AppGroupRepo{
				database:       tt.fields.database,
				ID:             tt.fields.ID,
				Del:            tt.fields.Del,
				Created_at:     tt.fields.Created_at,
				Cre_user_id:    tt.fields.Cre_user_id,
				Updated_at:     tt.fields.Updated_at,
				Update_user_id: tt.fields.Update_user_id,
				Name:           tt.fields.Name,
			}

			e := tt.fields.database.WithDbContext(func(db *sqlx.DB) error {

				deleteQueryStr := "delete from app_groups"

				// クエリをDBドライバに併せて再構築
				deleteQueryStr = db.Rebind(deleteQueryStr)

				// データ消去
				_, err := db.Exec(deleteQueryStr)

				if err != nil {
					return err
				}

				insertQueryStr := "insert into app_groups (id, name) values ('appGroupId1', 'app group name 1')"
				insertQueryStr = db.Rebind(insertQueryStr)
				_, err = db.Exec(insertQueryStr)

				return err
			})

			if e != nil {
				t.Errorf("AppGroupRepo.SelectByID() error = %v", e)
			}

			got, err := repo.SelectByID(tt.args.id)

			if (err != nil) != tt.wantErr {
				t.Errorf("AppGroupRepo.SelectByID() error = %v", err)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("AppGroupRepo.SelectByID() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestAppGroupRepo_Select(t *testing.T) {
	viper.SetupTestConfig()
	type fields struct {
		database       db
		ID             string
		Del            bool
		Created_at     sql.NullTime
		Cre_user_id    sql.NullString
		Updated_at     sql.NullTime
		Update_user_id sql.NullString
		Name           string
	}
	tests := []struct {
		name    string
		fields  fields
		want    []*domain.AppGroup
		wantErr bool
	}{
		{
			name:   "select test data",
			fields: fields(*NewAppGroupRepo()),
			want:   createExpectedAppGroupEntity1Slice(),
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			repo := &AppGroupRepo{
				database:       tt.fields.database,
				ID:             tt.fields.ID,
				Del:            tt.fields.Del,
				Created_at:     tt.fields.Created_at,
				Cre_user_id:    tt.fields.Cre_user_id,
				Updated_at:     tt.fields.Updated_at,
				Update_user_id: tt.fields.Update_user_id,
				Name:           tt.fields.Name,
			}

			e := tt.fields.database.WithDbContext(func(db *sqlx.DB) error {

				deleteQueryStr := "delete from app_groups"
				// クエリをDBドライバに併せて再構築
				deleteQueryStr = db.Rebind(deleteQueryStr)
				// データ消去
				_, err := db.Exec(deleteQueryStr)
				if err != nil {
					return err
				}

				insertQueryStr := "insert into app_groups (id, name) values ('appGroupId1', 'app group name 1')"
				insertQueryStr = db.Rebind(insertQueryStr)
				_, err = db.Exec(insertQueryStr)
				if err != nil {
					return err
				}

				insertQueryStr = "insert into app_groups (id, name) values ('appGroupId2', 'app group name 2')"
				insertQueryStr = db.Rebind(insertQueryStr)
				_, err = db.Exec(insertQueryStr)
				if err != nil {
					return err
				}

				return err
			})

			if e != nil {
				t.Errorf("AppGroupRepo.SelectByID() error = %v", e)
			}

			got, err := repo.Select()
			if (err != nil) != tt.wantErr {
				t.Errorf("AppGroupRepo.Select() error = %v", err)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("AppGroupRepo.Select() = %v, want %v", got, tt.want)
			}
		})
	}
}
