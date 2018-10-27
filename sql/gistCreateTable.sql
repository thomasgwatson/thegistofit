CREATE TABLE gist (
 gist_id UUID PRIMARY KEY,
 account_id UUID NOT NULL REFERENCES account (account_id),
 created_on TIMESTAMP NOT NULL
);