import PropTypes from 'prop-types';
import { useForm } from '../../hooks/form';
import { Form } from '../Form';
import { FlexRow } from '../FlexRow';
import { Button } from '../Button';
import { ArtifactSelectField } from '../ArtifactSelectField';

export const EventArtifactForm = ({
  artifacts,
  valueFn,
  displayFn,
  onSearch,
  onSubmit,
  onCancel,
}) => {
  const { propsForField, propsForForm } = useForm(
    {
      artifact: { initialValue: null, autoFocus: true },
    },
    ({ artifact }) => onSubmit({ artifactId: artifact.id }),
  );

  return (
    <Form {...propsForForm()}>
      <ArtifactSelectField
        label="Artifact"
        artifacts={artifacts}
        valueFn={valueFn}
        displayFn={displayFn}
        onSearch={onSearch}
        {...propsForField('artifact')}
        autoFocus
      />
      <FlexRow className="mt-1">
        <Button type="submit">Add</Button>
        <Button type="button" onClick={onCancel}>
          Cancel
        </Button>
      </FlexRow>
    </Form>
  );
};

EventArtifactForm.propTypes = {
  artifacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string,
    }),
  ),
  valueFn: PropTypes.func,
  displayFn: PropTypes.func,
  onSearch: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
