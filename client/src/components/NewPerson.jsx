import PropTypes from "prop-types";
import { useForm } from "../hooks/form";
import { TextField } from "./TextField";
import { SelectField } from "./SelectField";
import { Button } from "./Button";
import { Form } from "./Form";
import { classnames } from "../lib/classnames";

const FlexRow = ({ className, children }) => (
  <div className={classnames("flex", className)}>{children}</div>
);

FlexRow.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export const NewPerson = ({ onNewPerson, genders }) => {
  const { formValues, propsForField, propsForForm } = useForm(
    {
      givenNames: {},
      surname: {},
      genderId: { initialValue: "male" },
    },
    ({ givenNames, surname, genderId }) => {
      onNewPerson(givenNames, surname, genderId);
    }
  );

  return (
    <div className="max-w-md">
      <Form {...propsForForm()}>
        <TextField label="Given Names" {...propsForField("givenNames")} />
        <TextField label="Surname" {...propsForField("surname")} />
        <SelectField label="Gender" {...propsForField("genderId")}>
          {genders.map((gender) => (
            <option key={gender.id} value={gender.id}>
              {gender.title}
            </option>
          ))}
        </SelectField>
        <FlexRow className="mt-1">
          <Button type="submit">Add</Button>
        </FlexRow>
      </Form>
    </div>
  );
};

NewPerson.propTypes = {
  onNewPerson: PropTypes.func.isRequired,
  genders: PropTypes.arrayOf(PropTypes.object),
};
