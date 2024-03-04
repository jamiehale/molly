import { PropTypes } from 'prop-types';
import { Typography } from '../../Typography';
import { TagList } from './TagList';
import { useDeleteMobjectTag } from '../../../hooks/delete-mobject-tag';
import { List, ListItem } from '../../List';

export const Mobject = ({ mobject, onTagDeleted }) => {
  const { deleteTag } = useDeleteMobjectTag(mobject.key);

  return (
    <div>
      <Typography as="title">Mobject: {mobject.key}</Typography>
      {mobject.mimeType === 'image/jpeg' && (
        <img src={`http://localhost:3000/o/${mobject.key}`} />
      )}
      <a href={`http://localhost:3000/o/${mobject.key}`}>Download</a>
      <Typography as="subtitle">Tags:</Typography>
      <TagList
        tags={mobject.tags}
        onDelete={(tag) => deleteTag(tag).then(() => onTagDeleted())}
      />
      <Typography as="subtitle">Attributes:</Typography>
      <List>
        {mobject.attributes.map((attribute) => (
          <ListItem key={attribute.name}>
            <Typography>
              {attribute.name}: {attribute.value}
            </Typography>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

Mobject.propTypes = {
  mobject: PropTypes.shape({
    key: PropTypes.string.isRequired,
    mimeType: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    attributes: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  onTagDeleted: PropTypes.func.isRequired,
};
