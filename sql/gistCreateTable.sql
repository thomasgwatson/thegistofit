CREATE TABLE gist (
 gist_id UUID PRIMARY KEY default uuid_generate_v4(),
 account_id UUID NOT NULL REFERENCES account (account_id),
 created_on TIMESTAMP default (now() at time zone 'utc')
);