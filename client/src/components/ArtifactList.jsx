import PropTypes from 'prop-types';
import { Typography } from './Typography';
import { List, ListItem } from './List';
import { Link } from './Router';

export const ArtifactList = ({ artifacts, displayFn }) => {
  const theDisplayFn = displayFn || ((artifact) => artifact.title);

  return (
    <List>
      {artifacts.map((artifact) => (
        <ListItem key={artifact.id}>
          <Link to={`/artifacts/${artifact.id}`}>
            <Typography>{theDisplayFn(artifact)}</Typography>
          </Link>
        </ListItem>
      ))}
    </List>
  );
};

ArtifactList.propTypes = {
  artifacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string,
    }),
  ),
  displayFn: PropTypes.func,
};
