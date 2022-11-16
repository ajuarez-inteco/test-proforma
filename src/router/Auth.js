import React from 'react';
import {
  SignUp,
  SignIn,
  CreatePassword,
  ForgotPassword,
  GetStarted,
  SuccessSignUp,
  SuccessVerification,
  ErrorService,
  Register,
} from '../pages/Auth';
import {
  confirmSignUp,
  resendConfirmationCode,
} from '../services/auth';
import ErrorPage from '../pages/ErrorPage';
import { Toast } from '../components';

export const getAuthRouter = (isLogin) => {
  console.log(isLogin);
  return [
    {
      path: 'signup',
      element: <SignUp />,
      errorElement: <ErrorPage />,
    },
    {
      path: 'success/:userId',
      element: <SuccessSignUp />,
      errorElement: <ErrorPage />,
      action: confirmSignUp,
      children: [
        {
          children: [
            {
              path: 'newcode',
              action: resendConfirmationCode,
              element: <Toast text="New code verification was sent" type="success" timeOn />,
              errorElement: <ErrorService />,
            },
            {
              path: 'error',
              element: <ErrorService />,
            },
          ],
        },
      ],
    },
    {
      path: 'success/verified',
      element: <SuccessVerification />,
    },
    {
      path: 'signin',
      element: <SignIn />,
      errorElement: <ErrorPage />,
    },
    {
      path: 'register',
      element: <Register />,
      errorElement: <ErrorPage />,
    },
    {
      path: 'updatepassword',
      element: <CreatePassword />,
      errorElement: <ErrorPage />,
    },
    {
      path: 'forgotpassword',
      element: <ForgotPassword />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/',
      element: <GetStarted />,
      errorElement: <ErrorPage />,
    },
  ];
};
