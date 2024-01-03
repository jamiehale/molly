import PropTypes from 'prop-types';
import { useForm } from '../hooks/form';
import { TextField } from './TextField';
import { Button } from './Button';
import { Form } from './Form';
import { FlexRow } from './FlexRow';
import { required } from '../lib/validation';

export const LocationForm = ({
  location,
  submitButtonText,
  onSubmit,
  onCancel,
}) => {
  const { propsForField, propsForForm } = useForm(
    {
      value: {
        initialValue: location ? location.value : '',
        validates: [required(() => 'Enter a value')],
      },
    },
    onSubmit,
  );

  return (
    <Form {...propsForForm()}>
      <TextField label="Value" {...propsForField('value')} />
      <FlexRow className="mt-1">
        <Button type="submit">{submitButtonText || 'Add'}</Button>
        <Button type="button" onClick={onCancel}>
          Cancel
        </Button>
      </FlexRow>
    </Form>
  );
};

LocationForm.propTypes = {
  location: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }),
  submitButtonText: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
