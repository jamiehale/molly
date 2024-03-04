import PropTypes from 'prop-types';
import { Typography } from './Typography';
import { TextArea } from './TextArea';
import { Label } from './Label';
import { classnames } from '../lib/classnames';

export const TextAreaField = ({ label, value, error, onChange }) => (
  <Label value={label}>
    <TextArea value={value} onChange={onChange} />
    <Typography as="error" className={classnames(error ? '' : 'invisible')}>
      {error}
    </Typography>
  </Label>
);

TextAreaField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
