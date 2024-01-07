import PropTypes from 'prop-types';
import { useForm } from '../../hooks/form';
import { Form } from '../Form';
import { SelectField } from '../SelectField';
import { FlexRow } from '../FlexRow';
import { Button } from '../Button';
import { PersonSelectField } from '../PersonSelectField';
import * as J from '../../lib/jlib';

export const EventPersonForm = ({
  people,
  valueFn,
  displayFn,
  onSearch,
  eventPersonRoles,
  onSubmit,
  onCancel,
}) => {
  const { propsForField, propsForForm } = useForm(
    {
      person: { initialValue: null, autoFocus: true },
      roleId: { initialValue: 'attendee' },
    },
    ({ person, roleId }) => onSubmit({ personId: person.id, roleId }),
  );

  return (
    <Form {...propsForForm()}>
      <PersonSelectField
        label="Person"
        people={people}
        valueFn={valueFn}
        displayFn={displayFn}
        onSearch={onSearch}
        {...propsForField('person')}
        autoFocus
      />
      <SelectField
        label="Roles"
        options={eventPersonRoles}
        valueFn={J.prop('id')}
        displayFn={J.prop('title')}
        {...propsForField('roleId')}
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

EventPersonForm.propTypes = {
  people: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      givenNames: PropTypes.string,
      surname: PropTypes.string,
    }),
  ),
  valueFn: PropTypes.func,
  displayFn: PropTypes.func,
  eventPersonRoles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ),
  onSearch: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
