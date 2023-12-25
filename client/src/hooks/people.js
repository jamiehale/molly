import { useCallback, useEffect, useMemo, useState } from "react";

export const usePeople = ({ authorizedGet, authorizedPost }) => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    authorizedGet("/people").then(setPeople);
  }, [authorizedGet, setPeople]);

  const createPerson = useCallback(
    (givenNames, surname, genderId) => {
      authorizedPost("/people", {
        givenNames,
        surname,
        genderId,
      }).then((person) => {
        setPeople([...people, person]);
      });
    },
    [authorizedPost, people, setPeople]
  );

  return useMemo(() => ({ people, createPerson }), [people, createPerson]);
};
