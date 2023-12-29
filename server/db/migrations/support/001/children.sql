DROP VIEW IF EXISTS children;
CREATE VIEW children AS
  SELECT
    pe.id,
    pe.given_names,
    pe.surname,
    pe.gender_id,
    g.title AS gender_title,
    pe.creator_id,
    pc.parent_id,
    pc.parent_role_id,
    pr.title AS parent_role_title
  FROM parent_children AS pc
    INNER JOIN people AS pe
      ON pe.id = pc.child_id
    INNER JOIN genders AS g
      ON g.id = pe.gender_id
    INNER JOIN parent_roles AS pr
      ON pr.id = pc.parent_role_id
;