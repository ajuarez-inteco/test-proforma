import { captableData } from '../data';
import { optionsConfig } from '../config/options.config';

export const formatValue = ({ type = '', newValue = '', name = '' }) => {
  if (!newValue || !type || !name) {
    return newValue;
  }

  if (name === 'name') {
    return newValue;
  }

  const format = {
    name: (value) => { return value; },
    text: (value) => { return value; },
    money: (value) => {
      if (typeof value === 'number') {
        return value;
      }
      return Number(value.replaceAll(',', ''));
    },
    percentage: (value) => {
      if (typeof value === 'number') {
        return value;
      }
      return Number(value);
    },
    date: (value) => {
      console.log(value, 'date fomrt');
      return value;
    },
    multiplier: (value) => {
      if (typeof value === 'number') {
        return value;
      }
      return Number(value.replaceAll('x', ''));
    },
    option: (value) => { return value; },
    number: (value) => {
      if (typeof value === 'number') {
        return value;
      }
      return Number(value);
    },
  };

  const TYPE = captableData[type][name].type;
  return format[TYPE](newValue);
};

export const formatCurrency = (number, currency = 'USD') => {
  if (typeof number !== 'number') return '';
  const { format } = optionsConfig.models.currencys[currency];
  return new Intl.NumberFormat(format || 'en-US').format(number);
};
