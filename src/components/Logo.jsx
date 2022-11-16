import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Logo from '../assets/img/logo.svg';

const LogoSVG = ({ link }) => {
  if (link) {
    return (
      <NavLink to={link}>
        <img src={Logo} alt="logo" width="40px" height="40px" />
      </NavLink>
    );
  }
  return <img src={Logo} alt="logo" width="40px" height="40px" />;
};

LogoSVG.defaultProps = {
  link: '',
};

LogoSVG.propTypes = {
  link: PropTypes.string,
};

export default LogoSVG;
