import PropTypes from 'prop-types';
import { useForm } from '../../hooks/form';
import { TextField } from '../TextField';
import { Button } from '../Button';
import { Form } from '../Form';
import { FlexRow } from '../FlexRow';

export const TagForm = ({ submitButtonText, onSubmit, onCancel }) => {
  const { propsForField, propsForForm } = useForm(
    {
      tag: {},
    },
    onSubmit,
  );

  return (
    <Form {...propsForForm()}>
      <TextField label="Tag" {...propsForField('tag')} autoFocus />
      <FlexRow className="mt-1">
        <Button type="submit">{submitButtonText || 'Add'}</Button>
        <Button type="button" onClick={onCancel}>
          Cancel
        </Button>
      </FlexRow>
    </Form>
  );
};

TagForm.propTypes = {
  submitButtonText: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
