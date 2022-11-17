import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { EditIcon } from './Icons';
import ToolTipComponent from './ToolTipComponent';

const numberFormat = (value) => {
  return Number.parseFloat(value).toFixed(2);
};

const InputPorcent = ({
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
  const [internalValue, setInternalValue] = useState(numberFormat(value));
  const [isDisabled, setDisabled] = useState(disabled);

  useEffect(() => {
    setInternalValue(numberFormat(value));
  }, [value]);

  const cleanRegex = /[^\d.]+/g;

  const handleChange = (event) => {
    const newValue = event.target.value;
    const cleanValue = newValue.replaceAll(cleanRegex, '');
    const [, dec] = cleanValue.split('.');
    const DEC = dec ? dec.length <= 2 : true;
    if (cleanValue >= 0 && cleanValue <= 100 && DEC) {
      setInternalValue(cleanValue);
      updateValue(Number(cleanValue), name, 'percentage');
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
        <p>{`${label} (%)`}</p>
        { tooltip && <ToolTipComponent text={tooltip} name={name} />}
      </div>
      <input
        disabled={isDisabled}
        type="text"
        id={name}
        name={name}
        value={internalValue}
        {...register}
        onChange={(e) => handleChange(e)}
        className="w-full h-12 mt-1 px-2.5 rounded-md border border-solid border-gray"
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

InputPorcent.defaultProps = {
  name: 'porcentage',
  disabled: false,
  value: 0,
  updateValue: () => {},
  label: 'Interest (%)',
  tooltip: '',
  register: {},
  variant: 'default',
  noIcon: false,
};

InputPorcent.propTypes = {
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

export default InputPorcent;
