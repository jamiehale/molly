import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { useParentRoles } from '../../../hooks/parent-roles';
import { usePeopleSearch } from '../../../hooks/people-search';
import { NewChildForm } from '../../forms/NewChildForm';
import * as J from '../../../lib/jlib';
import { useCreateChild } from '../../../hooks/create-child';

export const NewChild = ({ parentId, onNewChild, onCancel }) => {
  const { parentRoles } = useParentRoles();
  const { searchForPeople } = usePeopleSearch();
  const [searchResults, setSearchResults] = useState([]);
  const { createChild } = useCreateChild(parentId);

  const handleSubmit = useCallback(
    ({ childId, parentRoleId }) =>
      createChild(childId, parentRoleId).then(() => {
        setSearchResults([]);
        onNewChild();
      }),
    [createChild, setSearchResults, onNewChild],
  );

  const handleSearch = useCallback(
    (q) => {
      searchForPeople(q)
        .then((people) => people.filter((person) => person.id !== parentId))
        .then(setSearchResults);
    },
    [searchForPeople, parentId],
  );

  return (
    <div className="max-w-md">
      <NewChildForm
        people={searchResults}
        valueFn={J.prop('id')}
        displayFn={(child) => `${child.surname}, ${child.givenNames}`}
        parentRoles={parentRoles}
        onSearch={handleSearch}
        onSubmit={handleSubmit}
        onCancel={onCancel}
      />
    </div>
  );
};

NewChild.propTypes = {
  parentId: PropTypes.string.isRequired,
  onNewChild: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
