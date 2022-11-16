import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  children,
  onClick,
  submit,
  inline,
  icon: Icon,
  variant,
  className,
  disabled,
}) => {
  const styles = {
    modal: 'w-96 h-12 font-normal text-base flex justify-between items-center text-pfBlack bg-white px-2',
    default: `w-full h-12 font-normal text-xs flex justify-center items-center gap-3 ${inline ? 'text-blueDark' : 'text-white'} ${inline ? '' : 'md:w-272'} ${!inline && 'bg-blueDark'}`,
  };

  const VARIANT = className || styles[variant];

  return (
    <button
      type={submit ? 'submit' : 'button'}
      onClick={() => onClick()}
      className={VARIANT}
      disabled={disabled}
    >
      {children}
      {Icon && <Icon />}
    </button>
  );
};

Button.defaultProps = {
  submit: false,
  onClick: () => {},
  inline: false,
  icon: '',
  variant: 'default',
  className: '',
  disabled: false,
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  submit: PropTypes.bool,
  inline: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.element]),
  variant: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;
