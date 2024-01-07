import PropTypes from 'prop-types';
import { ArtifactForm } from '../../forms/ArtifactForm';
import { useCallback } from 'react';
import { useCreateArtifact } from '../../../hooks/create-artifact';
import { useArtifactTypes } from '../../../hooks/artifact-types';
import { useArtifactSources } from '../../../hooks/artifact-sources';
import { useCollections } from '../../../hooks/collections';

export const NewArtifact = ({ onNew, onCancel }) => {
  const { createArtifact } = useCreateArtifact();
  const { artifactTypes } = useArtifactTypes();
  const { artifactSources } = useArtifactSources();
  const { collections } = useCollections();

  const handleSubmit = useCallback(
    ({ title, description, typeId, sourceId, collectionId }) =>
      createArtifact(title, description, typeId, sourceId, collectionId).then(
        () => {
          onNew();
        },
      ),
    [createArtifact, onNew],
  );

  return (
    <div className="max-w-md">
      <ArtifactForm
        artifactTypes={artifactTypes}
        artifactSources={artifactSources}
        collections={collections}
        onSubmit={handleSubmit}
        onCancel={onCancel}
      />
    </div>
  );
};

NewArtifact.propTypes = {
  onNew: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
