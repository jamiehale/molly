import PropTypes from "prop-types";
import { useForm } from "../hooks/form";
import { Form } from "./Form";
import { SelectField } from "./SelectField";
import { FlexRow } from "./FlexRow";
import { Button } from "./Button";
import { TypeAheadSelectField } from "./TypeAheadSelectField";

export const NewChildForm = ({ parentRoles, onSearch, onSubmit }) => {
  const { propsForField, propsForForm } = useForm(
    {
      childId: {},
      parentRoleId: { initialValue: "birth" },
    },
    onSubmit
  );

  return (
    <Form {...propsForForm()}>
      <TypeAheadSelectField
        label="Child"
        {...propsForField("childId")}
        onSearch={onSearch}
        valueFn={(child) => child.id}
        displayFn={(child) => `${child.surname}, ${child.givenNames}`}
      />
      <SelectField label="Parent Role" {...propsForField("parentRoleId")}>
        {parentRoles.map((parentRole) => (
          <option key={parentRole.id} value={parentRole.id}>
            {parentRole.title}
          </option>
        ))}
      </SelectField>
      <FlexRow className="mt-1">
        <Button type="submit">Add</Button>
      </FlexRow>
    </Form>
  );
};

NewChildForm.propTypes = {
  parentRoles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
  onSearch: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
