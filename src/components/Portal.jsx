import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export const Portal = ({ children, id }) => {
  const MODAL = ReactDOM.createPortal(
    <div className="fixed z-50 min-h-portal flex flex-col w-full justify-center items-center top-0 left-0 bg-transparent backdrop-blur-sm">
      {children}
    </div>,
    document.getElementById(id),
  );
  return MODAL;
};

Portal.defaultProps = {
  id: 'portal',
};

Portal.propTypes = {
  id: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.element]),
};
