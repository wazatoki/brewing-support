package repositories

import (
	"brewing_support/app/domain"
	"brewing_support/app/utils"
	"errors"
	"time"

	"github.com/jmoiron/sqlx"
)

// Insert insert appUser data to database
func (repo *AppUserRepo) Insert(appUser domain.AppUser, opeUserID string) (string, error) {
	if appUser.ID == "" {
		appUser.ID = utils.CreateID()
	}

	repo.id = appUser.ID
	repo.account_id = appUser.AccountID
	repo.password = appUser.Password
	repo.name = appUser.Name

	repo.cre_user_id = opeUserID
	repo.update_user_id = opeUserID
	repo.created_at = time.Now()
	repo.updated_at = repo.created_at

	repo.del = false

	err := repo.database.WithDbContext(func(db *sqlx.DB) error {

		queryStr := "insert into app_users (" +
			"id, del, created_at, cre_user_id, updated_at, update_user_id," +
			"account_id, password, name" +
			") values (" +
			":id, :del, :created_at, :cre_user_id, :updated_at, :update_user_id," +
			":account_id, :password, :name"

		// クエリをDBドライバに併せて再構築
		queryStr = db.Rebind(queryStr)

		// データ取得処理
		_, err := db.NamedExec(queryStr, *repo)

		return err
	})

	return repo.id, err

}

// SelectByAccountID select appUser data by accountID from database
func (repo *AppUserRepo) SelectByAccountID(accountID string) (*domain.AppUser, error) {
	if accountID == "" {
		return nil, errors.New("accountID must be required")
	}

	err := repo.database.WithDbContext(func(db *sqlx.DB) error {

		queryStr := "select * " +
			"from app_users au " +
			"where au.del = false and au.account_id = ? " +
			"limit 1"

		// クエリをDBドライバに併せて再構築
		queryStr = db.Rebind(queryStr)

		// データ取得処理
		err := db.Get(repo, queryStr, accountID)

		return err
	})

	appUser := domain.AppUser{
		ID:        repo.id,
		AccountID: repo.password,
		Password:  repo.password,
		Name:      repo.name,
		AppGroups: nil,
	}

	return &appUser, err
}

// NewAppUserRepo constructor
func NewAppUserRepo() *AppUserRepo {
	return &AppUserRepo{database: createDB()}
}

// AppUserRepo repository struct
type AppUserRepo struct {
	database       db
	id             string    `db:"id"`
	del            bool      `db:"del"`
	created_at     time.Time `db:"created_at"`
	cre_user_id    string    `db:"cre_user_id"`
	updated_at     time.Time `db:"updated_at"`
	update_user_id string    `db:"update_user_id"`
	account_id     string    `db:"account_id"`
	password       string    `db:"password"`
	name           string    `db:"name"`
}
