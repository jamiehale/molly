import PropTypes from 'prop-types';
import { useForm } from '../../hooks/form';
import { Form } from '../Form';
import { SelectField } from '../SelectField';
import { FlexRow } from '../FlexRow';
import { Button } from '../Button';
import { PersonSelectField } from '../PersonSelectField';
import * as J from '../../lib/jlib';

export const NewChildForm = ({
  people,
  valueFn,
  displayFn,
  onSearch,
  parentRoles,
  onSubmit,
  onCancel,
}) => {
  const { propsForField, propsForForm } = useForm(
    {
      child: { initialValue: null, autoFocus: true },
      parentRoleId: { initialValue: 'biological' },
    },
    ({ child, parentRoleId }) => {
      onSubmit({ childId: child.id, parentRoleId });
    },
  );

  return (
    <Form {...propsForForm()}>
      <PersonSelectField
        label="Child"
        people={people}
        valueFn={valueFn}
        displayFn={displayFn}
        onSearch={onSearch}
        {...propsForField('child')}
        autoFocus
      />
      <SelectField
        label="Parent Role"
        options={parentRoles}
        valueFn={J.prop('id')}
        displayFn={J.prop('title')}
        {...propsForField('parentRoleId')}
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

NewChildForm.propTypes = {
  people: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      givenNames: PropTypes.string,
      surname: PropTypes.string,
    }),
  ),
  valueFn: PropTypes.func,
  displayFn: PropTypes.func,
  parentRoles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ),
  onSearch: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
