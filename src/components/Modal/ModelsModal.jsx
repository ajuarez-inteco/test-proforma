import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { MenuAppsIcon } from '../Icons';
import InputText from '../InputText';
import Button from '../Button';
import InputSelect from '../InputSelect';
import { optionsConfig } from '../../utils/config/options.config';

export const ModelsModal = ({
  type, model, closeModal, actionButton,
}) => {
  const { register, handleSubmit } = useForm({ mode: 'onChange' });

  const keysCurrencys = Object.keys(optionsConfig.models.currencys);
  const optionsCurrencys = keysCurrencys.map((key) => ({
    text: optionsConfig?.models?.currencys[key],
    value: key,
  }));

  const onSubmit = (data = {}) => {
    actionButton({ selectUuidModel: model.uuid, data });
    closeModal();
  };

  const deleteItem = () => {
    actionButton();
    closeModal();
  };

  const isNewModel = type === 'newModel';

  if (type === 'delete') {
    return (
      <div className="flex flex-col gap-y-9 w-full max-w-568 justify-center items-center">
        <span className="text-black text-base font-normal">Are you sure you want to delete this model?</span>

        <Button onClick={() => deleteItem(model.uuid)}>Confirm</Button>
        <Button onClick={() => closeModal()} inline>Cancel</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-9 w-full max-w-568 justify-center items-center">

      <div className="flex text-xl gap-2 items-center justify-center">
        <MenuAppsIcon className="fill-blueDark" />
        { type === 'rename' ? 'Rename Model' : 'Create new model'}
      </div>
      <div className="flex flex-col gap-y-9 w-full mt-8">
        <InputText variant="modal" noEdit label="Name" name="name" register={register('name', { required: true })} value={isNewModel ? '' : model?.name} />
        <InputSelect variant="modal" options={optionsCurrencys} label="Currency" name="currency" register={register('currency')} value={model?.currency} />
      </div>

      <Button submit>Confirm</Button>
      <Button onClick={() => closeModal()} inline>Cancel</Button>
    </form>
  );
};

ModelsModal.defaultProps = {
  model: {},
  closeModal: () => {},
  actionButton: () => {},
};

ModelsModal.propTypes = {
  model: PropTypes.shape({
    name: PropTypes.string,
    currency: PropTypes.string,
    uuid: PropTypes.string,
  }),
  type: PropTypes.oneOf(['newModel', 'rename', 'delete']).isRequired,
  closeModal: PropTypes.func,
  actionButton: PropTypes.func,
};
