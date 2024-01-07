import PropTypes from 'prop-types';
import { useForm } from '../../hooks/form';
import { TextField } from '../TextField';
import { Button } from '../Button';
import { Form } from '../Form';
import { FlexRow } from '../FlexRow';
import { TextArea } from '../TextArea';

export const CollectionForm = ({
  collection,
  submitButtonText,
  onSubmit,
  onCancel,
}) => {
  const { propsForField, propsForForm } = useForm(
    {
      title: {
        initialValue: collection ? collection.title : '',
      },
      shortName: {
        initialValue: collection ? collection.shortName : '',
      },
      description: {
        initialValue: collection ? collection.description : '',
      },
    },
    onSubmit,
  );

  return (
    <Form {...propsForForm()}>
      <TextField label="Title" {...propsForField('title')} autoFocus />
      <TextField label="Short Name" {...propsForField('shortName')} />
      <TextArea label="Description" {...propsForField('description')} />
      <FlexRow className="mt-1">
        <Button type="submit">{submitButtonText || 'Add'}</Button>
        <Button type="button" onClick={onCancel}>
          Cancel
        </Button>
      </FlexRow>
    </Form>
  );
};

CollectionForm.propTypes = {
  collection: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    shortName: PropTypes.string.isRequired,
    description: PropTypes.string,
  }),
  submitButtonText: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
