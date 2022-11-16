import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SelectIcon from './Icons/selectIcon';
import ToolTipComponent from './ToolTipComponent';

const InputSelect = ({
  name, label, tooltip, options, register, updateValue, value, variant,
}) => {
  const [internalValue, setInternalValue] = useState(value);
  const handleChange = (event) => {
    const newValue = event?.target?.value;
    setInternalValue(newValue);
    updateValue(newValue, name, 'options');
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
        <p>{label}</p>
        {tooltip && <ToolTipComponent text={tooltip} name={name} />}
      </div>

      <select
        id={name}
        className="w-full h-12 mt-1 px-2.5 rounded-md border border-solid border-gray appearance-none"
        name={name}
        value={internalValue}
        {...register}
        onChange={(e) => handleChange(e)}
      >
        {
          options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.text}
            </option>
          ))
        }
      </select>
      <div className="absolute right-4 top-1/2">
        <SelectIcon />
      </div>
    </label>
  );
};
export default InputSelect;

InputSelect.defaultProps = {
  name: 'select',
  label: 'Next Preferred',
  tooltip: '',
  options: [],
  register: {},
  updateValue: () => {},
  value: '',
  variant: 'default',
};
InputSelect.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  tooltip: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
  })),
  register: PropTypes.shape({}),
  updateValue: PropTypes.func,
  value: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'modal']),
};
