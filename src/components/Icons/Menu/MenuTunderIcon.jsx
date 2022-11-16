import React from 'react';
import PropTypes from 'prop-types';

const MenuTunderIcon = ({ className }) => (
  <svg width="27" height="28" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path className={className} d="M13.5 0.695312C6.15336 0.695312 0.193359 6.65531 0.193359 14.002C0.193359 21.3486 6.15336 27.3086 13.5 27.3086C20.8467 27.3086 26.8067 21.3486 26.8067 14.002C26.8067 6.65531 20.8467 0.695312 13.5 0.695312ZM13.5 24.642C7.63336 24.642 2.86003 19.8686 2.86003 14.002C2.86003 8.13531 7.63336 3.36198 13.5 3.36198C19.3667 3.36198 24.14 8.13531 24.14 14.002C24.14 19.8686 19.3667 24.642 13.5 24.642ZM14.5 4.66865L8.50003 16.002H12.6867V23.3353L18.5 12.002H14.5V4.66865Z" />
  </svg>
);

MenuTunderIcon.defaultProps = {
  className: '',
};

MenuTunderIcon.propTypes = {
  className: PropTypes.string,
};

export default MenuTunderIcon;
