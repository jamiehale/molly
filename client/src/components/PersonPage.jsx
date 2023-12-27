import PropTypes from 'prop-types';
import { useApi } from '../hooks/api';
import { Typography } from './Typography';
import { Layout } from './Layout';
import { usePerson } from '../hooks/person';
import { useChildren } from '../hooks/children';
import { List, ListItem } from './List';
import { NewChild } from './NewChild';

export const PersonPage = ({ params }) => {
  const { authorizedGet } = useApi('http://localhost:3000/api', '12345');
  const { person } = usePerson(params.id, authorizedGet);
  const { children } = useChildren(params.id, authorizedGet);

  return (
    <Layout>
      {person && (
        <>
          <Typography as="title">
            Person: {person.surname}, {person.givenNames}
          </Typography>
          <div>
            <Typography>Children</Typography>
            <List>
              {children.map((child) => (
                <ListItem key={child.id}>
                  <Typography>
                    {child.surname}, {child.givenNames}
                  </Typography>
                </ListItem>
              ))}
            </List>
            <NewChild parentId={person.id} />
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
