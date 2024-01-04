import { usePeople } from '../../../hooks/people';
import { NewPerson } from './NewPerson';
import { People } from './People';
import { Typography } from '../../Typography';
import { Layout } from '../../Layout';
import { ButtonToggle } from '../../ButtonToggle';

export const PeoplePage = () => {
  const { people, reloadPeople } = usePeople();

  return (
    <Layout>
      <Typography as="title">People</Typography>
      <People people={people} />
      <ButtonToggle
        buttonText="Add Person"
        renderOpen={(onClose) => (
          <NewPerson
            onNewPerson={() => {
              reloadPeople();
              onClose();
            }}
            onCancel={onClose}
          />
        )}
      />
    </Layout>
  );
};
