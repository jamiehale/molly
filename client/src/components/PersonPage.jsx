import PropTypes from 'prop-types';
import { Typography } from './Typography';
import { Layout } from './Layout';
import { usePerson } from '../hooks/person';
import { useChildren } from '../hooks/children';
import { useParents } from '../hooks/parents';
import { NewChild } from './NewChild';
import { Button } from './Button';
import { NewParent } from './NewParent';
import { PersonList } from './PersonList';
import { ButtonToggle } from './ButtonToggle';

export const PersonPage = ({ params }) => {
  const { person } = usePerson(params.id);
  const { children, reloadChildren } = useChildren(params.id);
  const { parents, reloadParents } = useParents(params.id);

  return (
    <Layout>
      {person && (
        <>
          <Typography as="title">
            Person: {person.surname}, {person.givenNames}
          </Typography>
          <Typography>Gender: {person.genderTitle}</Typography>
          <div>
            <Typography>Children</Typography>
            <PersonList
              people={children}
              displayFn={(person) =>
                `${person.surname}, ${person.givenNames} (${person.parentRoleTitle})`
              }
            />
            <ButtonToggle
              buttonText="Add Child"
              renderOpen={(onClose) => (
                <div>
                  <NewChild
                    parentId={person.id}
                    onNewChild={() => {
                      reloadChildren();
                      onClose();
                    }}
                  />
                  <Button type="button" onClick={onClose}>
                    Cancel
                  </Button>
                </div>
              )}
            />
            <Typography>Parents</Typography>
            <PersonList
              people={parents}
              displayFn={(person) =>
                `${person.surname}, ${person.givenNames} (${person.parentRoleTitle})`
              }
            ></PersonList>
            <ButtonToggle
              buttonText="Add Parent"
              renderOpen={(onClose) => (
                <div>
                  <NewParent
                    childId={person.id}
                    onNewParent={() => {
                      reloadParents();
                      onClose();
                    }}
                  />
                  <Button type="button" onClick={onClose}>
                    Cancel
                  </Button>
                </div>
              )}
            />
          </div>
        </>
      )}
    </Layout>
  );
};

PersonPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
};
