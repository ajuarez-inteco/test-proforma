import React from 'react';
import PropTypes from 'prop-types';
import NoOkIcon from '../assets/img/noOkIcon.svg';
import OkIcon from '../assets/img/okIcon.svg';

const LabelInput = ({
  children, name, type, register, ok, noOk, placeholder, defaultValue, additionalProps,
}) => (
  <label
    htmlFor={name}
    className={`flex flex-col m-auto text-xs w-full max-w-368 relative ${
      noOk ? 'text-red' : 'text-pfBlack'
    }`}
  >
    <p className="text-left capitalize">
      {children}
    </p>
    <input
      placeholder={placeholder}
      type={type}
      id={name}
      defaultValue={defaultValue}
      {...register}
      {...additionalProps}
      name={name}
      className="w-full h-12 mt-1 px-2.5 rounded-md border border-solid border-gray appearance-none"
    />
    {ok && (
      <img
        src={OkIcon}
        alt="ok"
        width="20px"
        className="absolute right-4 top-1/2"
      />
    )}
    {noOk && (
      <img
        src={NoOkIcon}
        alt="ok"
        width="20px"
        className="absolute right-4 top-1/2"
      />
    )}
  </label>
);

LabelInput.defaultProps = {
  register: {},
  ok: false,
  noOk: false,
  placeholder: '',
  defaultValue: '',
  additionalProps: {},
};

LabelInput.propTypes = {
  children: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  ok: PropTypes.bool,
  noOk: PropTypes.bool,
  register: PropTypes.shape({}),
  placeholder: PropTypes.string,
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  additionalProps: PropTypes.shape({}),
};

export default LabelInput;
