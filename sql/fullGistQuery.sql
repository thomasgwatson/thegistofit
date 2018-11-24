-- failed experiment http://www.sqlines.com/postgresql/how-to/return_result_set_from_stored_procedure

CREATE OR REPLACE FUNCTION get_gist_with_children(gist_ref refcursor, version_ref refcursor, gist_id_in UUID)
RETURNS SETOF refcursor AS $$
 -- DECLARE
 --  gist_ref refcursor;
 --  version_ref refcursor;
BEGIN
 OPEN gist_ref FOR SELECT * from gist where gist_id = gist_id_in;
 RETURN NEXT gist_ref;

 OPEN version_ref FOR SELECT * from version where gist_id = gist_id_in;
 RETURN NEXT version_ref;
END;
$$ LANGUAGE plpgsql;


BEGIN;

SELECT get_gist_with_children('gist_ref', 'version_ref', 'c5784876-4b68-4411-b110-56cacb2a5072');

FETCH ALL IN "gist_ref";
FETCH ALL IN "version_ref";
COMMIT;

-- next experiment https://stackoverflow.com/questions/756689/postgresql-function-returning-multiple-result-sets

CREATE OR REPLACE FUNCTION gist_with_kids()