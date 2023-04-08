package repositories

import (
	"brewing_support/app/domain"
	"testing"
	"time"

	"github.com/jmoiron/sqlx"
)

func createExpectedAppGroup1Entity() *domain.AppGroup {
	return &domain.AppGroup{
		ID:   "appGroupId1",
		Name: "app group name 1",
	}
}

func TestAppGroupRepo_Insert(t *testing.T) {
	type fields struct {
		database       db
		id             string
		del            bool
		created_at     time.Time
		cre_user_id    string
		updated_at     time.Time
		update_user_id string
		name           string
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
				id:             tt.fields.id,
				del:            tt.fields.del,
				created_at:     tt.fields.created_at,
				cre_user_id:    tt.fields.cre_user_id,
				updated_at:     tt.fields.updated_at,
				update_user_id: tt.fields.update_user_id,
				name:           tt.fields.name,
			}

			tt.fields.database.WithDbContext(func(db *sqlx.DB) error {

				queryStr := "delete from app_groups"

				// クエリをDBドライバに併せて再構築
				queryStr = db.Rebind(queryStr)

				// データ消去
				_, err := db.Exec(queryStr)

				return err
			})

			repo.Insert(tt.args.appGroup, tt.args.opeUserID)

			tt.fields.database.WithDbContext(func(db *sqlx.DB) error {

				queryStr := "select from app_groups"

				// クエリをDBドライバに併せて再構築
				queryStr = db.Rebind(queryStr)

				// データ取得
				err := db.Get(repo, queryStr)

				return err
			})

			if repo.name != tt.want {
				t.Errorf("AppGroupRepo.Insert() = %v, want %v", repo.name, tt.want)
			}
		})
	}
}
