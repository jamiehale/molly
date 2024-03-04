import PropTypes from 'prop-types';
import { TagForm } from '../../forms/TagForm';
import { useCallback } from 'react';
import { useCreateTag } from '../../../hooks/create-artifact';
import { useArtifactTypes } from '../../../hooks/artifact-types';
import { useArtifactSources } from '../../../hooks/artifact-sources';
import { useCollections } from '../../../hooks/collections';

export const NewMobject = ({ onNew, onCancel }) => {
  const { createArtifact } = useCreateTag();
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
      <TagForm
        artifactTypes={artifactTypes}
        artifactSources={artifactSources}
        collections={collections}
        onSubmit={handleSubmit}
        onCancel={onCancel}
      />
    </div>
  );
};

NewMobject.propTypes = {
  onNew: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
