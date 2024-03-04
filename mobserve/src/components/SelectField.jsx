import PropTypes from 'prop-types';
import { Label } from './Label';
import { Select } from './Select';
import { Typography } from './Typography';
import { classnames } from '../lib/classnames';

export const SelectField = ({
  label,
  options,
  valueFn,
  displayFn,
  includeEmpty,
  error,
  value,
  onChange,
}) => (
  <Label value={label}>
    <Select
      options={options}
      valueFn={valueFn}
      displayFn={displayFn}
      includeEmpty={includeEmpty}
      value={value}
      onChange={onChange}
    />
    <Typography as="error" className={classnames(error ? '' : 'invisible')}>
      {error}
    </Typography>
  </Label>
);

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  valueFn: PropTypes.func,
  displayFn: PropTypes.func,
  includeEmpty: PropTypes.bool,
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
