import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { useEventPersonRoles } from '../../../hooks/event-person-roles';
import { usePeopleSearch } from '../../../hooks/people-search';
import { EventPersonForm } from '../../forms/EventPersonForm';
import * as J from '../../../lib/jlib';
import { useCreateEventPerson } from '../../../hooks/create-event-person';

export const NewEventPerson = ({ eventId, onNew, onCancel }) => {
  const { eventPersonRoles } = useEventPersonRoles();
  const { searchForPeople } = usePeopleSearch();
  const [searchResults, setSearchResults] = useState([]);
  const { createEventPerson } = useCreateEventPerson(eventId);

  const handleSubmit = useCallback(
    ({ personId, roleId }) =>
      createEventPerson(personId, roleId).then(() => {
        setSearchResults([]);
        onNew();
      }),
    [createEventPerson, setSearchResults, onNew],
  );

  const handleSearch = useCallback(
    (q) => {
      searchForPeople(q).then(setSearchResults);
    },
    [searchForPeople, setSearchResults],
  );

  return (
    <div className="max-w-md">
      <EventPersonForm
        people={searchResults}
        valueFn={J.prop('id')}
        displayFn={(child) => `${child.surname}, ${child.givenNames}`}
        eventPersonRoles={eventPersonRoles}
        onSearch={handleSearch}
        onSubmit={handleSubmit}
        onCancel={onCancel}
      />
    </div>
  );
};

NewEventPerson.propTypes = {
  eventId: PropTypes.string.isRequired,
  onNew: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
