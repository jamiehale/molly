import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { useParentRoles } from '../hooks/parent-roles';
import { useApi } from '../hooks/api';
import { usePeopleSearch } from '../hooks/people-search';
import { NewChildForm } from './NewChildForm';
import * as J from '../lib/jlib';
import { useChildren } from '../hooks/children';

export const NewChild = ({ parentId, onNewChild }) => {
  const { authorizedGet, authorizedPost } = useApi(
    'http://localhost:3000/api',
    '12345',
  );
  const { parentRoles } = useParentRoles(authorizedGet);
  const { searchForPeople } = usePeopleSearch(authorizedGet);
  const [searchResults, setSearchResults] = useState([]);
  const { addChild } = useChildren(parentId, authorizedGet, authorizedPost);

  const handleSubmit = useCallback(
    ({ childId, parentRoleId }) => {
      addChild(childId, parentRoleId).then(() => {
        setSearchResults([]);
        onNewChild();
      });
    },
    [addChild, setSearchResults, onNewChild],
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
      />
    </div>
  );
};

NewChild.propTypes = {
  parentId: PropTypes.string.isRequired,
  onNewChild: PropTypes.func.isRequired,
};
