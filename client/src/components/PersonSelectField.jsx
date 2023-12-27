import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { TextInput } from './TextInput';
import { Label } from './Label';
import { TypeAheadSearch } from './TypeAheadSearch';

export const PersonSelectField = ({
  label,
  people,
  value, // person
  onChange,
  onSearch,
  valueFn,
  displayFn,
}) => {
  console.log('PersonSelectField', value);
  const [editing, setEditing] = useState(!value);

  const peopleLookup = useMemo(
    () =>
      people.reduce(
        (acc, person) => ({
          ...acc,
          [valueFn(person)]: person,
        }),
        {},
      ),
    [people, valueFn],
  );

  useEffect(() => {
    setEditing(!value);
  }, [setEditing, value]);

  const handleChange = useCallback(
    (id) => {
      setEditing(false);
      onChange(peopleLookup[id]);
    },
    [setEditing, onChange, peopleLookup],
  );

  const handleFocus = useCallback(() => {
    setEditing(true);
  }, [setEditing]);

  return (
    <Label value={label}>
      {editing ? (
        <TypeAheadSearch
          options={people}
          valueFn={valueFn}
          displayFn={displayFn}
          onSearch={onSearch}
          value={value ? valueFn(value) : ''}
          onChange={handleChange}
        />
      ) : (
        <TextInput
          readOnly={true}
          onFocus={handleFocus}
          value={value ? displayFn(value) : ''}
          onChange={() => {}}
        />
      )}
    </Label>
  );
};

PersonSelectField.propTypes = {
  label: PropTypes.string.isRequired,
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
  value: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  valueFn: PropTypes.func.isRequired,
  displayFn: PropTypes.func.isRequired,
};
