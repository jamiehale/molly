import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { useParentRoles } from '../../../hooks/parent-roles';
import { usePeopleSearch } from '../../../hooks/people-search';
import * as J from '../../../lib/jlib';
import { useCreateParent } from '../../../hooks/create-parent';
import { NewParentForm } from '../../forms/NewParentForm';

export const NewParent = ({ childId, onNewParent, onCancel }) => {
  const { parentRoles } = useParentRoles();
  const { searchForPeople } = usePeopleSearch();
  const [searchResults, setSearchResults] = useState([]);
  const { createParent } = useCreateParent(childId);

  const handleSubmit = useCallback(
    ({ parentId, parentRoleId }) =>
      createParent(parentId, parentRoleId).then(() => {
        setSearchResults([]);
        onNewParent();
      }),
    [createParent, setSearchResults, onNewParent],
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
        onCancel={onCancel}
      />
    </div>
  );
};

NewParent.propTypes = {
  childId: PropTypes.string.isRequired,
  onNewParent: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
