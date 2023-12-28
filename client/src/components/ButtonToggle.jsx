import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { Button } from './Button';

export const ButtonToggle = ({ buttonText, renderOpen }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return open ? (
    renderOpen(handleClose)
  ) : (
    <Button type="button" onClick={handleOpen}>
      {buttonText || 'Open'}
    </Button>
  );
};

ButtonToggle.propTypes = {
  buttonText: PropTypes.string,
  renderOpen: PropTypes.func.isRequired,
};
