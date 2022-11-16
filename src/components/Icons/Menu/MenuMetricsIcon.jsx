import React from 'react';
import PropTypes from 'prop-types';

const MenuMetricsIcon = ({ className }) => (
  <svg width="23" height="28" viewBox="0 0 23 28" xmlns="http://www.w3.org/2000/svg">
    <path className={className} d="M19.5 0.664062H3.50004C2.03337 0.664062 0.833374 1.86406 0.833374 3.33073V24.6641C0.833374 26.1307 2.03337 27.3307 3.50004 27.3307H19.5C20.9667 27.3307 22.1667 26.1307 22.1667 24.6641V3.33073C22.1667 1.86406 20.9667 0.664062 19.5 0.664062ZM3.50004 3.33073H10.1667V13.9974L6.83337 11.9974L3.50004 13.9974V3.33073Z" />
  </svg>
);

MenuMetricsIcon.defaultProps = {
  className: '',
};

MenuMetricsIcon.propTypes = {
  className: PropTypes.string,
};

export default MenuMetricsIcon;
