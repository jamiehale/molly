import PropTypes from 'prop-types';
import { CollectionForm } from '../../forms/CollectionForm';
import { useCallback } from 'react';
import { useCreateCollection } from '../../../hooks/create-collection';

export const NewCollection = ({ onNew, onCancel }) => {
  const { createCollection } = useCreateCollection();

  const handleSubmit = useCallback(
    ({ title, shortName, description }) =>
      createCollection(title, shortName, description).then(() => {
        onNew();
      }),
    [createCollection, onNew],
  );

  return (
    <div className="max-w-md">
      <CollectionForm onSubmit={handleSubmit} onCancel={onCancel} />
    </div>
  );
};

NewCollection.propTypes = {
  onNew: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
