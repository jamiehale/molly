import PropTypes from 'prop-types';
import { Typography } from '../../Typography';
import { Layout } from '../../Layout';
import { usePerson } from '../../../hooks/person';
import { useChildren } from '../../../hooks/children';
import { useParents } from '../../../hooks/parents';
import { NewChild } from './NewChild';
import { Button } from '../../Button';
import { NewParent } from './NewParent';
import { PersonList } from '../../PersonList';
import { ButtonToggle } from '../../ButtonToggle';
import { CustomToggle } from '../../CustomToggle';
import { EditPerson } from './EditPerson';
import { FlexColumn } from '../../FlexColumn';
import { Person } from './Person';
import { FlexRow } from '../../FlexRow';

export const PersonPage = ({ params }) => {
  const { person, loadPerson } = usePerson(params.id);
  const { children, reloadChildren } = useChildren(params.id);
  const { parents, reloadParents } = useParents(params.id);

  return (
    <Layout>
      {person && (
        <>
          <CustomToggle
            buttonText="Edit"
            renderOpen={(onClose) => (
              <FlexColumn>
                <Typography>Editing</Typography>
                <EditPerson
                  person={person}
                  onUpdate={() => {
                    loadPerson().then(() => {
                      onClose();
                    });
                  }}
                  onCancel={onClose}
                />
              </FlexColumn>
            )}
            renderClosed={(onOpen) => (
              <FlexColumn>
                <Person person={person} />
                <FlexRow>
                  <Button type="button" onClick={onOpen}>
                    Edit
                  </Button>
                </FlexRow>
              </FlexColumn>
            )}
          />
          <FlexColumn>
            <Typography>Children</Typography>
            <PersonList
              people={children}
              displayFn={(person) =>
                `${person.surname}, ${person.givenNames} (${person.parentRoleTitle})`
              }
            />
            <div>
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
                      onCancel={onClose}
                    />
                  </div>
                )}
              />
            </div>
            <Typography>Parents</Typography>
            <PersonList
              people={parents}
              displayFn={(person) =>
                `${person.surname}, ${person.givenNames} (${person.parentRoleTitle})`
              }
            ></PersonList>
            <div>
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
                      onCancel={onClose}
                    />
                  </div>
                )}
              />
            </div>
          </FlexColumn>
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
