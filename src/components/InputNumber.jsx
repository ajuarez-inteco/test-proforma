import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { EditIcon } from './Icons';
import ToolTipComponent from './ToolTipComponent';

const formatInitialValue = (value) => {
  const INITIAL_VALUE = typeof value === 'string';
  return INITIAL_VALUE ? Number(value) : value;
};

const InputNumber = ({
  name,
  disabled,
  value,
  updateValue,
  label,
  tooltip,
  register,
  variant,
  noIcon,
}) => {
  const [intValue, setIntValue] = useState(formatInitialValue(value));
  const [isDisabled, setDisabled] = useState(disabled);

  useEffect(() => {
    setIntValue(formatInitialValue(value));
  }, [value]);

  const regex = /\d+$/;
  const cleanRegex = /[^\d]+/g;

  const handleChange = (event) => {
    const newValue = event.target.value;
    const cleanValue = newValue.replaceAll(cleanRegex, '');
    if (regex.test(cleanValue) || cleanValue === '') {
      const VALUE_NUMBER = Number(cleanValue);
      setIntValue(VALUE_NUMBER);
      updateValue(VALUE_NUMBER, name, 'number');
    }
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
      <div className="flex relative flex-row">
        <p className="text-left capitalize">{label}</p>
        {tooltip && <ToolTipComponent text={tooltip} name={name} />}
      </div>

      <input
        disabled={isDisabled}
        type="number"
        value={intValue}
        id={name}
        name={name}
        {...register}
        onChange={(e) => handleChange(e)}
        className="w-full h-12 mt-1 px-2.5 rounded-md border border-solid border-gray appearance-none"
      />
      <div className="absolute right-4 top-1/2">
        <button
          type="button"
          onClick={() => {
            setDisabled(!isDisabled);
          }}
        >
          {noIcon ? '' : <EditIcon fill={isDisabled ? '#91D3E1' : '#408BDD'} />}
        </button>
      </div>
    </label>
  );
};

InputNumber.defaultProps = {
  name: 'number',
  disabled: false,
  value: 1000,
  updateValue: () => {},
  label: 'day',
  tooltip: '',
  register: {},
  variant: 'default',
  noIcon: false,
};
InputNumber.propTypes = {
  name: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  updateValue: PropTypes.func,
  label: PropTypes.string,
  tooltip: PropTypes.string,
  register: PropTypes.shape({}),
  variant: PropTypes.oneOf(['modal', 'default']),
  noIcon: PropTypes.bool,
};

export default InputNumber;
