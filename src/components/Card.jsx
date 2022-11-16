import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ children }) => (
  <div className="flex rounded-md flex-col shadow-md bg-white p-6 w-3/4 md:w-1/2 xl:w-full max-w-568 border border-solid border-gray">
    {children}
  </div>
);

Card.defaultProps = {
  children: null,
};

Card.propTypes = {
  children: PropTypes.node,
};

export default Card;
