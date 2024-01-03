import PropTypes from 'prop-types';
import { Typography } from './Typography';

export const Form = ({ error, onSubmit, children }) => (
  <form className="flex flex-col p-1" onSubmit={onSubmit}>
    {error && (
      <Typography as="error" className={error ? '' : 'invisible'}>
        {error}
      </Typography>
    )}
    {children}
  </form>
);

Form.propTypes = {
  error: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
