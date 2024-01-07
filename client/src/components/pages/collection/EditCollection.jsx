import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useUpdateCollection } from '../../../hooks/update-collection';
import { CollectionForm } from '../../forms/CollectionForm';

export const EditCollection = ({ collection, onUpdate, onCancel }) => {
  const { updateCollection } = useUpdateCollection(collection.id);

  const handleSubmit = useCallback(
    ({ title, shortName, description }) =>
      updateCollection(title, shortName, description).then(() => {
        onUpdate();
      }),
    [updateCollection, onUpdate],
  );

  return (
    <div className="max-w-md">
      <CollectionForm
        collection={collection}
        submitButtonText="Update"
        onSubmit={handleSubmit}
        onCancel={onCancel}
      />
    </div>
  );
};

EditCollection.propTypes = {
  collection: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    shortName: PropTypes.string,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
