DROP VIEW IF EXISTS person_details;
CREATE VIEW person_details AS
  SELECT
    p.id,
    p.given_names,
    p.surname,
    p.gender_id,
    g.title AS gender_title,
    p.creator_id
  FROM people AS p
    INNER JOIN genders AS g
      ON g.id = p.gender_id
;