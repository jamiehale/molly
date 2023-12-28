import PropTypes from 'prop-types';
import { Typography } from './Typography';
import { Layout } from './Layout';
import { usePerson } from '../hooks/person';
import { useChildren } from '../hooks/children';
import { List, ListItem } from './List';
import { NewChild } from './NewChild';
import { useCallback } from 'react';
import { Link } from './Router';

export const PersonPage = ({ params }) => {
  const { person } = usePerson(params.id);
  const { children, reloadChildren } = useChildren(params.id);

  const handleNewChild = useCallback(() => {
    reloadChildren();
  }, [reloadChildren]);

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
                  <Link to={`/people/${child.id}`}>
                    <Typography>
                      {child.surname}, {child.givenNames}
                    </Typography>
                  </Link>
                </ListItem>
              ))}
            </List>
            <NewChild parentId={person.id} onNewChild={handleNewChild} />
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
