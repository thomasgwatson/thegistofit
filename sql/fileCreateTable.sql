CREATE TABLE file (
 file_id UUID PRIMARY KEY default uuid_generate_v4(),
 created_on TIMESTAMP default (now() at time zone 'utc') ,
 content TEXT,
 langauge TEXT NOT NULL,
 file_name TEXT,
 prior_file_id UUID REFERENCES file (file_id)
);