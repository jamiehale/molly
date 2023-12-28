import { useGenders } from '../hooks/genders';
import { usePeople } from '../hooks/people';
import { NewPerson } from './NewPerson';
import { People } from './People';
import { Typography } from './Typography';
import { Layout } from './Layout';
import { ButtonToggle } from './ButtonToggle';

export const PeoplePage = () => {
  const { people, createPerson, reloadPeople } = usePeople();
  const { genders } = useGenders();

  const handleNewPerson = (givenNames, surname, genderId) => {
    createPerson(givenNames, surname, genderId);
  };

  return (
    <Layout>
      <Typography as="title">People</Typography>
      <People people={people} />
      <ButtonToggle
        buttonText="Add Person"
        renderOpen={(onClose) => (
          <NewPerson
            genders={genders}
            onNewPerson={() => {
              reloadPeople();
              onClose();
            }}
          />
        )}
      />
    </Layout>
  );
};
