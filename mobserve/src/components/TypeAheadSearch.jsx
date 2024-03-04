import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { useDebounced } from '../hooks/debounced';
import { Typography } from './Typography';
import { TextInput } from './TextInput';
import { PickList } from './PickList';

export const TypeAheadSearch = ({
  options,
  valueFn,
  displayFn,
  onSearch,
  value,
  onChange,
  autoFocus,
}) => {
  const [typedValue, setTypedValue] = useState(value ? displayFn(value) : '');
  const debouncedTypedValue = useDebounced(typedValue);

  useEffect(() => {
    if (debouncedTypedValue) {
      onSearch(debouncedTypedValue);
    }
  }, [debouncedTypedValue, onSearch]);

  const handleFocus = useCallback((e) => {
    e.target.select();
  }, []);

  return (
    <>
      <TextInput
        value={typedValue}
        onChange={setTypedValue}
        autoFocus={autoFocus}
        onFocus={handleFocus}
      />
      {options.length > 0 ? (
        <PickList
          options={options}
          valueFn={valueFn}
          displayFn={displayFn}
          value={value ? valueFn(value) : ''}
          onChange={onChange}
        />
      ) : (
        <Typography>No results</Typography>
      )}
    </>
  );
};

TypeAheadSearch.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  valueFn: PropTypes.func,
  displayFn: PropTypes.func,
  onSearch: PropTypes.func.isRequired,
  value: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  autoFocus: PropTypes.bool,
};
