import PropTypes from 'prop-types';
import { Label } from './Label';
import { Select } from './Select';

export const SelectField = ({
  label,
  options,
  valueFn,
  displayFn,
  value,
  onChange,
}) => (
  <Label value={label}>
    <Select
      options={options}
      valueFn={valueFn}
      displayFn={displayFn}
      value={value}
      onChange={onChange}
    />
  </Label>
);

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  valueFn: PropTypes.func,
  displayFn: PropTypes.func,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
