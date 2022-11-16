import React from 'react';
import { Toast } from '../../components';

const ErrorService = () => (
  <Toast
    text="Invalid verification code provided, please try again."
    type="alert"
    timeOn
  />
);

export default ErrorService;
