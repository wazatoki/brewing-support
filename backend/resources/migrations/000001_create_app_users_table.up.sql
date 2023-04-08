create table app_users (
	id text primary key
	, del boolean not null default false
	, created_at timestamp
	, cre_user_id text
	, updated_at timestamp
	, update_user_id text
	, account_id text not null
	, password text not null
	, name text not null
);
