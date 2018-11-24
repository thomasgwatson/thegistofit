CREATE EXTENSION "uuid-ossp";

CREATE TABLE account (
 account_id UUID PRIMARY KEY default uuid_generate_v4(),
 name TEXT NOT NULL,
 password_hash TEXT NOT NULL,
 email TEXT UNIQUE NOT NULL,
 created_on TIMESTAMP default (now() at time zone 'utc')
);

CREATE TABLE gist (
 gist_id UUID PRIMARY KEY default uuid_generate_v4(),
 account_id UUID NOT NULL REFERENCES account (account_id),
 created_on TIMESTAMP default (now() at time zone 'utc')
);

CREATE TABLE version (
 version_id UUID PRIMARY KEY default uuid_generate_v4(),
 gist_id UUID NOT NULL REFERENCES gist (gist_id),
 title TEXT,
 created_on TIMESTAMP default (now() at time zone 'utc'),
 prior_version_id UUID REFERENCES version (version_id)
);

CREATE TABLE file (
 file_id UUID PRIMARY KEY default uuid_generate_v4(),
 created_on TIMESTAMP default (now() at time zone 'utc') ,
 content TEXT,
 langauge TEXT NOT NULL,
 file_name TEXT,
 prior_file_id UUID REFERENCES file (file_id)
);

CREATE TABLE version_file (
 file_id UUID NOT NULL REFERENCES file (file_id),
 version_id UUID NOT NULL REFERENCES version (version_id),
 PRIMARY KEY (version_id, file_id)
);