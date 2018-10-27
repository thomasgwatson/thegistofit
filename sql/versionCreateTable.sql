CREATE TABLE version (
 version_id UUID PRIMARY KEY,
 gist_id UUID NOT NULL REFERENCES gist (gist_id),
 created_on TIMESTAMP NOT NULL,
 prior_version_id UUID REFERENCES version (version_id)
);