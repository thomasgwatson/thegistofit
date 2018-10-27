CREATE TABLE file (
 file_id UUID PRIMARY KEY,
 gist_id UUID NOT NULL REFERENCES gist (gist_id),
 created_on TIMESTAMP NOT NULL,
 content TEXT,
 langauge TEXT NOT NULL,
 file_name TEXT
);