package repositories

import (
	"brewing_support/app/domain"
	"brewing_support/app/utils"
	"errors"
	"time"

	"github.com/jmoiron/sqlx"
)

// Insert insert appGroup data to database
func (repo *AppGroupRepo) Insert(appGroup domain.AppGroup, opeUserID string) (string, error) {
	if appGroup.ID == "" {
		appGroup.ID = utils.CreateID()
	}

	repo.id = appGroup.ID
	repo.name = appGroup.Name

	repo.cre_user_id = opeUserID
	repo.update_user_id = opeUserID
	repo.created_at = time.Now()
	repo.updated_at = repo.created_at

	repo.del = false

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

	return repo.id, err

}

// SelectByID select appGroup data by accountID from database
func (repo *AppGroupRepo) SelectByID(id string) (*domain.AppGroup, error) {
	if id == "" {
		return nil, errors.New("id must be required")
	}

	err := repo.database.WithDbContext(func(db *sqlx.DB) error {

		queryStr := "select * " +
			"from app_groups ag " +
			"where ag.del == false and ag.id = ?"

		// クエリをDBドライバに併せて再構築
		queryStr = db.Rebind(queryStr)

		// データ取得処理
		err := db.Get(repo, queryStr, id)

		return err
	})

	appGroup := domain.AppGroup{
		ID:   repo.id,
		Name: repo.name,
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
	id             string    `db:"id"`
	del            bool      `db:"del"`
	created_at     time.Time `db:"created_at"`
	cre_user_id    string    `db:"cre_user_id"`
	updated_at     time.Time `db:"updated_at"`
	update_user_id string    `db:"update_user_id"`
	name           string    `db:"name"`
}
