import React from 'react';
import PropTypes from 'prop-types';

const MenuDollarIcon = ({ className }) => (
  <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path className={className} d="M7.23329 10.5333C4.20663 9.74667 3.23329 8.93333 3.23329 7.66667C3.23329 6.21333 4.57996 5.2 6.83329 5.2C8.72663 5.2 9.67329 5.92 10.02 7.06667C10.18 7.6 10.62 8 11.18 8H11.58C12.46 8 13.0866 7.13333 12.78 6.30667C12.22 4.73333 10.9133 3.42667 8.83329 2.92V2C8.83329 0.893333 7.93996 0 6.83329 0C5.72663 0 4.83329 0.893333 4.83329 2V2.88C2.24663 3.44 0.166626 5.12 0.166626 7.69333C0.166626 10.7733 2.71329 12.3067 6.43329 13.2C9.76663 14 10.4333 15.1733 10.4333 16.4133C10.4333 17.3333 9.77996 18.8 6.83329 18.8C4.63329 18.8 3.49996 18.0133 3.05996 16.8933C2.85996 16.3733 2.40663 16 1.85996 16H1.48663C0.593292 16 -0.0333741 16.9067 0.299959 17.7333C1.05996 19.5867 2.83329 20.68 4.83329 21.1067V22C4.83329 23.1067 5.72663 24 6.83329 24C7.93996 24 8.83329 23.1067 8.83329 22V21.1333C11.4333 20.64 13.5 19.1333 13.5 16.4C13.5 12.6133 10.26 11.32 7.23329 10.5333Z" />
  </svg>
);

MenuDollarIcon.defaultProps = {
  className: '',
};

MenuDollarIcon.propTypes = {
  className: PropTypes.string,
};

export default MenuDollarIcon;
