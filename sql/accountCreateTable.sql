CREATE TABLE account (
 account_id UUID PRIMARY KEY,
 name TEXT NOT NULL,
 password TEXT NOT NULL,
 email TEXT UNIQUE NOT NULL,
 created_on TIMESTAMP NOT NULL
);