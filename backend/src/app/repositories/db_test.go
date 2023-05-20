package repositories

import (
	"github.com/jmoiron/sqlx"
)

func deleteDbData(db *sqlx.DB) error {
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

func insertTestData(db *sqlx.DB) error {
	// テスト用データを追加
	insertQueryStr := "insert into app_users (id, account_id, password, name) values " +
		"('appUserId1', '12345', 'password 1', 'name 1')," +
		"('appUserId2', '22345', 'password 2', 'name 2');" +
		"insert into app_groups (id, name) values " +
		"('appGroupId1', 'app group name 1')," +
		"('appGroupId2', 'app group name 2')," +
		"('appGroupId3', 'app group name 3');" +
		"insert into join_app_users_app_groups (app_users_id, app_groups_id) values " +
		"('appUserId1', 'appGroupId1')," +
		"('appUserId1', 'appGroupId2')," +
		"('appUserId2', 'appGroupId1');"
	insertQueryStr = db.Rebind(insertQueryStr)
	_, err := db.Exec(insertQueryStr)
	return err
}
