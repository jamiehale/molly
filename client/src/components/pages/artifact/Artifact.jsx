import { PropTypes } from 'prop-types';
import { Typography } from '../../Typography';

export const Artifact = ({ artifact }) => (
  <Typography as="title">Artifact: {artifact.title}</Typography>
);

Artifact.propTypes = {
  artifact: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};
