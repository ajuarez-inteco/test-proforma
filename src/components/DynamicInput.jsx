import React from 'react';
import PropTypes from 'prop-types';

import InputDate from './InputDate';
import InputMoney from './InputMoney';
import InputPorcent from './InputPorcent';
import InputText from './InputText';
import InputSelect from './InputSelect';
import InputMultiplier from './InputMultiplier';
import InputNumber from './InputNumber';

const DynamicInput = ({ type, show, ...props }) => {
  const TYPES = {
    text: InputText,
    date: InputDate,
    money: InputMoney,
    percentage: InputPorcent,
    option: InputSelect,
    multiplier: InputMultiplier,
    number: InputNumber,
  };
  if (!show) return null;
  const Input = TYPES[type] || TYPES.text;
  return <Input {...props} type={type} />;
};

DynamicInput.defaultProps = {
  type: 'text',
  show: true,
};

DynamicInput.propTypes = {
  type: PropTypes.oneOf([
    'text',
    'money',
    'percentage',
    'date',
    'multiplier',
    'option',
    'number',
  ]),
  show: PropTypes.bool,
};

export default DynamicInput;
