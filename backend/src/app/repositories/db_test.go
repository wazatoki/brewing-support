package repositories

import (
	"github.com/jmoiron/sqlx"
)

func deleteDB(db *sqlx.DB) error {
	queryStr := "delete from join_app_users_app_groups;delete from app_groups;delete from app_users;"

	// クエリをDBドライバに併せて再構築
	queryStr = db.Rebind(queryStr)

	// データ消去
	_, err := db.Exec(queryStr)
	if err != nil {
		return err
	}
	return err
}
