import { Auth } from 'aws-amplify';

const useSignIn = () => (
  async ({
    email,
    password,
  }) => (
    Auth.signIn(email, password)
  )
);

const useSignUp = () => (
  async ({
    firstName,
    lastName,
    company,
    email,
    password,
  }) => (
    Auth.signUp({
      username: email,
      password,
      attributes: {
        'custom:first_name': firstName,
        'custom:last_name': lastName,
        'custom:company': company,
      },
    })
  )
);

const useConfirmSignUp = () => (
  async (data) => {
    const { email, ...codeJSON } = data;
    const keys = Object.keys(codeJSON);
    const code = keys.map((key) => codeJSON[key]).join('');
    return Auth.confirmSignUp(email, code);
  }
);

const useResendSignUp = () => (
  async ({
    email,
  }) => (
    Auth.resendSignUp(email)
  )
);

const useForgotPassword = () => (
  async ({
    email,
  }) => (
    Auth.forgotPassword(email)
  )
);

const useResetPassword = () => (
  async ({
    email,
    code,
    password,
  }) => (
    Auth.forgotPasswordSubmit(email, code, password)
  )
);

const useRegister = () => (
  async ({
    company,
    modelStart,
    openingCash,
    email,
    password,
  }) => (
    Auth.signUp({
      username: email,
      password,
      attributes: {
        'custom:company': company,
        'custom:modelStart': modelStart,
        'custom:openingCash': openingCash,
      },
    })
  )
);

export {
  useSignIn,
  useSignUp,
  useConfirmSignUp,
  useResendSignUp,
  useForgotPassword,
  useResetPassword,
  useRegister,
};
