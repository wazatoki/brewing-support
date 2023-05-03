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

func createExpectedAppGroupEntity2Slice() *domain.AppGroups {
	return &domain.AppGroups{
		createExpectedAppGroup1Entity(),
		createExpectedAppGroup2Entity(),
		createExpectedAppGroup3Entity(),
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
		opeUserID string
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
				appGroup:  *createExpectedAppGroup1Entity(),
				opeUserID: "opeUserID1",
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

				err := deleteDbData(db)
				return err
			})

			if e != nil {
				t.Errorf("AppGroupRepo.Insert() error = %v", e)
			}

			_, e = repo.Insert(tt.args.appGroup, tt.args.opeUserID)
			if e != nil {
				t.Errorf("AppGroupRepo.Insert() error = %v", e)
			}

			e = tt.fields.database.WithDbContext(func(db *sqlx.DB) error {

				queryStr := "select from app_groups"

				// クエリをDBドライバに併せて再構築
				queryStr = db.Rebind(queryStr)

				// データ取得
				err := db.Get(repo, queryStr)

				return err
			})
			if e != nil {
				t.Errorf("AppGroupRepo.Insert() error = %v", e)
			}

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

				err := deleteDbData(db)
				if err != nil {
					return err
				}

				err = insertTestData(db)
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

				err := deleteDbData(db)
				if err != nil {
					return err
				}

				err = insertTestData(db)
				return err
			})

			if e != nil {
				t.Errorf("AppGroupRepo.Select() error = %v", e)
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

func TestAppGroupRepo_Update(t *testing.T) {
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
			name:   "update test data",
			fields: fields(*NewAppGroupRepo()),
			args: args{
				appGroup: domain.AppGroup{
					ID:   "appGroupId1",
					Name: "updated app group name 1",
				},
				opeUserID: "appUserId1",
			},
			want: "updated app group name 1",
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

				err := deleteDbData(db)
				if err != nil {
					return err
				}

				err = insertTestData(db)
				return err
			})
			if e != nil {
				t.Errorf("AppGroupRepo.Update() error = %v", e)
			}

			if err := repo.Update(tt.args.appGroup, tt.args.opeUserID); (err != nil) != tt.wantErr {
				t.Errorf("AppGroupRepo.Update() error = %v, wantErr %v", err, tt.wantErr)
			}

			e = tt.fields.database.WithDbContext(func(db *sqlx.DB) error {

				queryStr := "select from app_groups where id = 'appGroupId1'"

				// クエリをDBドライバに併せて再構築
				queryStr = db.Rebind(queryStr)

				// データ取得
				err := db.Get(repo, queryStr)

				return err
			})
			if e != nil {
				t.Errorf("AppGroupRepo.Update() error = %v", e)
			}

			if repo.Name != tt.want {
				t.Errorf("AppGroupRepo.Update() = %v, want %v", repo.Name, tt.want)
			}
		})
	}
}

func TestAppGroupRepo_Delete(t *testing.T) {
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
		id        string
		opeUserID string
	}
	tests := []struct {
		name    string
		fields  fields
		args    args
		wantErr bool
	}{
		{name: "delete test data",
			fields: fields(*NewAppGroupRepo()),
			args: args{
				id:        "appGroupId1",
				opeUserID: "appUserId1",
			},
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

				err := deleteDbData(db)
				if err != nil {
					return err
				}

				err = insertTestData(db)
				return err
			})
			if e != nil {
				t.Errorf("AppGroupRepo.Delete() error = %v", e)
			}

			if err := repo.Delete(tt.args.id, tt.args.opeUserID); (err != nil) != tt.wantErr {
				t.Errorf("AppGroupRepo.Delete() error = %v, wantErr %v", err, tt.wantErr)
			}
			user, err1 := repo.SelectByID("appGroupId1")
			if err1.Error() != "your search yielded no data" {
				t.Errorf("AppGroupRepo.Delete() error = %v, wantErr %v", err1, tt.wantErr)
			}

			if user != nil {
				t.Errorf("AppGroupRepo.Delete() = %v, want %v", user.ID, "")
			}
		})
	}
}
