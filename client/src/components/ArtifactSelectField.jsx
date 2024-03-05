import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { TextInput } from './TextInput';
import { Label } from './Label';
import { TypeAheadSearch } from './TypeAheadSearch';

export const ArtifactSelectField = ({
  label,
  artifacts,
  value, // artifact
  onChange,
  onSearch,
  valueFn,
  displayFn,
  autoFocus,
}) => {
  const [editing, setEditing] = useState(!value);

  const artifactsLookup = useMemo(
    () =>
      artifacts.reduce(
        (acc, person) => ({
          ...acc,
          [valueFn(person)]: person,
        }),
        {},
      ),
    [artifacts, valueFn],
  );

  useEffect(() => {
    setEditing(!value);
  }, [setEditing, value]);

  const handleChange = useCallback(
    (id) => {
      setEditing(false);
      onChange(artifactsLookup[id]);
    },
    [setEditing, onChange, artifactsLookup],
  );

  const handleFocus = useCallback(() => {
    setEditing(true);
  }, [setEditing]);

  return (
    <Label value={label}>
      {editing ? (
        <TypeAheadSearch
          options={artifacts}
          valueFn={valueFn}
          displayFn={displayFn}
          onSearch={onSearch}
          value={value}
          onChange={handleChange}
          autoFocus={autoFocus}
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

ArtifactSelectField.propTypes = {
  label: PropTypes.string.isRequired,
  artifacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  value: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  valueFn: PropTypes.func.isRequired,
  displayFn: PropTypes.func.isRequired,
  autoFocus: PropTypes.bool,
};
