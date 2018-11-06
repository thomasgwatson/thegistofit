CREATE TABLE file (
 file_id UUID PRIMARY KEY,
 created_on TIMESTAMP NOT NULL,
 content TEXT,
 langauge TEXT NOT NULL,
 file_name TEXT,
 prior_file_id UUID REFERENCES file (file_id)
);