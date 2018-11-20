CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

WITH files(file_id, langauge, file_name, content) AS (
  VALUES
    (uuid uuid_generate_v4(), text 'python', text 'first.py', text 'import words wor ds woroodosodfoaofoa sdoadoasodkaoskdaoskd'),
    (uuid uuid_generate_v4(), text 'python', text 'second.py', text 'import words wor ds woroodosodfoaofoa sdoadoasodkaoskdaoskd'),
    (uuid uuid_generate_v4(), text 'python', text 'third.py', text 'import words wor ds woroodosodfoaofoa sdoadoasodkaoskdaoskd'),
    (uuid uuid_generate_v4(), text 'python', text 'fourth.py', text 'import words wor ds woroodosodfoaofoa sdoadoasodkaoskdaoskd'),
    (uuid uuid_generate_v4(), text 'python', text 'fifth.py', text 'import words wor ds woroodosodfoaofoa sdoadoasodkaoskdaoskd'),
)
ins1 AS(
INSERT INTO account (account_id, email, name, password_hash)
VALUES
  (uuid_generate_v4(), 'HAH@YAY.COM', 'HAH', 'HASHHASH')
  ON CONFLICTS DO NOTHING
  RETURNING account_id AS account_id
),
ins2 AS (
  INSERT INTO gist (account_id, gist_id)
  SELECT account_id, uuid_generate_v4() from ins1
  RETURNING gist_id
),
ins3 AS (
  INSERT INTO version (version_id, gist_id, title)
  SELECT uuid_generate_v4(), gist_id, 'my gist' from ins2
  RETURNING version_id
),
ins4 AS (
  INSERT INTO file (file_id, langauge, file_name, content)
  SELECT * from files
  RETURNING file_id
)
INSERT INTO version_file (file_id, version_id)
SELECT file_id from ins4
