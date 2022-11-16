import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { signInRoute } from '../utils/constants';
import { Button } from '.';

const CallToAction = ({ text, textButton, goTo }) => (
  <div
    className="flex flex-col items-center w-full min-h-pfPage mt-88 gap-88"
  >
    <img src="/img/logotipo.png" alt="logotipo" />
    <div className="mb-508 w-full max-w-568 pt-8 pb-12 flex flex-col items-center px-148 rounded-t-lg rounded-b-lg border border-solid border-gray shadow-prDefault gap-10">
      <div className="flex flex-row p-5 gap-1.5">
        <img src="/img/okIcon.svg" alt="ok" />
        <span>{text}</span>
      </div>
      <NavLink to={goTo}>
        <Button button>{textButton}</Button>
      </NavLink>
    </div>
  </div>
);

CallToAction.defaultProps = {
  text: 'Password Updated',
  textButton: 'Go to Sign In',
  goTo: signInRoute,
};

CallToAction.propTypes = {
  text: PropTypes.string,
  textButton: PropTypes.string,
  goTo: PropTypes.string,
};

export default CallToAction;
