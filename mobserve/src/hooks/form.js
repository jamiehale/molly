import { useCallback, useReducer } from 'react';
import * as J from '../lib/jlib';
import { validate, validateField } from '../lib/validation';

const reducer = (state, action) => {
  switch (action.type) {
    case 'set':
      return {
        ...state,
        values: {
          ...state.values,
          [action.field]: action.value,
        },
        ...(state.submitted
          ? {
              errors: {
                ...state.errors,
                [action.field]: validateField(
                  action.field,
                  state.fields[action.field],
                  action.value,
                ),
              },
            }
          : {}),
      };
    case 'submit':
      return {
        ...state,
        submitted: true,
      };
    case 'reset':
      return {
        ...state,
        values: action.values,
      };
    case 'setFieldErrors':
      return {
        ...state,
        errors: action.errors,
      };
    case 'setFormError':
      return {
        ...state,
        formError: action.error,
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
          ? ''
          : fields[field].initialValue,
    }),
    {},
  );

export const useForm = (fields, onSubmit) => {
  const [state, dispatch] = useReducer(reducer, {
    submitted: false,
    fields,
    values: initialValueFrom(fields),
    errors: {},
  });

  const setFormValue = useCallback(
    (field, value) => {
      dispatch({ type: 'set', field, value });
    },
    [dispatch],
  );

  const propsForField = useCallback(
    (field) => {
      const handleChangeField = (value) => {
        dispatch({ type: 'set', field, value });
      };

      return {
        name: field,
        value: state.values[field],
        error: state.errors[field],
        onChange: handleChangeField,
        ...(state.fields[field].autoFocus ? { autoFocus: true } : {}),
      };
    },
    [state, dispatch],
  );

  const propsForForm = useCallback(() => {
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch({ type: 'submit' });
      const errors = validate(fields, state.values);
      if (J.isEmpty(errors)) {
        onSubmit(state.values)
          .then(() => {
            dispatch({ type: 'reset', values: initialValueFrom(fields) });
          })
          .catch((e) => {
            dispatch({ type: 'setFormError', error: e.message });
          });
      } else {
        dispatch({ type: 'setFieldErrors', errors });
      }
    };

    return {
      error: state.formError,
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
