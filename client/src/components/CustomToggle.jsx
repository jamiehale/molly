import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';

export const CustomToggle = ({ renderOpen, renderClosed }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return open ? renderOpen(handleClose) : renderClosed(handleOpen);
};

CustomToggle.propTypes = {
  renderOpen: PropTypes.func.isRequired,
  renderClosed: PropTypes.func.isRequired,
};
