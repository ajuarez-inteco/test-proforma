import React from 'react';
import { NavLink } from 'react-router-dom';

import {
  Button,
  Card,
  LabelInput,
  Layout,
  Loader,
  Toast,
} from '../../components';
import useSingIn from '../../hooks/signIn';
import LogoImg from '../../assets/img/logotipo.png';

const SignIn = () => {
  const {
    error, onSubmit, showLoader, buildForm, setError,
  } = useSingIn();
  return (
    <Layout title="Sign In">
      <div className="flex flex-col min-h-full my-20">

        <div className="flex flex-col flex-auto justify-center items-center">
          <Card>
            <div className="flex flex-col flex-auto justify-center items-center">
              <img
                src={LogoImg}
                alt="logotipo"
                className="max-w-368 w-full h-auto mb-16"
              />
            </div>
            <form onSubmit={onSubmit}>
              <h2 className="text-center text-2xl pt-2 pb-8">SIGN IN</h2>
              {buildForm.map(
                ({
                  name,
                  type,
                  register,
                  error: isInvalid,
                  label,
                  errorMessage,
                }) => (
                  <div className="w-full mt-8" key={name}>
                    <LabelInput
                      name={name}
                      type={type}
                      register={register}
                      noOk={isInvalid}
                    >
                      {label}
                    </LabelInput>
                    {isInvalid && (
                      <p className="text-center text-xs text-red font-normal">
                        <span className="flex mx-auto max-w-368">
                          {errorMessage}
                        </span>
                      </p>
                    )}
                  </div>
                ),
              )}
              <div className="mx-auto max-w-368">
                <NavLink
                  to="/forgotpassword"
                  className="mt-1 text-xs text-blueDark"
                >
                  Forgot password?
                </NavLink>
              </div>
              <div className="flex justify-center mx-auto my-6">
                <Button submit>Submit</Button>
              </div>
              <div className=" flex mt-4 justify-center">
                <span className="text-xs text-black">New to Proforma?</span>
                <NavLink to="/signup" className="text-xs text-blueDark ml-0.5">
                  Create an Account
                </NavLink>
              </div>
            </form>
          </Card>
        </div>
      </div>
      {showLoader && <Loader fullScreen />}
      {error && (
        <Toast
          timeOn
          type="alert"
          text={error}
          closeAction={() => setError('')}
        />
      )}
    </Layout>
  );
};
export default SignIn;
