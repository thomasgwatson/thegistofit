CREATE TABLE version (
 version_id UUID PRIMARY KEY default uuid_generate_v4(),
 gist_id UUID NOT NULL REFERENCES gist (gist_id),
 title TEXT,
 created_on TIMESTAMP default (now() at time zone 'utc'),
 prior_version_id UUID REFERENCES version (version_id)
);