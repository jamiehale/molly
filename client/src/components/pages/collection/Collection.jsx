import { PropTypes } from 'prop-types';
import { Typography } from '../../Typography';

export const Collection = ({ collection }) => (
  <Typography as="title">Title: {collection.title}</Typography>
);

Collection.propTypes = {
  collection: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};
