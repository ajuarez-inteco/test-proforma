import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Auth } from 'aws-amplify';

import { useNavigate } from 'react-router-dom';
import { authSchema } from '../../utils/schema/auth.schema';
import {
  Button, Card, LabelInput, Layout, Loader, Toast,
} from '../../components';
import LogoImg from '../../assets/img/logotipo.png';

const ForgotPassword = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [alertError, setAlertError] = useState();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(authSchema.email),
  });
  const registerEmail = register('email');

  const handleForm = ({ email }) => {
    setShowLoader(true);
    Auth.forgotPassword(email)
      .then(() => {
        setShowLoader(false);
        navigate('/updatepassword');
      })
      .catch((e) => {
        setAlertError(e.message);
        setShowLoader(false);
      });
  };
  return (
    <Layout title="Forgot Password">
      {alertError && (
        <Toast
          text={alertError}
          type="alert"
          timeOn
        />
      )}
      {showLoader && <Loader fullScreen />}
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
            <form
              onSubmit={handleSubmit(handleForm)}
            >
              <h2 className="text-center text-2xl pt-2 pb-8">FORGOT PASSWORD</h2>
              <p className="text-center text-4 font-normal">
                <span className="flex mx-auto max-w-368">
                  Enter the email address you used when you signed up to get
                  instructions on how to reset your password.
                </span>
              </p>
              <div className="mt-8">
                <LabelInput
                  name="email"
                  type="email"
                  register={registerEmail}
                  noOk={Boolean(errors.email)}
                >
                  E-mail
                </LabelInput>
                {errors.email && (
                  <p className="text-center text-xs text-red font-normal">
                    <span className="flex mx-auto max-w-368">
                      {errors?.email?.message}
                    </span>
                  </p>
                )}
              </div>
              <div className="flex justify-center mx-auto my-6">
                <Button submit>Send Reset Instructions</Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </Layout>
  );
};
export default ForgotPassword;
