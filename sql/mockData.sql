BEGIN;

with new_account as (
  INSERT INTO account (email, name, password_hash)
  VALUES
    (text 'HAH@YAY.COM', text 'HAH', text 'HASHHASH')
  RETURNING account_id
), new_gist as (
  INSERT INTO gist (account_id)
  SELECT account_id from new_account
  RETURNING gist_id
), new_version as (
  INSERT INTO version (gist_id, title)
  SELECT gist_id, 'my gist' from new_gist
  RETURNING version_id
), new_files as (
  INSERT INTO file (langauge, file_name, content)
  VALUES
    (text 'python', text 'first.py', text 'ipsum hhb'),
    (text 'python', text 'second.py', text 'ipsum iug'),
    (text 'python', text 'third.py', text 'ipsum thd')
  RETURNING file_id
)

INSERT INTO version_file (version_id, file_id)
-- yes, doing a cartesian joint here
SELECT version_id, file_id from new_version, new_files;

COMMIT;