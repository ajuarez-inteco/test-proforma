import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { EditIcon } from './Icons';
import ToolTipComponent from './ToolTipComponent';

const InputText = ({
  name, disabled, register, updateValue, value, label, tooltip, noEdit, variant,
}) => {
  const [isDisabled, setDisabled] = useState(disabled);
  const [internalValue, setInternalValue] = useState(value);
  const Disabled = () => {
    setDisabled(!isDisabled);
  };

  const handleChange = (event) => {
    const newValue = event.target.value;
    setInternalValue(newValue);
    updateValue(newValue, name, 'text');
  };

  const variants = {
    default: 'flex flex-col m-auto text-xs w-full max-w-256 relative text-pfBlack',
    modal: 'flex flex-col m-auto text-xs w-full max-w-368 relative text-pfBlack',
  };

  return (
    <label
      htmlFor={name}
      className={variants[variant]}
    >
      { (tooltip || label) && (
        <div className="flex relative flex-row">
          <p className="text-left capitalize">{label}</p>
          {tooltip && <ToolTipComponent text={tooltip} name={name} />}
        </div>
      )}

      <input
        disabled={isDisabled}
        type="text"
        id={name}
        name={name}
        value={internalValue}
        placeholder="Convertible Note"
        {...register}
        onChange={(event) => handleChange(event)}
        className="w-full rounded-md h-12 mt-1 px-2.5 text-xl"
      />
      { (!noEdit) && (
        <div className="absolute right-4 top-4">
          <button
            type="button"
            onClick={() => {
              Disabled();
            }}
          >
            <EditIcon fill={isDisabled ? '#91D3E1' : '#408BDD'} />
          </button>
        </div>
      )}
    </label>
  );
};

InputText.defaultProps = {
  name: 'text',
  disabled: false,
  register: {},
  value: '',
  updateValue: () => {},
  label: '',
  tooltip: '',
  noEdit: false,
  variant: 'default',
};

InputText.propTypes = {
  name: PropTypes.string,
  disabled: PropTypes.bool,
  register: PropTypes.shape({}),
  value: PropTypes.string,
  updateValue: PropTypes.func,
  label: PropTypes.string,
  tooltip: PropTypes.string,
  noEdit: PropTypes.bool,
  variant: PropTypes.oneOf(['default', 'modal']),
};

export default InputText;
