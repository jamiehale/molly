import PropTypes from 'prop-types';
import { List, ListItem } from '../../List';
import { Link } from '../../Router';

export const ArtifactCollections = ({ artifactCollections }) => (
  <List>
    {artifactCollections.map((artifactCollection) => (
      <ListItem key={artifactCollection.id}>
        <Link to={`/artifact-collections/${artifactCollection.id}`}>
          {artifactCollection.title}
        </Link>
      </ListItem>
    ))}
  </List>
);

ArtifactCollections.propTypes = {
  artifactCollections: PropTypes.arrayOf(PropTypes.object),
};
