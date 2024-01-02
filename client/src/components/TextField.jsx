import PropTypes from 'prop-types';
import { Typography } from './Typography';
import { TextInput } from './TextInput';
import { Label } from './Label';
import { classnames } from '../lib/classnames';

export const TextField = ({ label, value, error, onChange }) => (
  <Label value={label}>
    <TextInput value={value} onChange={onChange} />
    <Typography as="error" className={classnames(error ? '' : 'invisible')}>
      {error}
    </Typography>
  </Label>
);

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
