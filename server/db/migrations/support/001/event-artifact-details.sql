DROP VIEW IF EXISTS event_artifact_details;
CREATE VIEW event_artifact_details AS
  SELECT
    ea.event_id,
    ea.role_id AS role_id,
    ear.title AS role_title,
    a.id,
    a.title,
    a.description,
    a.type_id,
    atype.title AS type_title,
    a.source_id,
    asource.title AS source_title,
    a.collection_id,
    c.title AS collection_title,
    p.creator_id
  FROM event_artifacts AS ea
    INNER JOIN event_artifact_roles AS ear
      ON ear.id = ea.role_id
    INNER JOIN artifacts AS a
      ON a.id = ea.person_id
    INNER JOIN artifact_types AS atype
      ON atype.id = a.type_id
    INNER JOIN artifact_sources AS asource
      ON asource.id = a.source_id
    INNER JOIN collections AS c
      ON c.id = a.collection_id
;