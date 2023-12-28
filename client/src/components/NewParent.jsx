import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { useParentRoles } from '../hooks/parent-roles';
import { usePeopleSearch } from '../hooks/people-search';
import * as J from 'jlib';
import { useParents } from '../hooks/parents';
import { NewParentForm } from './NewParentForm';

export const NewParent = ({ childId, onNewParent }) => {
  const { parentRoles } = useParentRoles();
  const { searchForPeople } = usePeopleSearch();
  const [searchResults, setSearchResults] = useState([]);
  const { addParent } = useParents(childId);

  const handleSubmit = useCallback(
    ({ parentId, parentRoleId }) => {
      addParent(parentId, parentRoleId).then(() => {
        setSearchResults([]);
        onNewParent();
      });
    },
    [addParent, setSearchResults, onNewParent],
  );

  const handleSearch = useCallback(
    (q) => {
      searchForPeople(q)
        .then((people) => people.filter((person) => person.id !== childId))
        .then(setSearchResults);
    },
    [searchForPeople, childId],
  );

  return (
    <div className="max-w-md">
      <NewParentForm
        people={searchResults}
        valueFn={J.prop('id')}
        displayFn={(parent) => `${parent.surname}, ${parent.givenNames}`}
        parentRoles={parentRoles}
        onSearch={handleSearch}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

NewParent.propTypes = {
  childId: PropTypes.string.isRequired,
  onNewParent: PropTypes.func.isRequired,
};
