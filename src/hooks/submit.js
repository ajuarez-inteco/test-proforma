import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useYupValidationResolver from './validationResolver';

const useSubmit = ({
  schema,
  fields,
  action,
}) => {
  const resolver = useYupValidationResolver(schema);
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver,
    mode: 'onChange',
  });
  const [alertText, setAlertText] = useState();
  const [response, setResponse] = useState();

  const registerFields = fields.reduce((acc, field) => {
    Object.assign(acc, { [field]: register(field) });
    return acc;
  }, {});

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await action(data);
      setResponse(res);
    } catch (e) {
      setAlertText(e.message);
    }
  });

  return {
    errors,
    response,
    dirtyFields,
    alertText,
    setAlertText,
    registerFields,
    onSubmit,
  };
};

export default useSubmit;
