package repositories

import (
	"brewing_support/app/domain"
	"brewing_support/app/utils"
	"database/sql"
	"errors"
	"time"

	"github.com/jmoiron/sqlx"
)

// Insert insert appUser data to database
func (repo *AppUserRepo) Insert(appUser domain.AppUser, opeUserID string) (string, error) {
	if appUser.ID == "" {
		appUser.ID = utils.CreateID()
	}

	repo.ID = appUser.ID
	repo.Account_id = appUser.AccountID
	repo.Password = appUser.Password
	repo.Name = appUser.Name

	repo.Cre_user_id = sql.NullString{
		String: opeUserID,
		Valid:  true,
	}
	repo.Update_user_id = repo.Cre_user_id
	repo.Created_at = sql.NullTime{
		Time:  time.Now(),
		Valid: false,
	}
	repo.Updated_at = repo.Created_at

	repo.Del = false

	err := repo.database.WithDbContext(func(db *sqlx.DB) error {

		queryStr := "insert into app_users (" +
			"id, del, created_at, cre_user_id, updated_at, update_user_id," +
			"account_id, password, name" +
			") values (" +
			":id, :del, :created_at, :cre_user_id, :updated_at, :update_user_id," +
			":account_id, :password, :name" +
			")"

		// クエリをDBドライバに併せて再構築
		queryStr = db.Rebind(queryStr)

		// データ追加処理
		_, err := db.NamedExec(queryStr, *repo)
		if err != nil {
			return err
		}

		queryStr = "insert into join_app_users_app_groups (" +
			"app_users_id, app_groups_id" +
			") values (" +
			"?, ?" +
			")"
		queryStr = db.Rebind(queryStr)
		for _, ag := range appUser.AppGroups {
			_, err = db.Exec(queryStr, repo.ID, ag.ID)
		}
		return err
	})

	return repo.ID, err

}

// Update Update appGroup data to database
func (repo *AppUserRepo) Update(appUser domain.AppUser, opeUserID string) error {
	if appUser.ID == "" {
		return errors.New("id must be required")
	}

	repo.ID = appUser.ID
	repo.Account_id = appUser.AccountID
	repo.Password = appUser.Password
	repo.Name = appUser.Name

	repo.Update_user_id = repo.Cre_user_id
	repo.Updated_at = sql.NullTime{
		Time:  time.Now(),
		Valid: true,
	}

	err := repo.database.WithDbContext(func(db *sqlx.DB) error {

		queryStr := "update app_users set " +
			"updated_at = :updated_at, update_user_id = :update_user_id," +
			"password = :password, name = :name " +
			"where id = :id"

		// クエリをDBドライバに併せて再構築
		queryStr = db.Rebind(queryStr)

		// データ更新処理
		_, err := db.NamedExec(queryStr, *repo)
		if err != nil {
			return err
		}

		// リレーション削除
		queryStr = "delete from join_app_users_app_groups where app_users_id = ?"
		queryStr = db.Rebind(queryStr)
		_, err = db.Exec(queryStr, repo.ID)
		if err != nil {
			return err
		}

		// リレーション挿入
		queryStr = "insert into join_app_users_app_groups (" +
			"app_users_id, app_groups_id" +
			") values (" +
			"?, ?" +
			")"
		queryStr = db.Rebind(queryStr)
		for _, ag := range appUser.AppGroups {
			_, err = db.Exec(queryStr, repo.ID, ag.ID)
		}

		return err
	})

	return err

}

// Select select all appUser data from database
func (repo *AppUserRepo) Select() ([]*domain.AppUser, error) {

	userGroupIDs := []joinUserIDGroupID{}
	appGroupRepo := NewAppGroupRepo()
	allAppGroups, err := appGroupRepo.Select()
	if err != nil {
		return nil, err
	}
	appUserRepos := []AppUserRepo{}

	err = repo.database.WithDbContext(func(db *sqlx.DB) error {
		queryStr := "select * " +
			"from app_users au " +
			"where au.del = false"

		// クエリをDBドライバに併せて再構築
		queryStr = db.Rebind(queryStr)

		// データ取得処理
		err := db.Select(&appUserRepos, queryStr)
		if err != nil {
			return err
		}

		queryStr = "select app_users_id, app_groups_id " +
			"from join_app_users_app_groups "
		queryStr = db.Rebind(queryStr)
		err = db.Select(&userGroupIDs, queryStr)
		if err != nil {
			return err
		}

		return err
	})
	if err != nil {
		return nil, err
	}

	appUsers := domain.AppUsers{}
	for _, appUserRepo := range appUserRepos {
		appGroupIDs := []string{}
		for _, userIDGroupID := range userGroupIDs {
			if userIDGroupID.UserID == appUserRepo.ID {
				appGroupIDs = append(appGroupIDs, userIDGroupID.GroupID)
			}
		}

		appUser := appUserRepo.mapRepoObjToDomainObj(appGroupIDs, allAppGroups)
		appUsers = append(appUsers, &appUser)
	}

	return appUsers, err
}

// SelectByID select appUser data by ID from database
func (repo *AppUserRepo) SelectByID(id string) (*domain.AppUser, error) {
	if id == "" {
		return nil, errors.New("id must be required")
	}

	appGroupIDs := []string{}
	appGroupRepo := NewAppGroupRepo()
	allAppGroups, err := appGroupRepo.Select()
	if err != nil {
		return nil, err
	}

	err = repo.database.WithDbContext(func(db *sqlx.DB) error {

		queryStr := "select * " +
			"from app_users au " +
			"where au.del = false and au.id = ? " +
			"limit 1"
		queryStr = db.Rebind(queryStr)
		err := db.Get(repo, queryStr, id)
		if err != nil {
			return err
		}

		queryStr = "select app_groups_id " +
			"from join_app_users_app_groups " +
			"where app_users_id = ? "
		queryStr = db.Rebind(queryStr)
		err = db.Select(&appGroupIDs, queryStr, repo.ID)
		if err != nil {
			return err
		}

		return err
	})
	if err != nil {
		return nil, err
	}

	appUser := repo.mapRepoObjToDomainObj(appGroupIDs, allAppGroups)

	return &appUser, err
}

// SelectByAccountID select appUser data by accountID from database
func (repo *AppUserRepo) SelectByAccountID(accountID string) (*domain.AppUser, error) {
	if accountID == "" {
		return nil, errors.New("accountID must be required")
	}

	appGroupIDs := []string{}
	appGroupRepo := NewAppGroupRepo()
	allAppGroups, err := appGroupRepo.Select()
	if err != nil {
		return nil, err
	}

	err = repo.database.WithDbContext(func(db *sqlx.DB) error {

		queryStr := "select * " +
			"from app_users au " +
			"where au.del = false and au.account_id = ? " +
			"limit 1"
		queryStr = db.Rebind(queryStr)
		err := db.Get(repo, queryStr, accountID)
		if err != nil {
			return err
		}

		queryStr = "select app_groups_id " +
			"from join_app_users_app_groups " +
			"where app_users_id = ? "
		queryStr = db.Rebind(queryStr)
		err = db.Select(&appGroupIDs, queryStr, repo.ID)
		if err != nil {
			return err
		}

		return err
	})
	if err != nil {
		return nil, err
	}

	appUser := repo.mapRepoObjToDomainObj(appGroupIDs, allAppGroups)

	return &appUser, err
}

func (repo *AppUserRepo) mapRepoObjToDomainObj(appGroupIDs []string, allAppGroups domain.AppGroups) domain.AppUser {
	appGroups := domain.AppGroups{}
	for _, groupID := range appGroupIDs {
		for _, appGroup := range allAppGroups {
			if groupID == appGroup.ID {
				appGroups = append(appGroups, appGroup)
				break
			}
		}
	}
	domainObject := domain.AppUser{
		ID:        repo.ID,
		AccountID: repo.Account_id,
		Password:  repo.Password,
		Name:      repo.Name,
		AppGroups: appGroups,
	}
	return domainObject
}

// NewAppUserRepo constructor
func NewAppUserRepo() *AppUserRepo {
	return &AppUserRepo{database: createDB()}
}

// AppUserRepo repository struct
type AppUserRepo struct {
	database       db
	ID             string         `db:"id"`
	Del            bool           `db:"del"`
	Created_at     sql.NullTime   `db:"created_at"`
	Cre_user_id    sql.NullString `db:"cre_user_id"`
	Updated_at     sql.NullTime   `db:"updated_at"`
	Update_user_id sql.NullString `db:"update_user_id"`
	Account_id     string         `db:"account_id"`
	Password       string         `db:"password"`
	Name           string         `db:"name"`
}

type joinUserIDGroupID struct {
	UserID  string `db:"app_users_id"`
	GroupID string `db:"app_groups_id"`
}
