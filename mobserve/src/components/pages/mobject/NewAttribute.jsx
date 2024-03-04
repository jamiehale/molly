import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { AttributeForm } from '../../forms/AttributeForm';
import { useCreateAttribute } from '../../../hooks/create-attribute';

export const NewAttribute = ({ keyValue, onNew, onCancel }) => {
  const { createAttribute } = useCreateAttribute(keyValue);

  const handleSubmit = useCallback(
    ({ name, value }) =>
      createAttribute(name, value).then(() => {
        onNew();
      }),
    [createAttribute, onNew],
  );

  return (
    <div className="max-w-md">
      <AttributeForm onSubmit={handleSubmit} onCancel={onCancel} />
    </div>
  );
};

NewAttribute.propTypes = {
  keyValue: PropTypes.string.isRequired,
  onNew: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
