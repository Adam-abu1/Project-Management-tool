drop table if exists profiles;
TRUNCATE auth.users cascade;

create table
profiles (
    id uuid references  auth.users on delete cascade not null,
    created_at timestamptz not null default now(),
    username text unique not null,
    full_name text not null,
    bio text default null,
    avatar_url text default null,
    mode text default 'dark' not null,

    primary key (id)
);