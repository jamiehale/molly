import { useGenders } from "../hooks/genders";
import { useApi } from "../hooks/api";
import { usePeople } from "../hooks/people";
import { NewPerson } from "./NewPerson";
import { People } from "./People";
import { Typography } from "./Typography";
import { Layout } from "./Layout";

export const PeoplePage = () => {
  const api = useApi("http://localhost:3000/api", "12345");
  const { people, createPerson } = usePeople(api);
  const { genders } = useGenders(api);

  const handleNewPerson = (givenNames, surname, genderId) => {
    createPerson(givenNames, surname, genderId);
  };

  return (
    <Layout>
      <Typography as="title">People</Typography>
      <People people={people} />
      <NewPerson genders={genders} onNewPerson={handleNewPerson} />
    </Layout>
  );
};
