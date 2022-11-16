import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LabelInput, Button, Layout, Loader, Toast, Card,
} from '../../components';
import CallToAction from '../../components/CallToActionComponent';
import useUpdatePassword from '../../hooks/updatePassword';
import LogoImg from '../../assets/img/logotipo.png';
import { signInRoute } from '../../utils/constants';

const CreatePassword = () => {
  const {
    showModal, buildForm, onSubmit, showLoader, serviceError, setServiceError,
  } = useUpdatePassword();
  return (
    <Layout title="Update Password">
      {showModal ? (
        <CallToAction />
      ) : (
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
                onSubmit={onSubmit}
              >
                <h2 className="text-center text-2xl pt-2 pb-8">CREATE PASSWORD</h2>
                <p className="text-center text-4 font-normal">
                  <span className="flex mx-auto max-w-368">
                    Please change your password before proceding.
                  </span>
                </p>

                {buildForm.map(
                  ({
                    name, type, register, ok, error, label, errorMessage,
                  }) => (
                    <div className="w-full mt-8" key={name}>
                      <LabelInput
                        name={name}
                        type={type}
                        register={register}
                        ok={ok}
                        noOk={error}
                      >
                        {label}
                      </LabelInput>
                      {error && (
                        <p className="text-red font-normal text-xs">
                          <span className="flex mx-auto max-w-368">
                            {errorMessage}
                          </span>
                        </p>
                      )}
                    </div>
                  ),
                )}

                <p className="text-center font-normal text-xs my-8">
                  <span className="flex mx-auto max-w-368">
                    Password must be 8 or more characters in length and contain at
                    least 1 uppercase letter, 1 lowercase letter, and 1 number.
                  </span>
                </p>
                <div className="flex justify-center mx-auto my-6">
                  <Button type="submit" submit>
                    Submit
                  </Button>
                </div>
                <div className="flex mt-12 mb-2 justify-center gap-1.5">
                  <span className="text-xs text-black">
                    Already have an account?
                  </span>
                  <NavLink
                    to={signInRoute}
                    className="text-xs text-blueDark"
                  >
                    Sign In
                  </NavLink>
                </div>
              </form>
            </Card>
          </div>
        </div>
      )}
      {showLoader && <Loader fullScreen />}
      {serviceError && <Toast type="alert" timeOn text={serviceError} closeAction={() => setServiceError('')} />}
    </Layout>
  );
};

export default CreatePassword;
