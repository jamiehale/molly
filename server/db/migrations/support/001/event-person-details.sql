DROP VIEW IF EXISTS event_person_details;
CREATE VIEW event_person_details AS
  SELECT
    ep.event_id,
    ep.role_id AS role_id,
    epr.title AS role_title,
    p.id,
    p.given_names,
    p.surname,
    p.gender_id,
    g.title AS gender_title,
    p.creator_id
  FROM event_people AS ep
    INNER JOIN event_person_roles AS epr
      ON epr.id = ep.role_id
    INNER JOIN people AS p
      ON p.id = ep.person_id
    INNER JOIN genders AS g
      ON g.id = p.gender_id
;