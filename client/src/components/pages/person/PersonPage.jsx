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
import { Link } from '../../Router';

const Children = ({ parentId }) => {
  const { children, loadChildren } = useChildren(parentId);

  return (
    <>
      <Typography as="subtitle">Children</Typography>
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
                parentId={parentId}
                onNewChild={() => {
                  loadChildren().then(() => {
                    onClose();
                  });
                }}
                onCancel={onClose}
              />
            </div>
          )}
        />
      </div>
    </>
  );
};

Children.propTypes = {
  parentId: PropTypes.string.isRequired,
};

const Parents = ({ childId }) => {
  const { parents, loadParents } = useParents(childId);

  return (
    <>
      <Typography as="subtitle">Parents</Typography>
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
                childId={childId}
                onNewParent={() => {
                  loadParents().then(() => {
                    onClose();
                  });
                }}
                onCancel={onClose}
              />
            </div>
          )}
        />
      </div>
    </>
  );
};

Parents.propTypes = {
  childId: PropTypes.string.isRequired,
};

export const PersonPage = ({ params }) => {
  const { person, loadPerson } = usePerson(params.id);

  return (
    <Layout>
      <Link to="/people">&lt;&lt;</Link>
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
            <Children parentId={person.id} />
            <Parents childId={person.id} />
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
