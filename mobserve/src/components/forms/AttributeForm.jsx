import PropTypes from 'prop-types';
import { useForm } from '../../hooks/form';
import { TextField } from '../TextField';
import { Button } from '../Button';
import { Form } from '../Form';
import { FlexRow } from '../FlexRow';

export const AttributeForm = ({ submitButtonText, onSubmit, onCancel }) => {
  const { propsForField, propsForForm } = useForm(
    {
      name: {},
      value: {},
    },
    onSubmit,
  );

  return (
    <Form {...propsForForm()}>
      <TextField label="Name" {...propsForField('name')} autoFocus />
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

AttributeForm.propTypes = {
  submitButtonText: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
