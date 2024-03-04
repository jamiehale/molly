import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { TagForm } from '../../forms/TagForm';
import { useCreateTag } from '../../../hooks/create-tag';

export const NewTag = ({ keyValue, onNew, onCancel }) => {
  const { createTag } = useCreateTag(keyValue);

  const handleSubmit = useCallback(
    ({ tag }) =>
      createTag(tag).then(() => {
        onNew();
      }),
    [createTag, onNew],
  );

  return (
    <div className="max-w-md">
      <TagForm onSubmit={handleSubmit} onCancel={onCancel} />
    </div>
  );
};

NewTag.propTypes = {
  keyValue: PropTypes.string.isRequired,
  onNew: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
