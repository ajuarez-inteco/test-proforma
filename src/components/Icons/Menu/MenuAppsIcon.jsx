import React from 'react';
import PropTypes from 'prop-types';

const MenuAppsIcon = ({ className }) => (
  <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path className={className} d="M0.833374 5.66927H6.16671V0.335938H0.833374V5.66927ZM8.83337 21.6693H14.1667V16.3359H8.83337V21.6693ZM0.833374 21.6693H6.16671V16.3359H0.833374V21.6693ZM0.833374 13.6693H6.16671V8.33594H0.833374V13.6693ZM8.83337 13.6693H14.1667V8.33594H8.83337V13.6693ZM16.8334 0.335938V5.66927H22.1667V0.335938H16.8334ZM8.83337 5.66927H14.1667V0.335938H8.83337V5.66927ZM16.8334 13.6693H22.1667V8.33594H16.8334V13.6693ZM16.8334 21.6693H22.1667V16.3359H16.8334V21.6693Z" />
  </svg>
);

MenuAppsIcon.defaultProps = {
  className: 'fill-pfBlack',
};

MenuAppsIcon.propTypes = {
  className: PropTypes.string,
};

export default MenuAppsIcon;
