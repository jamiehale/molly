import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { TextField } from "./TextField";
import { useDebounced } from "../hooks/debounced";
import { Typography } from "./Typography";

export const TypeAheadSelectField = ({
  label,
  value,
  onChange,
  onSearch,
  valueFn,
  displayFn,
}) => {
  const [typedValue, setTypedValue] = useState(value);
  const [displayValue, setDisplayValue] = useState("");
  const debouncedTypedValue = useDebounced(typedValue);
  const [searchResults, setSearchResults] = useState([]);

  const displayLookup = searchResults.reduce(
    (acc, result) => ({
      ...acc,
      [valueFn(result)]: displayFn(result),
    }),
    {}
  );

  const handleTextChange = useCallback(
    (e) => {
      setTypedValue(e.target.value);
    },
    [setTypedValue]
  );

  const handleChange = useCallback(
    (e) => {
      setDisplayValue(displayLookup[e.target.value]);
      setTypedValue("");
      onChange(e);
    },
    [setDisplayValue, setTypedValue, onChange]
  );

  useEffect(() => {
    if (debouncedTypedValue) {
      onSearch(debouncedTypedValue).then((results) => {
        setSearchResults(results);
      });
    } else {
      setSearchResults([]);
    }
  }, [onSearch, setSearchResults, debouncedTypedValue]);

  return (
    <div>
      <TextField
        label={label}
        value={displayValue}
        onChange={handleTextChange}
      />
      {searchResults.length > 0 ? (
        <select size="10" value={value} onChange={handleChange}>
          <option value=""></option>
          {searchResults.map((searchResult) => (
            <option key={valueFn(searchResult)} value={valueFn(searchResult)}>
              {displayFn(searchResult)}
            </option>
          ))}
        </select>
      ) : (
        <Typography>No results</Typography>
      )}
    </div>
  );
};

TypeAheadSelectField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  valueFn: PropTypes.func.isRequired,
  displayFn: PropTypes.func.isRequired,
};
