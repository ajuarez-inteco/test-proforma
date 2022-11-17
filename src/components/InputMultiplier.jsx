import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { EditIcon } from './Icons';
import ToolTipComponent from './ToolTipComponent';

const formatNumber = (value) => {
  const VALUE_STRING = new Intl.NumberFormat().format(value);
  return `${VALUE_STRING}x`;
};

const InputMultiplier = ({
  name,
  disabled,
  value,
  updateValue,
  label,
  tooltip,
  register,
}) => {
  const [intValue, setIntValue] = useState(formatNumber(value));
  const [isDisabled, setDisabled] = useState(disabled);

  useEffect(() => {
    setIntValue(formatNumber(value));
  }, [value]);

  const cleanRegex = /[^\d.]+/g;

  const handleChange = (event) => {
    const newValue = event.target.value;
    const cleanValue = newValue.replaceAll(cleanRegex, '');
    const [, dec] = cleanValue.split('.');
    const DEC = dec ? dec.length <= 2 : true;
    if ((cleanValue >= 1 && cleanValue <= 10 && DEC) || cleanValue === '') {
      const NEW_VALE_INT = `${cleanValue}x`;
      setIntValue(NEW_VALE_INT);
      updateValue(Number(cleanValue), name, 'multiplier');
    }
  };

  return (
    <label
      htmlFor={name}
      className="flex flex-col m-auto text-xs w-full max-w-256 relative text-pfBlack"
    >
      <div className="flex relative flex-row">
        <p className="text-left capitalize">{label}</p>
        {tooltip && <ToolTipComponent text={tooltip} name={name} />}
      </div>
      <input
        disabled={isDisabled}
        type="text"
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
          <EditIcon fill={isDisabled ? '#91D3E1' : '#408BDD'} />
        </button>
      </div>
    </label>
  );
};

InputMultiplier.defaultProps = {
  name: 'money',
  disabled: false,
  value: 1,
  updateValue: () => {},
  label: 'Liquidation Preference',
  tooltip: '',
  register: {},
};
InputMultiplier.propTypes = {
  name: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.number,
  updateValue: PropTypes.func,
  label: PropTypes.string,
  tooltip: PropTypes.string,
  register: PropTypes.shape({}),
};

export default InputMultiplier;
