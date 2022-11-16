import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Button from '../Button';
import InputSelect from '../InputSelect';
import { optionsConfig } from '../../utils/config/options.config';
import { EditIcon } from '../Icons';
import { modelsData } from '../../utils/data';
import DynamicInput from '../DynamicInput';
import useModel from '../../hooks/useModel';

export const PresetsModal = ({ closeModal }) => {
  const { modelSelected } = useSelector((state) => state.models);
  const { updateModel } = useModel();

  const { register, handleSubmit } = useForm({ mode: 'onChange' });

  const keysCurrencys = Object.keys(optionsConfig.models.currencys);
  const optionsCurrencys = keysCurrencys.map((key) => ({
    text: optionsConfig?.models?.currencys[key].legend,
    value: key,
  }));

  const optionsYears = [
    { text: 2022, value: 2022 },
    { text: 2023, value: 2023 },
    { text: 2024, value: 2024 },
    { text: 2025, value: 2025 },
    { text: 2026, value: 2026 },
    { text: 2027, value: 2027 },
  ];

  const onSubmit = (data = {}) => {
    const {
      currency, modelStarYear, openingCashBalance,
      daysAccountPayable, daysInvetoryOnHand, badDebitExpensePercentageRevenue,
      incomeTax, customerLifetimeValueDiscountRatePercentage,
    } = data;
    const newData = {
      ...modelSelected,
      currency,
      modelStarYear,
      openingCashBalance: Number(openingCashBalance.replaceAll(',', '')),
      daysAccountPayable,
      daysInvetoryOnHand,
      badDebitExpensePercentageRevenue,
      incomeTax,
      customerLifetimeValueDiscountRatePercentage,
    };
    updateModel(modelSelected.uuid, newData);
    closeModal();
  };

  const {
    modelsPreset: {
      currency,
      modelStarYear,
      openingCashBalance,
      daysAccountPayable,
      daysInvetoryOnHand,
      badDebitExpensePercentageRevenue,
      incomeTax,
      customerLifetimeValueDiscountRatePercentage,
    },
  } = modelsData;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-9 w-full max-w-568 justify-center items-center">

      <div className="flex text-xl gap-2 items-center justify-center">
        <EditIcon />
        <h2 className="text-xl font-normal">Edit Model Presets</h2>
      </div>
      <div className="flex flex-col gap-y-9 w-full mt-8">
        <InputSelect variant="modal" options={optionsCurrencys} label={currency.label} name={currency.name} register={register(currency.name)} value={modelSelected?.currency} />
        <InputSelect variant="modal" options={optionsYears} label={modelStarYear.label} name={modelStarYear.name} register={register(modelStarYear.name)} value={modelSelected?.name} />
        <DynamicInput noIcon type={openingCashBalance.type} variant="modal" label={openingCashBalance.label} name={openingCashBalance.name} register={register(openingCashBalance.name)} value={modelSelected?.openingCashBalance} />
        <DynamicInput noIcon type={daysAccountPayable.type} variant="modal" label={daysAccountPayable.label} name={daysAccountPayable.name} register={register(daysAccountPayable.name)} value={modelSelected?.daysAccountPayable} />
        <DynamicInput noIcon type={daysInvetoryOnHand.type} variant="modal" label={daysInvetoryOnHand.label} name={daysInvetoryOnHand.name} register={register(daysInvetoryOnHand.name)} value={modelSelected?.daysInvetoryOnHand} />
        <DynamicInput noIcon type={badDebitExpensePercentageRevenue.type} variant="modal" label={badDebitExpensePercentageRevenue.label} name={badDebitExpensePercentageRevenue.name} register={register(badDebitExpensePercentageRevenue.name)} value={modelSelected?.badDebitExpensePercentageRevenue} />
        <DynamicInput noIcon type={incomeTax.type} variant="modal" label={incomeTax.label} name={incomeTax.name} register={register(incomeTax.name)} value={modelSelected?.incomeTax} />
        <DynamicInput noIcon type={customerLifetimeValueDiscountRatePercentage.type} variant="modal" label={customerLifetimeValueDiscountRatePercentage.label} name={customerLifetimeValueDiscountRatePercentage.name} register={register(customerLifetimeValueDiscountRatePercentage.name)} value={modelSelected?.customerLifetimeValueDiscountRatePercentage} />
      </div>

      <Button submit>Confirm</Button>
      <Button onClick={() => closeModal()} inline>Cancel</Button>
    </form>
  );
};

PresetsModal.defaultProps = {
  model: {},
  closeModal: () => {},
};

PresetsModal.propTypes = {
  model: PropTypes.shape({
    name: PropTypes.string,
    currency: PropTypes.string,
    uuid: PropTypes.string,
  }),
  closeModal: PropTypes.func,
};
