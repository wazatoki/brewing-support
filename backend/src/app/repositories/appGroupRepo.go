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
func (repo *AppGroupRepo) Insert(appGroup domain.AppGroup, opeUserID string) (string, error) {
	if appGroup.ID == "" {
		appGroup.ID = utils.CreateID()
	}

	repo.ID = appGroup.ID
	repo.Name = appGroup.Name

	repo.Cre_user_id = sql.NullString{
		String: opeUserID,
		Valid:  true,
	}
	repo.Update_user_id = repo.Cre_user_id
	repo.Created_at = sql.NullTime{
		Time:  time.Now(),
		Valid: true,
	}
	repo.Updated_at = repo.Created_at

	repo.Del = false

	err := repo.database.WithDbContext(func(db *sqlx.DB) error {

		queryStr := "insert into app_groups (" +
			"id, del, created_at, cre_user_id, updated_at, update_user_id," +
			"name" +
			") values (" +
			":id, :del, :created_at, :cre_user_id, :updated_at, :update_user_id," +
			":name" +
			")"

		// クエリをDBドライバに併せて再構築
		queryStr = db.Rebind(queryStr)

		// データ追加処理
		_, err := db.NamedExec(queryStr, *repo)

		return err
	})

	return repo.ID, err

}

// Update Update appGroup data to database
func (repo *AppGroupRepo) Update(appGroup domain.AppGroup, opeUserID string) error {
	if appGroup.ID == "" {
		return errors.New("id must be required")
	}

	repo.ID = appGroup.ID
	repo.Name = appGroup.Name

	repo.Update_user_id = repo.Cre_user_id
	repo.Updated_at = sql.NullTime{
		Time:  time.Now(),
		Valid: true,
	}

	err := repo.database.WithDbContext(func(db *sqlx.DB) error {

		queryStr := "update app_groups set " +
			"updated_at = :updated_at, update_user_id = :update_user_id," +
			"name = :name " +
			"where id = :id"

		// クエリをDBドライバに併せて再構築
		queryStr = db.Rebind(queryStr)

		// データ更新処理
		_, err := db.NamedExec(queryStr, *repo)

		return err
	})

	return err

}

// Select select all appGroup data from database
func (repo *AppGroupRepo) Select() ([]*domain.AppGroup, error) {

	appGroupRepos := []AppGroupRepo{}
	err := repo.database.WithDbContext(func(db *sqlx.DB) error {
		queryStr := "select * " +
			"from app_groups ag " +
			"where ag.del = false"

		// クエリをDBドライバに併せて再構築
		queryStr = db.Rebind(queryStr)

		// データ取得処理
		err := db.Select(&appGroupRepos, queryStr)

		return err
	})

	appGroups := domain.AppGroups{}
	for _, appGroupRepo := range appGroupRepos {
		appGroup := appGroupRepo.mapRepoObjToDomainObj()
		appGroups = append(appGroups, &appGroup)
	}

	return appGroups, err
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

	if err != nil {
		if err.Error() == "sql: no rows in result set" {

			return nil, errors.New("your search yielded no data")

		} else {
			return nil, err
		}
	}

	appGroup := repo.mapRepoObjToDomainObj()

	return &appGroup, err
}

func (repo *AppGroupRepo) mapRepoObjToDomainObj() domain.AppGroup {
	domainObject := domain.AppGroup{
		ID:   repo.ID,
		Name: repo.Name,
	}
	return domainObject
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
