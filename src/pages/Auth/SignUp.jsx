import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  LabelInput,
  Layout,
  Toast,
} from '../../components';
import Logo from '../../assets/img/logotipo.png';
import useSubmit from '../../hooks/submit';
import { useSignUp } from '../../hooks/auth';
import { authSchema } from '../../utils/schema';
import { signInRoute } from '../../utils/constants';

const SignUp = () => {
  const action = useSignUp();
  const navigate = useNavigate();
  const schema = authSchema.createAccount;
  const fields = [
    'firstName',
    'lastName',
    'company',
    'email',
    'password',
    'confirmPassword',
  ];
  const {
    errors,
    response,
    dirtyFields,
    alertText,
    setAlertText,
    registerFields,
    onSubmit,
  } = useSubmit({
    schema,
    action,
    fields,
  });

  useEffect(() => {
    if (response) navigate(`/success/${response.userSub}`);
  }, [response, navigate]);

  return (
    <Layout>
      {alertText && (
        <Toast
          text={alertText}
          type="alert"
          timeOn
          closeAction={() => setAlertText('')}
        />
      )}
      <div className="flex flex-col min-h-full my-20">
        <div className="flex flex-col flex-auto justify-center items-center">
          <Card>
            <div className="flex flex-col flex-auto justify-center items-center">
              <img
                src={Logo}
                alt="logo"
                className="max-w-368 w-full h-auto mb-16"
              />
            </div>
            <form onSubmit={onSubmit}>
              <h2 className="text-center text-2xl px-2">CREATE ACCOUNT</h2>
              {fields.map((field) => (
                <div className="w-full mt-8" key={field}>
                  <LabelInput
                    name={field}
                    type={/password/gi.test(field) ? 'password' : 'text'}
                    register={registerFields[field]}
                    noOk={!!errors[field]}
                    ok={!errors[field] && dirtyFields[field]}
                  >
                    {field.replace(/([A-Z]+)/g, ' $1')}
                  </LabelInput>
                  <p className="text-red font-normal text-xs">
                    <span className="flex mx-auto max-w-368">
                      {errors[field]?.message}
                    </span>
                  </p>
                </div>
              ))}
              <div className="flex justify-center mx-auto my-6">
                <Button submit>Sign Up</Button>
              </div>
              <div className="flex justify-center items-center">
                <span className="text-black my-6 text-xs">
                  {'Have an account? '}
                  <NavLink
                    to={signInRoute}
                    className="font-semibold text-xs text-blueDark"
                  >
                    Sign In
                  </NavLink>
                </span>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
