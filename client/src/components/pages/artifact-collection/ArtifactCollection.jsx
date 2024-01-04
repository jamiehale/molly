import { PropTypes } from 'prop-types';
import { Typography } from '../../Typography';

export const ArtifactCollection = ({ artifactCollection }) => (
  <Typography as="title">Title: {artifactCollection.title}</Typography>
);

ArtifactCollection.propTypes = {
  artifactCollection: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};
