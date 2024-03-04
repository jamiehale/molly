import { PropTypes } from 'prop-types';
import { List, ListItem } from '../../List';
import { Tag } from '../../Tag';

export const TagList = ({ tags, onDelete }) => (
  <List>
    {tags.map((tag) => (
      <ListItem key={tag}>
        <Tag tag={tag} onDelete={() => onDelete(tag)} />
      </ListItem>
    ))}
  </List>
);

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  onDelete: PropTypes.func.isRequired,
};
