import PropTypes from "prop-types";
import { useCallback } from "react";

export const PickList = ({ options, valueFn, displayFn, value, onChange }) => {
  const theValueFn = valueFn || ((o) => o.value);
  const theDisplayFn = displayFn || ((o) => o.display);

  const handleChange = useCallback(
    (e) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <select size="10" value={value} onChange={handleChange}>
      <option value=""></option>
      {options.map((option) => (
        <option key={theValueFn(option)} value={theValueFn(option)}>
          {theDisplayFn(option)}
        </option>
      ))}
    </select>
  );
};

PickList.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  valueFn: PropTypes.func,
  displayFn: PropTypes.func,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
