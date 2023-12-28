import { useGenders } from '../hooks/genders';
import { usePeople } from '../hooks/people';
import { NewPerson } from './NewPerson';
import { People } from './People';
import { Typography } from './Typography';
import { Layout } from './Layout';

export const PeoplePage = () => {
  const { people, createPerson } = usePeople();
  const { genders } = useGenders();

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
