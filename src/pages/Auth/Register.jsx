import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  DynamicInput,
  LabelInput,
  Layout,
  Toast,
} from '../../components';
import Logo from '../../assets/img/logotipo.png';
import useSubmit from '../../hooks/submit';
import { useRegister } from '../../hooks/auth';
import { authSchema } from '../../utils/schema';
import { signInRoute } from '../../utils/constants';
import InputDate from '../../components/InputDate';

const Register = () => {
  const action = useRegister();
  const navigate = useNavigate();
  const schema = authSchema.register;
  const currYr = new Date().getFullYear();
  const fields = [
    'company',
    'modelStart',
    'openingCash',
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
    if (response) navigate(`/revenue`);
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
              <h2 className="text-center text-2xl px-2 uppercase">
                From Idea, to Launch.
              </h2>
              <h3 className="text-center px-2 py-5">
                Enter your Company details
              </h3>
              <div className="w-full mt-4" key="company">
                <LabelInput
                  name="company"
                  type="text"
                  register={registerFields.company}
                  noOk={!!errors.company}
                  ok={!errors.company && dirtyFields.company}
                >
                  Company
                </LabelInput>
                <p className="text-red font-normal text-xs">
                  <span className="flex mx-auto max-w-368">
                    {errors.company?.message}
                  </span>
                </p>
              </div>

              <div className="w-full mt-4 mx-auto" key="modelStart">
                <InputDate
                  label="Model Start Year"
                  views={['year']}
                  register={registerFields.modelStart}
                  value={currYr.toString()}
                  name={registerFields[1]}
                />
                <p className="text-red font-normal text-xs">
                  <span className="flex mx-auto max-w-368">
                    {errors.modelStart?.message}
                  </span>
                </p>
              </div>

              <div className="w-full mt-4" key="openingCash">
                <DynamicInput
                  variant="modal"
                  name="openingCash"
                  register={registerFields.openingCash}
                  type="money"
                  noIcon
                  label="Opening Cash Balance"
                >
                  Opening Cash Balance
                </DynamicInput>
                <p className="text-red font-normal text-xs">
                  <span className="flex mx-auto max-w-368">
                    {errors.openingCash?.message}
                  </span>
                </p>
              </div>

              <div className="w-full mt-4" key="email">
                <LabelInput
                  name="email"
                  type="mail"
                  register={registerFields.email}
                  noOk={!!errors.email}
                  ok={!errors.email && dirtyFields.email}
                >
                  Contact Email
                </LabelInput>
                <p className="text-red font-normal text-xs">
                  <span className="flex mx-auto max-w-368">
                    {errors.email?.message}
                  </span>
                </p>
              </div>

              <div className="w-full mt-4" key="password">
                <LabelInput
                  name="password"
                  type="password"
                  register={registerFields.password}
                  noOk={!!errors.password}
                  ok={!errors.password && dirtyFields.password}
                >
                  Password
                </LabelInput>
                <p className="text-red font-normal text-xs">
                  <span className="flex mx-auto max-w-368">
                    {errors.password?.message}
                  </span>
                </p>
              </div>

              <div className="w-full mt-4" key="confirmPassword">
                <LabelInput
                  name="confirmPassword"
                  type="password"
                  register={registerFields.confirmPassword}
                  noOk={!!errors.confirmPassword}
                  ok={!errors.confirmPassword && dirtyFields.confirmPassword}
                >
                  Confirm Password
                </LabelInput>
                <p className="text-red font-normal text-xs">
                  <span className="flex mx-auto max-w-368">
                    {errors.confirmPassword?.message}
                  </span>
                </p>
              </div>

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

export default Register;
