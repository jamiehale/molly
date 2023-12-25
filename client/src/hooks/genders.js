import { useEffect, useState } from "react";

export const useGenders = ({ authorizedGet }) => {
  const [genders, setGenders] = useState([]);

  useEffect(() => {
    authorizedGet("/genders").then(setGenders);
  }, []);

  return { genders };
};
