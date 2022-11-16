import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Card, Layout } from '../../components';
import Logo from '../../assets/img/logotipo.png';
import { signInRoute } from '../../utils/constants';

const SuccessVerification = () => (
  <Layout>
    <div className="z-3 flex flex-col min-h-full my-20">

      <div className="flex flex-col flex-auto justify-center items-center">
        <Card>
          <div className="flex flex-col flex-auto justify-center items-center">
            <img
              src={Logo}
              alt="logotipo"
              className="max-w-368 w-full h-auto mb-16"
            />
          </div>
          <h1 className="text-center text-4xl my-4">Account Created</h1>
          <div className="flex justify-center my-4">
            <NavLink to={signInRoute}>
              <Button>Go to Sign In</Button>
            </NavLink>
          </div>
        </Card>
      </div>
    </div>
  </Layout>
);

export default SuccessVerification;
