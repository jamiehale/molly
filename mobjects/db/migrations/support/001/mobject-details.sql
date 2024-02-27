DROP VIEW IF EXISTS mobject_details;
CREATE VIEW mobject_details AS
  SELECT
    m.id,
    m.key,
    m.mimetype,
    m.created_at,
    m.updated_at,
    f.hash AS file_hash,
    f.created_at AS file_created_at,
    f.updated_at AS file_updated_at
  FROM mobjects AS m
    INNER JOIN mobject_files AS mf
      ON mf.mobject_id = m.id
      AND mf.replaced_at IS NULL
    INNER JOIN files AS f
      ON f.hash = mf.file_hash
;