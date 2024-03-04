import { PropTypes } from 'prop-types';
import { Chip } from './Chip';

export const Tag = ({ tag, onDelete }) => (
  <Chip value={tag} onDismiss={onDelete} />
);

Tag.propTypes = {
  tag: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};
