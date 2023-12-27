import PropTypes from "prop-types";
import { Typography } from "./Typography";
import { TextInput } from "./TextInput";
import { Label } from "./Label";

export const TextField = ({ label, value, onChange }) => (
  <Label value={label}>
    <TextInput value={value} onChange={onChange} />
    <Typography className="invisible">Error</Typography>
  </Label>
);

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
