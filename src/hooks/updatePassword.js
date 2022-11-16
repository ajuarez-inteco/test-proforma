import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';
import { useState } from 'react';
import { authSchema } from '../utils/schema';

const useUpdatePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: yupResolver(authSchema.createPassword),
    mode: 'onChange',
  });

  const registerEmail = register('email');
  const registerNewPassword = register('password');
  const registerConfirmPassword = register('confirmPassword');
  const registerCode = register('code');
  const [showModal, setShowModal] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [serviceError, setServiceError] = useState('');

  const handleForm = ({ email, password, code }) => {
    setShowLoader(true);
    Auth.forgotPasswordSubmit(email, code, password)
      .then(() => {
        setShowLoader(false);
        setShowModal(true);
      })
      .catch((err) => {
        setShowLoader(false);
        setServiceError(err.message);
      });
  };

  const buildForm = [
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      register: registerEmail,
      ok: !errors.email && dirtyFields.email,
      error: errors.email,
      errorMessage: errors?.email?.message,
    },
    {
      label: 'New Password',
      name: 'password',
      type: 'password',
      register: registerNewPassword,
      ok: !errors.password && dirtyFields.password,
      error: errors.password,
      errorMessage:
        'Password must be 8 or more characters in length and contain at least 1 uppercase letter, 1 lowercase letter, and 1 number.',
    },
    {
      label: 'Confirm New Password',
      name: 'confirmPassword',
      type: 'password',
      register: registerConfirmPassword,
      ok: !errors.confirmPassword && dirtyFields.confirmPassword,
      error: errors.confirmPassword,
      errorMessage: 'Passwords don’t match',
    },
    {
      label: 'Code',
      name: 'code',
      type: 'text',
      register: registerCode,
      ok: !errors.code && dirtyFields.code,
      error: errors.code,
      errorMessage: errors?.code?.message,
    },
  ];

  return {
    buildForm,
    onSubmit: handleSubmit(handleForm),
    showModal,
    showLoader,
    serviceError,
    setServiceError,
  };
};

export default useUpdatePassword;
