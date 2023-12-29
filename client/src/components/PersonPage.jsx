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
import { CustomToggle } from './CustomToggle';
import { EditPerson } from './EditPerson';
import { useEffect } from 'react';

export const PersonPage = ({ params }) => {
  const { person, reload: reloadPerson } = usePerson(params.id);
  const { children, reloadChildren } = useChildren(params.id);
  const { parents, reloadParents } = useParents(params.id);

  useEffect(reloadPerson, [reloadPerson]);

  return (
    <Layout>
      {person && (
        <>
          <CustomToggle
            buttonText="Edit"
            renderOpen={(onClose) => (
              <div>
                <Typography>Editing</Typography>
                <EditPerson
                  person={person}
                  onUpdatePerson={() => {
                    reloadPerson();
                    onClose();
                  }}
                />
                <Button type="button" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            )}
            renderClosed={(onOpen) => (
              <div>
                <Typography as="title">
                  Person: {person.surname}, {person.givenNames}
                </Typography>
                <Typography>Gender: {person.genderTitle}</Typography>
                <Button type="button" onClick={onOpen}>
                  Edit
                </Button>
              </div>
            )}
          />
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
