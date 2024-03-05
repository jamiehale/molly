import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { useArtifactsSearch } from '../../../hooks/artifacts-search';
import { EventArtifactForm } from '../../forms/EventArtifactForm';
import * as J from '../../../lib/jlib';
import { useCreateEventArtifact } from '../../../hooks/create-event-artifact';

export const NewEventArtifact = ({ eventId, onNew, onCancel }) => {
  const { searchForArtifacts } = useArtifactsSearch();
  const [searchResults, setSearchResults] = useState([]);
  const { createEventArtifact } = useCreateEventArtifact(eventId);

  const handleSubmit = useCallback(
    ({ artifactId, roleId }) =>
      createEventArtifact(artifactId, roleId).then(() => {
        setSearchResults([]);
        onNew();
      }),
    [createEventArtifact, setSearchResults, onNew],
  );

  const handleSearch = useCallback(
    (q) => {
      searchForArtifacts(q).then(setSearchResults);
    },
    [searchForArtifacts, setSearchResults],
  );

  return (
    <div className="max-w-md">
      <EventArtifactForm
        artifacts={searchResults}
        valueFn={J.prop('id')}
        displayFn={J.prop('title')}
        onSearch={handleSearch}
        onSubmit={handleSubmit}
        onCancel={onCancel}
      />
    </div>
  );
};

NewEventArtifact.propTypes = {
  eventId: PropTypes.string.isRequired,
  onNew: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
