import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { EditIcon } from './Icons';
import ToolTipComponent from './ToolTipComponent';

const formatNumber = (value) => {
  const INITIAL_VALUE = typeof value === 'string';
  return INITIAL_VALUE ? value : Intl.NumberFormat().format(value);
};
const InputMoney = ({
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
  const [intValue, setIntValue] = useState(formatNumber(value));
  const [isDisabled, setDisabled] = useState(disabled);
  const { modelSelected } = useSelector((state) => state.models);

  useEffect(() => {
    setIntValue(formatNumber(value));
  }, [value]);

  const regex = /\d+$,?/;
  const cleanRegex = /[^\d,]+/g;

  const handleChange = (event) => {
    const newValue = event.target.value;
    const cleanValue = newValue.replaceAll(cleanRegex, '');
    if (regex.test(cleanValue) || cleanValue === '') {
      const VALUE_NUMBER = cleanValue.replaceAll(',', '');
      const VALUE = new Intl.NumberFormat().format(VALUE_NUMBER);
      setIntValue(VALUE);
      updateValue(Number(VALUE_NUMBER), name, 'money');
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
        <p className="text-left capitalize">{`${label} (${modelSelected.currency})`}</p>
        { tooltip && <ToolTipComponent text={tooltip} name={name} />}
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
          {noIcon ? '' : <EditIcon fill={isDisabled ? '#91D3E1' : '#408BDD'} />}
        </button>
      </div>
    </label>
  );
};

InputMoney.defaultProps = {
  name: 'money',
  disabled: false,
  value: 1000,
  updateValue: () => {},
  label: 'Investment Amount',
  tooltip: '',
  register: {},
  variant: 'default',
  noIcon: false,
};
InputMoney.propTypes = {
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

export default InputMoney;
