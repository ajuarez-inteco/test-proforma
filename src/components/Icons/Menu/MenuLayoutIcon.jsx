import React from 'react';
import PropTypes from 'prop-types';

const MenuLayoutIcon = ({ className }) => (
  <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path className={className} d="M9.83333 9.36H16.5V24H9.83333V9.36ZM19.1667 24H23.1667C24.6333 24 25.8333 22.8 25.8333 21.3333V9.33333H19.1667V24ZM23.1667 0H3.16667C1.7 0 0.5 1.2 0.5 2.66667V6.66667H25.8333V2.66667C25.8333 1.2 24.6333 0 23.1667 0ZM0.5 21.3333C0.5 22.8 1.7 24 3.16667 24H7.16667V9.33333H0.5V21.3333Z" />
  </svg>
);

MenuLayoutIcon.defaultProps = {
  className: '',
};

MenuLayoutIcon.propTypes = {
  className: PropTypes.string,
};

export default MenuLayoutIcon;
