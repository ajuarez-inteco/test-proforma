import React from 'react';

import { LinkButton, Layout, Card } from '../../components';
import LogoImg from '../../assets/img/logotipo.png';
import { signInRoute } from '../../utils/constants';

const GetStarted = () => {
  return (
    <Layout title="Get Started">
      <div className="flex flex-col items-center w-full justify-center">
        <Card className="flex flex-col md:px-24 sm:px-9 py-8 items-center rounded-lg border border-solid border-gray shadow-prDefault gap-10">
          <div className="flex flex-col flex-auto justify-center items-center gap-10">
            <img src={LogoImg} alt="logotipo" className="mb-20" />
            <span className="flex text-2xl uppercase">From Idea, to Launch.</span>
            <LinkButton to="/register">Get Started</LinkButton>
            <LinkButton
              to="/captable"
              _className="w-17 h-12 text-xs text-blueDark"
            >
              or build your Cap Table
            </LinkButton>
            <span className="text-xs my-7">
              {'Already have an account? '}
              <LinkButton to={signInRoute} _className="text-blueDark">
                Sign In
              </LinkButton>
            </span>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default GetStarted;
