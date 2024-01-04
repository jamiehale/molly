import PropTypes from 'prop-types';
import { useForm } from '../../hooks/form';
import { TextField } from '../TextField';
import { Button } from '../Button';
import { Form } from '../Form';
import { FlexRow } from '../FlexRow';

export const ArtifactCollectionForm = ({
  artifactCollection,
  submitButtonText,
  onSubmit,
  onCancel,
}) => {
  const { propsForField, propsForForm } = useForm(
    {
      title: {
        initialValue: artifactCollection ? artifactCollection.title : '',
      },
      shortName: {
        initialValue: artifactCollection ? artifactCollection.shortName : '',
      },
      description: {
        initialValue: artifactCollection ? artifactCollection.description : '',
      },
    },
    onSubmit,
  );

  return (
    <Form {...propsForForm()}>
      <TextField label="Title" {...propsForField('title')} />
      <TextField label="Short Name" {...propsForField('shortName')} />
      <TextField label="Description" {...propsForField('description')} />
      <FlexRow className="mt-1">
        <Button type="submit">{submitButtonText || 'Add'}</Button>
        <Button type="button" onClick={onCancel}>
          Cancel
        </Button>
      </FlexRow>
    </Form>
  );
};

ArtifactCollectionForm.propTypes = {
  artifactCollection: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    shortName: PropTypes.string.isRequired,
    description: PropTypes.string,
  }),
  submitButtonText: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
