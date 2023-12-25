import PropTypes from "prop-types";
import { Typography } from "./Typography";

export const TextField = ({ label, value, onChange }) => (
  <label className="flex flex-col">
    <Typography>{label}:</Typography>
    <input
      className="mt-1 px-2 py-2 rounded-md border"
      type="text"
      value={value}
      onChange={onChange}
    />
    <Typography className="invisible">Error</Typography>
  </label>
);

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
