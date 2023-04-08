create table app_groups (
	id text primary key
	, del boolean not null default false
	, created_at timestamp
	, cre_user_id text
	, updated_at timestamp
	, update_user_id text
	,name text not null
);