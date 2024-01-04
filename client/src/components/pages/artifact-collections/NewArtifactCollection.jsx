import PropTypes from 'prop-types';
import { ArtifactCollectionForm } from '../../forms/ArtifactCollectionForm';
import { useCallback } from 'react';
import { useArtifactCollections } from '../../../hooks/artifact-collections';

export const NewArtifactCollection = ({
  onNewArtifactCollection,
  onCancel,
}) => {
  const { createArtifactCollection } = useArtifactCollections();

  const handleSubmit = useCallback(
    ({ title, shortName, description }) =>
      createArtifactCollection(title, shortName, description).then(() => {
        onNewArtifactCollection();
      }),
    [createArtifactCollection, onNewArtifactCollection],
  );

  return (
    <div className="max-w-md">
      <ArtifactCollectionForm onSubmit={handleSubmit} onCancel={onCancel} />
    </div>
  );
};

NewArtifactCollection.propTypes = {
  onNewArtifactCollection: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
