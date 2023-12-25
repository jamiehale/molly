import PropTypes from "prop-types";

export const SelectField = ({ label, value, onChange, children }) => (
  <label className="flex flex-col">
    <p className="">{label}:</p>
    <select
      className="px-2 py-2.5 rounded-md border"
      value={value}
      onChange={onChange}
    >
      {children}
    </select>
  </label>
);

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
