BEGIN;

SELECT get_gist_with_children('gist_ref', 'version_ref', "c5784876-4b68-4411-b110-56cacb2a5072");

FETCH ALL IN "gist_ref";
FETCH ALL IN "version_ref";
COMMIT;