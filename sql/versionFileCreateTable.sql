CREATE TABLE version_file (
 file_id UUID NOT NULL REFERENCES file (file_id),
 version_id UUID NOT NULL REFERENCES version (version_id),
 PRIMARY KEY (version_id, file_id)
);