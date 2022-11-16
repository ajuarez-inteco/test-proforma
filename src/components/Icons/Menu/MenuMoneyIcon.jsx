import React from 'react';
import PropTypes from 'prop-types';

const MenuMoneyIcon = ({ className }) => (
  <svg width="27" height="22" viewBox="0 0 27 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path className={className} d="M17.5 16.3359H21.5C22.2333 16.3359 22.8333 15.7359 22.8333 15.0026V7.0026C22.8333 6.26927 22.2333 5.66927 21.5 5.66927H17.5C16.7666 5.66927 16.1666 6.26927 16.1666 7.0026V15.0026C16.1666 15.7359 16.7666 16.3359 17.5 16.3359ZM18.8333 8.33594H20.1666V13.6693H18.8333V8.33594ZM9.49996 16.3359H13.5C14.2333 16.3359 14.8333 15.7359 14.8333 15.0026V7.0026C14.8333 6.26927 14.2333 5.66927 13.5 5.66927H9.49996C8.76663 5.66927 8.16663 6.26927 8.16663 7.0026V15.0026C8.16663 15.7359 8.76663 16.3359 9.49996 16.3359ZM10.8333 8.33594H12.1666V13.6693H10.8333V8.33594ZM5.49996 5.66927C4.76663 5.66927 4.16663 6.26927 4.16663 7.0026V15.0026C4.16663 15.7359 4.76663 16.3359 5.49996 16.3359C6.23329 16.3359 6.83329 15.7359 6.83329 15.0026V7.0026C6.83329 6.26927 6.23329 5.66927 5.49996 5.66927ZM0.166626 3.0026V19.0026C0.166626 20.4693 1.36663 21.6693 2.83329 21.6693H24.1666C25.6333 21.6693 26.8333 20.4693 26.8333 19.0026V3.0026C26.8333 1.53594 25.6333 0.335938 24.1666 0.335938H2.83329C1.36663 0.335938 0.166626 1.53594 0.166626 3.0026ZM22.8333 19.0026H4.16663C3.43329 19.0026 2.83329 18.4026 2.83329 17.6693V4.33594C2.83329 3.6026 3.43329 3.0026 4.16663 3.0026H22.8333C23.5666 3.0026 24.1666 3.6026 24.1666 4.33594V17.6693C24.1666 18.4026 23.5666 19.0026 22.8333 19.0026Z" />
  </svg>
);

MenuMoneyIcon.defaultProps = {
  className: '',
};

MenuMoneyIcon.propTypes = {
  className: PropTypes.string,
};

export default MenuMoneyIcon;