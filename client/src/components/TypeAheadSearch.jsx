import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
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
}) => {
  const [typedValue, setTypedValue] = useState(value);
  const debouncedTypedValue = useDebounced(typedValue);

  useEffect(() => {
    if (debouncedTypedValue) {
      onSearch(debouncedTypedValue);
    }
  }, [debouncedTypedValue, onSearch]);

  return (
    <>
      <TextInput value={typedValue} onChange={setTypedValue} />
      {options.length > 0 ? (
        <PickList
          options={options}
          valueFn={valueFn}
          displayFn={displayFn}
          value={value}
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
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
