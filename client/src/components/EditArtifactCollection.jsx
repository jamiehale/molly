import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useArtifactCollection } from '../hooks/artifact-collection';
import { ArtifactCollectionForm } from './ArtifactCollectionForm';

export const EditArtifactCollection = ({
  artifactCollection,
  onUpdateArtifactCollection,
  onCancel,
}) => {
  const { updateArtifactCollection } = useArtifactCollection(
    artifactCollection.id,
  );

  const handleSubmit = useCallback(
    ({ title, shortName, description }) =>
      updateArtifactCollection(title, shortName, description).then(() => {
        onUpdateArtifactCollection();
      }),
    [updateArtifactCollection, onUpdateArtifactCollection],
  );

  return (
    <div className="max-w-md">
      <ArtifactCollectionForm
        artifactCollection={artifactCollection}
        submitButtonText="Update"
        onSubmit={handleSubmit}
        onCancel={onCancel}
      />
    </div>
  );
};

EditArtifactCollection.propTypes = {
  artifactCollection: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    shortName: PropTypes.string,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onUpdateArtifactCollection: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
