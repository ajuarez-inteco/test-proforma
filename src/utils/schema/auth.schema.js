import {
  object,
  string,
  number,
  ref,
} from 'yup';

const createPassword = object().shape({
  password: string()
    .required()
    .min(8)
    .matches(/[a-z]+/, '1 lowercase letter')
    .matches(
      /[A-Z]+/,
      '1 uppercase letter',
    )
    .matches(
      /(?=.*[0-9])/,
      '1 number.',
    ),
  confirmPassword: string()
    .required()
  // eslint-disable-next-line consistent-return
    .when('password', (password, schema) => {
      if (password) return schema.required('confirm password');
    })
    .oneOf([ref('password')], 'Passwords must match'),
  code: string().required(),
  email: string()
    .required()
    .matches(/^\S+@\S+$/i, 'invalid format email'),
});

const login = object().shape({
  email: string('Email is required')
    .required()
    .matches(/^\S+@\S+$/i, 'Invalid format email'),
  password: string()
    .required('Password is required.'),
});

const email = object().shape({
  email: string()
    .required()
    .matches(/^\S+@\S+$/i, 'invalid format email'),
});

const createAccount = object().shape({
  firstName: string().required('First Name is required'),
  lastName: string().required('Last Name is required'),
  company: string().required('Company Name is required'),
  email: string()
    .required('Email is required')
    .matches(/^\S+@\S+$/i, 'Invalid email format'),
  password: string()
    .required('Password is required.')
    .min(8, 'Password must be 8 or more characters in length.')
    .matches(/[a-z]+/, '1 lowercase letter')
    .matches(
      /[A-Z]+/,
      '1 uppercase letter',
    )
    .matches(
      /(?=.*[0-9])/,
      '1 number.',
    ),
  confirmPassword: string()
    .required('Confirm password is required')
    // eslint-disable-next-line consistent-return
    .when('password', (password, schema) => {
      if (password) return schema.required('confirm password');
    })
    .oneOf([ref('password')], 'Passwords must match'),
});

const codeSchema = object().shape({
  box1: string().required('Please insert a number'),
  box2: string().required('Please insert a number'),
  box3: string().required('Please insert a number'),
  box4: string().required('Please insert a number'),
  box5: string().required('Please insert a number'),
  box6: string().required('Please insert a number'),
  email: string().required(),
});

const register = object().shape({
  company: string().required('Company Name is required'),
  modelStart: number()
    .test('len', 'Must be exactly a year', (val) => val.toString().length === 4)
    .required('Model Start Year is required'),
  openingCash: number().required('Opening Cash Balance is required'),
  email: string()
    .required('Email is required')
    .matches(/^\S+@\S+$/i, 'Invalid email format'),
  password: string()
    .required('Password is required.')
    .min(8, 'Password must be 8 or more characters in length.')
    .matches(/[a-z]+/, '1 lowercase letter')
    .matches(
      /[A-Z]+/,
      '1 uppercase letter',
    )
    .matches(
      /(?=.*[0-9])/,
      '1 number.',
    ),
  confirmPassword: string()
    .required('Confirm password is required')
    // eslint-disable-next-line consistent-return
    .when('password', (password, schema) => {
      if (password) return schema.required('confirm password');
    })
    .oneOf([ref('password')], 'Passwords must match'),
});

/* eslint-disable import/prefer-default-export */
export const authSchema = {
  createPassword,
  email,
  createAccount,
  login,
  codeSchema,
  register,
};
