import PropTypes from "prop-types";
import { useCallback } from "react";
import { useParentRoles } from "../hooks/parent-roles";
import { useApi } from "../hooks/api";
import { usePeopleSearch } from "../hooks/people-search";
import { NewChildForm } from "./NewChildForm";

export const NewChild = ({ parentId }) => {
  const { authorizedGet } = useApi("http://localhost:3000/api", "12345");
  const { parentRoles } = useParentRoles(authorizedGet);
  const { searchForPeople } = usePeopleSearch(authorizedGet);

  const handleSubmit = useCallback(
    ({ childId, parentRoleId }) => {
      console.log("new child", { parentId, childId, parentRoleId });
    },
    [parentId]
  );

  const handleSearch = useCallback(
    (q) =>
      searchForPeople(q).then((people) =>
        people.filter((person) => person.id !== parentId)
      ),
    [searchForPeople, parentId]
  );

  return (
    <div className="max-w-md">
      <NewChildForm
        parentRoles={parentRoles}
        onSearch={handleSearch}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

NewChild.propTypes = {
  parentId: PropTypes.string.isRequired,
};
