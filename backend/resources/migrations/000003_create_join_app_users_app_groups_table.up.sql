create table join_app_users_app_groups (
    app_users_id text not null REFERENCES app_users (id)
    , app_groups_id text not null REFERENCES app_groups (id)
);