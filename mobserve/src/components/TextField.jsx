import PropTypes from 'prop-types';
import { Typography } from './Typography';
import { TextInput } from './TextInput';
import { Label } from './Label';
import { classnames } from '../lib/classnames';
import { useCallback } from 'react';

export const TextField = ({ label, value, error, onChange, autoFocus }) => {
  const handleFocus = useCallback((e) => {
    e.target.select();
  }, []);

  return (
    <Label value={label}>
      <TextInput
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        autoFocus={autoFocus}
      />
      <Typography as="error" className={classnames(error ? '' : 'invisible')}>
        {error}
      </Typography>
    </Label>
  );
};

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  autoFocus: PropTypes.bool,
};
