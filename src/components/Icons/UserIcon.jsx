import React from 'react';
import PropTypes from 'prop-types';

const MenuUserIcon = ({ active }) => (
  <svg width="17" height="17" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.5 11.0026C14.4467 11.0026 16.8334 8.61594 16.8334 5.66927C16.8334 2.7226 14.4467 0.335938 11.5 0.335938C8.55337 0.335938 6.16671 2.7226 6.16671 5.66927C6.16671 8.61594 8.55337 11.0026 11.5 11.0026ZM11.5 13.6693C7.94004 13.6693 0.833374 15.4559 0.833374 19.0026V20.3359C0.833374 21.0693 1.43337 21.6693 2.16671 21.6693H20.8334C21.5667 21.6693 22.1667 21.0693 22.1667 20.3359V19.0026C22.1667 15.4559 15.06 13.6693 11.5 13.6693Z" fill={active ? '#408bdd' : '#408bdd'} />
  </svg>
);

MenuUserIcon.defaultProps = {
  active: false,
};

MenuUserIcon.propTypes = {
  active: PropTypes.bool,
};

export default MenuUserIcon;
