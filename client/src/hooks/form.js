import { useCallback, useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "set":
      return {
        ...state,
        values: {
          ...state.values,
          [action.field]: action.value,
        },
      };
    case "reset":
      return {
        ...state,
        values: action.values,
      };
    default:
      return state;
  }
};

const initialValueFrom = (fields) =>
  Object.keys(fields).reduce(
    (acc, field) => ({
      ...acc,
      [field]:
        fields[field].initialValue === undefined
          ? ""
          : fields[field].initialValue,
    }),
    {}
  );

export const useForm = (fields, onSubmit) => {
  const [state, dispatch] = useReducer(reducer, {
    fields,
    values: initialValueFrom(fields),
  });

  const setFormValue = useCallback(
    (field, value) => {
      dispatch({ type: "set", field, value });
    },
    [dispatch]
  );

  const propsForField = useCallback(
    (field) => {
      const handleChangeField = (value) => {
        dispatch({ type: "set", field, value });
      };

      return {
        value: state.values[field],
        onChange: handleChangeField,
      };
    },
    [state, dispatch]
  );

  const propsForForm = useCallback(() => {
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(state.values);
      dispatch({ type: "reset", values: initialValueFrom(fields) });
    };

    return {
      onSubmit: handleSubmit,
    };
  }, [onSubmit, state, dispatch, fields]);

  return {
    formValues: state.values,
    formState: state,
    setFormValue,
    propsForField,
    propsForForm,
  };
};
