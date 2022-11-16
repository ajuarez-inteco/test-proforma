import { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useYupValidationResolver from './validationResolver';
import { authSchema } from '../utils/schema';
import { setUser, setVerify, setLogin } from '../features/auth';
import { mainRoute } from '../utils/constants';

const useSingIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const resolver = useYupValidationResolver(authSchema.login);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver,
    mode: 'onChange',
  });

  const [showLoader, setShowLoader] = useState(false);
  const [error, setError] = useState('');

  const registerEmail = register('email');
  const registerPassword = register('password');

  // TODO: falta agregar que cuando no este verificado mande al flujo de verificacion.
  const onSubmit = async ({ email, password }) => {
    try {
      setShowLoader(true);
      const res = await Auth.signIn(email, password);
      dispatch(setUser(res.attributes));
      dispatch(setVerify(true));
      dispatch(setLogin(true));
      navigate(mainRoute);
    } catch (e) {
      setShowLoader(false);
      dispatch(setLogin(false));
      setError(e.message);
    }
  };

  const buildForm = [
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      register: registerEmail,
      error: errors.email,
      errorMessage: errors?.email?.message,
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      register: registerPassword,
      error: errors.password,
      errorMessage: errors?.password?.message,
    },
  ];

  return {
    showLoader,
    onSubmit: handleSubmit(onSubmit),
    error,
    setError,
    errors,
    buildForm,
  };
};

export default useSingIn;
