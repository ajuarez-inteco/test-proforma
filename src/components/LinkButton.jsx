import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const LinkButton = ({
  children, _className, to, disabled,
}) => {
  const navigate = useNavigate();
  return (
    <button disabled={disabled} className={_className} onClick={() => navigate(to)} type="button">
      {children}
    </button>
  );
};

LinkButton.defaultProps = {
  _className: 'w-272 h-12 bg-blueDark text-xs text-white',
  disabled: false,
};

LinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.node]).isRequired,
  _className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default LinkButton;
