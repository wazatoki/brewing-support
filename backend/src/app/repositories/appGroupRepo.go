package repositories

import (
	"brewing_support/app/domain"
	"brewing_support/app/utils"
	"database/sql"
	"errors"
	"time"

	"github.com/jmoiron/sqlx"
)

// Insert insert appGroup data to database
func (repo *AppGroupRepo) Insert(appGroup domain.AppGroup, opeUserID sql.NullString) (string, error) {
	if appGroup.ID == "" {
		appGroup.ID = utils.CreateID()
	}

	repo.ID = appGroup.ID
	repo.Name = appGroup.Name

	repo.Cre_user_id = opeUserID
	repo.Update_user_id = opeUserID
	repo.Created_at = sql.NullTime{
		Time:  time.Now(),
		Valid: false,
	}
	repo.Updated_at = repo.Created_at

	repo.Del = false

	err := repo.database.WithDbContext(func(db *sqlx.DB) error {

		queryStr := "insert into app_groups (" +
			"id, del, created_at, cre_user_id, updated_at, update_user_id," +
			"name" +
			") values (" +
			":id, :del, :created_at, :cre_user_id, :updated_at, :update_user_id," +
			":name"

		// クエリをDBドライバに併せて再構築
		queryStr = db.Rebind(queryStr)

		// データ取得処理
		_, err := db.NamedExec(queryStr, *repo)

		return err
	})

	return repo.ID, err

}

// SelectByID select appGroup data by accountID from database
func (repo *AppGroupRepo) SelectByID(id string) (*domain.AppGroup, error) {
	if id == "" {
		return nil, errors.New("id must be required")
	}

	err := repo.database.WithDbContext(func(db *sqlx.DB) error {

		queryStr := "select * " +
			"from app_groups ag " +
			"where ag.del = false and ag.id = ?"

		// クエリをDBドライバに併せて再構築
		queryStr = db.Rebind(queryStr)

		// データ取得処理
		err := db.Get(repo, queryStr, id)

		return err
	})

	appGroup := domain.AppGroup{
		ID:   repo.ID,
		Name: repo.Name,
	}

	return &appGroup, err
}

// NewAppUserRepo constructor
func NewAppGroupRepo() *AppGroupRepo {
	return &AppGroupRepo{database: createDB()}
}

// AppUserRepo repository struct
type AppGroupRepo struct {
	database       db
	ID             string         `db:"id"`
	Del            bool           `db:"del"`
	Created_at     sql.NullTime   `db:"created_at"`
	Cre_user_id    sql.NullString `db:"cre_user_id"`
	Updated_at     sql.NullTime   `db:"updated_at"`
	Update_user_id sql.NullString `db:"update_user_id"`
	Name           string         `db:"name"`
}
