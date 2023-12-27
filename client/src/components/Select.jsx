import PropTypes from "prop-types";
import { useCallback } from "react";

export const Select = ({ options, valueFn, displayFn, value, onChange }) => {
  const theValueFn = valueFn || ((o) => o.value);
  const theDisplayFn = displayFn || ((o) => o.display);

  const handleChange = useCallback(
    (e) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <select
      className="px-2 py-2.5 rounded-md border"
      value={value}
      onChange={handleChange}
    >
      {options.map((option) => (
        <option key={theValueFn(option)} value={theValueFn(option)}>
          {theDisplayFn(option)}
        </option>
      ))}
    </select>
  );
};

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  valueFn: PropTypes.func,
  displayFn: PropTypes.func,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
