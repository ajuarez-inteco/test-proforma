import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useForm } from 'react-hook-form';
import DynamicInput from '../DynamicInput';
import {
  ArrowDownIcon, DeleteIcon,
} from '../Icons';
import { optionsConfig } from '../../utils/config/options.config';
import { optionsLocalStorage } from '../../storage/local/options.localStorage';
import InputName from '../InputName';
import { formatValue } from '../../utils/format';

export const CapTableForm = ({
  listInputs, currentTransaction, goBack, deleteTransaction, updateTransaction,
}) => {
  const {
    register, getValues,
  } = useForm();

  const [seeMore, setSeeMore] = useState();
  const [internalValues, setInternalValues] = useState({});

  const listInputsCompat = (!seeMore && listInputs.length > 8)
    ? listInputs.slice(0, 7) : listInputs;

  const getOptions = (type, name) => {
    const optionsPreferrarRound = (type === 'convertibleNote' || type === 'safe') ? optionsLocalStorage.getOptionsPreferredRound()
      .map(({ name: NAME, uuid }) => ({ text: NAME, value: uuid })) : [];
    const objOptions = optionsConfig.captable[type][name];
    const keys = Object.keys(objOptions);
    const options = keys.map((key) => ({
      text: objOptions[key],
      value: key,
    }));
    return [...options, ...optionsPreferrarRound];
  };

  const handleUpdate = (newValue, name) => {
    const values = getValues();
    const keys = Object.keys(values);
    keys.forEach((key) => {
      const value = values[key];
      const cleanValue = formatValue({
        newValue: value, name: key, type: currentTransaction?.type,
      });
      values[key] = cleanValue;
    });
    const newData = {
      data: { ...values, [name]: newValue },
      uuid: currentTransaction.uuid,
      type: name,
    };
    setInternalValues(newData.data);
    updateTransaction(newData);
  };

  const showAnnualDividend = internalValues.annualDividend > 0;

  return (
    <form className="flex flex-col justify-start items-start gap-y-7 bg-white border-r border-grayDark p-5 w-80 overflow-hidden overflow-y-scroll h-layout">
      <InputName register={register('name')} action={goBack} value={currentTransaction?.name} updateValue={handleUpdate} name="name" />

      <div className="flex flex-col items-center gap-4 w-full">
        {listInputsCompat.map(({
          label, name, placeholder, type, tooltip, condition,
        }) => (
          <DynamicInput
            value={currentTransaction[name]}
            placeholder={placeholder}
            name={name}
            type={type}
            key={name}
            label={label}
            options={type === 'option' ? getOptions(currentTransaction?.type, name) : []}
            register={register(name)}
            updateValue={handleUpdate}
            tooltip={tooltip}
            show={!condition || showAnnualDividend}
          />
        ))}
        {
          (!seeMore && listInputs.length > 8) && (
          <button className="flex justify-center items-center gap-3 m-auto text-xs max-w-256 relative text-pfBlack w-full h-12 mt-1 px-2.5 rounded-md border border-solid border-gray appearance-none" onClick={() => setSeeMore(true)} type="button">
            More inputs
            {' '}
            <ArrowDownIcon />
          </button>
          )
        }
      </div>

      { currentTransaction?.type !== 'founding' && (
        <div className="flex justify-center w-full">
          <button
            type="button"
            className="flex gap-3 text-xs font-semibold"
            onClick={() => deleteTransaction(currentTransaction?.uuid)}
          >
            Delete Transaction
            {' '}
            <DeleteIcon />
          </button>
        </div>
      )}
    </form>
  );
};

CapTableForm.defaultProps = {
  listInputs: [],
  currentTransaction: {},
  goBack: () => {},
  deleteTransaction: () => {},
  updateTransaction: () => {},
};

CapTableForm.propTypes = {
  listInputs: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
  })),
  currentTransaction: PropTypes.shape({
    prefixName: PropTypes.string,
    name: PropTypes.string,
    uuid: PropTypes.string,
    type: PropTypes.string,
  }),
  goBack: PropTypes.func,
  deleteTransaction: PropTypes.func,
  updateTransaction: PropTypes.func,
};
