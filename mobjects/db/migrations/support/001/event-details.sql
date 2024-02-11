DROP VIEW IF EXISTS event_details;
CREATE VIEW event_details AS
  SELECT
    e.id,
    e.title,
    e.type_id,
    et.title AS type_title,
    e.date_value,
    e.location_id,
    l.value AS location_value
  FROM events AS e
    INNER JOIN event_types AS et
      ON et.id = e.type_id
    INNER JOIN locations AS l
      ON l.id = e.location_id
;