import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ArrowLeftIcon, EditIcon } from './Icons';

const InputName = ({
  name, disabled, register, updateValue, value, action,
}) => {
  const [isDisabled, setDisabled] = useState(disabled);
  const [internalValue, setInternalValue] = useState(value);
  const Disabled = () => {
    setDisabled(!isDisabled);
  };

  const handleChange = (event) => {
    const newValue = event.target.value;
    setInternalValue(newValue);
    updateValue(newValue, name, 'name');
  };

  return (
    <div className="flex justify-between w-full gap-2">
      <button aria-label="go back" type="button" onClick={() => action()}>
        <ArrowLeftIcon />
      </button>
      <input
        type="text"
        id={name}
        name={name}
        value={internalValue}
        {...register}
        onChange={(event) => handleChange(event)}
      />
      {' '}
      <button aria-label="edit" type="button" onClick={() => Disabled()}>
        <EditIcon fill={isDisabled ? '#91D3E1' : '#408BDD'} />
      </button>
    </div>
  );
};

InputName.defaultProps = {
  name: 'text',
  disabled: true,
  register: {},
  value: '',
  updateValue: () => {},
  action: () => {},
};

InputName.propTypes = {
  name: PropTypes.string,
  disabled: PropTypes.bool,
  register: PropTypes.shape({}),
  value: PropTypes.string,
  updateValue: PropTypes.func,
  action: PropTypes.func,
};

export default InputName;
