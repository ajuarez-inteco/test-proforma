import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ErrorIcon } from '../components/Icons';
import Layout from '../components/Layout';
import { signInRoute, mainRoute } from '../utils/constants';

const ErrorPage = () => {
  const [time, setTime] = useState(5);
  const navigate = useNavigate();
  const { islogin } = useSelector((state) => state.auth);

  useEffect(() => {
    // if (time > 0) {
    //   setTimeout(() => {
    //     setTime(time - 1);
    //   }, '1000');
    // }
    setTime(2);
  }, [time]);

  if (time === 0) {
    navigate(islogin ? mainRoute : signInRoute);
  }

  return (
    <Layout>
      <div className="bg-left-bottom h-pfPage w-full pt-m80 flex flex-col items-center relative">
        <div className="flex flex-col items-center gap-y-8">
          <span className="text-red text-7xl">404</span>
          <span className="text-blueDark text-4xl text-center">
            Oops!
            <br />
            Looks like This Page Isnt Available
          </span>
        </div>
        <div className="flex flex-col mt-m80 items-center gap-y-8 ">
          <span className="text-blueDark">
            REDIRECTING YOU TO THE MAIN SCREEN
          </span>
          <span className="text-3xl text-greenDark">{time}</span>
        </div>
        <div className="w-full left-0 bottom-0 fixed">
          <ErrorIcon />
        </div>
      </div>
    </Layout>
  );
};

export default ErrorPage;
