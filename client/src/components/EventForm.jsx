import PropTypes from 'prop-types';
import { useForm } from '../hooks/form';
import { TextField } from './TextField';
import { Button } from './Button';
import { Form } from './Form';
import { FlexRow } from './FlexRow';
import { SelectField } from './SelectField';
import * as J from '../lib/jlib';
import { isValidDate, required } from '../lib/validation';

export const EventForm = ({
  event,
  eventTypes,
  locations,
  submitButtonText,
  onSubmit,
  onCancel,
}) => {
  const { formState, propsForField, propsForForm } = useForm(
    {
      title: {
        initialValue: event ? event.title : '',
        validates: [required(() => 'Enter a title')],
      },
      typeId: {
        initialValue: event ? event.typeId : '',
        validates: [required(() => 'Select an event type')],
      },
      dateValue: {
        initialValue: event ? event.dateValue : '',
        validates: [
          required(() => 'Enter a date'),
          isValidDate(() => 'Enter a valid date value'),
        ],
      },
      locationId: {
        initialValue: event ? event.locationId : '',
        validates: [required(() => 'Select a location')],
      },
    },
    onSubmit,
  );

  console.log(formState);

  return (
    <Form {...propsForForm()}>
      <TextField label="Title" {...propsForField('title')} />
      <SelectField
        label="Type"
        options={eventTypes}
        valueFn={J.prop('id')}
        displayFn={J.prop('title')}
        includeEmpty
        {...propsForField('typeId')}
      />
      <TextField label="Date" {...propsForField('dateValue')} />
      <SelectField
        label="Location"
        options={locations}
        valueFn={J.prop('id')}
        displayFn={J.prop('value')}
        includeEmpty
        {...propsForField('locationId')}
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

EventForm.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    typeId: PropTypes.string.isRequired,
    dateValue: PropTypes.string,
    locationId: PropTypes.string,
  }),
  eventTypes: PropTypes.array,
  locations: PropTypes.array,
  submitButtonText: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
