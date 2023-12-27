import PropTypes from "prop-types";
import { useForm } from "../hooks/form";
import { TextField } from "./TextField";
import { SelectField } from "./SelectField";
import { Button } from "./Button";
import { Form } from "./Form";
import { FlexRow } from "./FlexRow";

export const NewPersonForm = ({ genders, onSubmit }) => {
  const { propsForField, propsForForm } = useForm(
    {
      givenNames: {},
      surname: {},
      genderId: { initialValue: "male" },
    },
    onSubmit
  );

  return (
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
  );
};

NewPersonForm.propTypes = {
  genders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
  onSubmit: PropTypes.func.isRequired,
};
