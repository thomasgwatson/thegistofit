CREATE TABLE account (
 account_id UUID PRIMARY KEY default uuid_generate_v4(),
 name TEXT NOT NULL,
 password_hash TEXT NOT NULL,
 email TEXT UNIQUE NOT NULL,
 created_on TIMESTAMP default (now() at time zone 'utc')
);