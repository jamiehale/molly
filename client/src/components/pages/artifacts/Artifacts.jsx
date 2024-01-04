import PropTypes from 'prop-types';
import { List, ListItem } from '../../List';
import { Link } from '../../Router';

export const Artifacts = ({ artifacts }) => (
  <List>
    {artifacts.map((artifact) => (
      <ListItem key={artifact.id}>
        <Link to={`/artifacts/${artifact.id}`}>{artifact.title}</Link>
      </ListItem>
    ))}
  </List>
);

Artifacts.propTypes = {
  artifacts: PropTypes.arrayOf(PropTypes.object),
};
