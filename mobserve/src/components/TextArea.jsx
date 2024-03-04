import PropTypes from 'prop-types';
import { useCallback } from 'react';

export const TextArea = ({ value, onChange, ...props }) => {
  const handleChange = useCallback(
    (e) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  return (
    <textarea
      className="mt-1 px-2 py-2 rounded-md border"
      type="text"
      value={value}
      onChange={handleChange}
      {...props}
    />
  );
};

TextArea.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
