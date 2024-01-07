import PropTypes from 'prop-types';
import { useForm } from '../../hooks/form';
import { TextField } from '../TextField';
import { SelectField } from '../SelectField';
import { Button } from '../Button';
import { Form } from '../Form';
import { FlexRow } from '../FlexRow';
import * as J from '../../lib/jlib';
import { TextAreaField } from '../TextAreaField';

export const ArtifactForm = ({
  artifact,
  artifactTypes,
  artifactSources,
  collections,
  submitButtonText,
  onSubmit,
  onCancel,
}) => {
  const { propsForField, propsForForm } = useForm(
    {
      title: { initialValue: artifact ? artifact.title : '' },
      description: { initialValue: artifact ? artifact.description : '' },
      typeId: { initialValue: artifact ? artifact.typeId : '' },
      sourceId: { initialValue: artifact ? artifact.sourceId : '' },
      collectionId: { initialValue: artifact ? artifact.collectionId : '' },
    },
    onSubmit,
  );
  // const autofocusRef = useAutofocus();

  return (
    <Form {...propsForForm()}>
      <TextField label="Title" {...propsForField('title')} autoFocus />
      <TextAreaField label="Description" {...propsForField('description')} />
      <SelectField
        options={artifactTypes}
        valueFn={J.prop('id')}
        displayFn={J.prop('title')}
        label="Type"
        {...propsForField('typeId')}
      />
      <SelectField
        options={artifactSources}
        valueFn={J.prop('id')}
        displayFn={J.prop('title')}
        label="Source"
        {...propsForField('sourceId')}
      />
      <SelectField
        options={collections}
        valueFn={J.prop('id')}
        displayFn={J.prop('title')}
        label="Collection"
        {...propsForField('collectionId')}
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

ArtifactForm.propTypes = {
  artifact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    typeId: PropTypes.string.isRequired,
    sourceId: PropTypes.string.isRequired,
    collectionId: PropTypes.string.isRequired,
  }),
  artifactTypes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ),
  artifactSources: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ),
  collections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ),
  submitButtonText: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
