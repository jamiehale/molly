import PropTypes from 'prop-types';
import { useForm } from '../hooks/form';
import { TextField } from './TextField';
import { SelectField } from './SelectField';
import { Button } from './Button';
import { Form } from './Form';
import { FlexRow } from './FlexRow';
import * as J from '../lib/jlib';

export const PersonForm = ({
  person,
  genders,
  submitButtonText,
  onSubmit,
  onCancel,
}) => {
  const { propsForField, propsForForm } = useForm(
    {
      givenNames: { initialValue: person ? person.givenNames : '' },
      surname: { initialValue: person ? person.surname : '' },
      genderId: { initialValue: person ? person.genderId : 'male' },
    },
    onSubmit,
  );

  return (
    <Form {...propsForForm()}>
      <TextField label="Given Names" {...propsForField('givenNames')} />
      <TextField label="Surname" {...propsForField('surname')} />
      <SelectField
        options={genders}
        valueFn={J.prop('id')}
        displayFn={J.prop('title')}
        label="Gender"
        {...propsForField('genderId')}
      />
      <FlexRow className="mt-1">
        <Button type="submit">{submitButtonText || 'Add'}</Button>
        <Button type="button" onClick={onCancel}>
          Cancel
        </Button>
      </FlexRow>
    </Form>
  );
};

PersonForm.propTypes = {
  person: PropTypes.shape({
    id: PropTypes.string.isRequired,
    givenNames: PropTypes.string,
    surname: PropTypes.string,
    genderId: PropTypes.string.isRequired,
  }),
  genders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ),
  submitButtonText: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
