import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRightIcon, MenuAppsIcon, MoreIcon, ThreeDots,
} from '../Icons';
import IconDropdown from '../IconDropdown';
import Modal from '../Modal';
import { ModelsModal } from '../Modal/ModelsModal';
import useModel from '../../hooks/useModel';
import Button from '../Button';
import useOutsideClick from '../../hooks/useOutsideClick';

export const SideBarModels = () => {
  const navigate = useNavigate();
  const { models } = useSelector((state) => state.models);
  const { islogin } = useSelector((state) => state.auth);
  const {
    addModel, updateModel, duplicateModel, deleteModel, changeModel,
  } = useModel();

  const actions = {
    newModel: ({ data }) => addModel(data),
    rename: ({ selectUuidModel, data }) => updateModel(selectUuidModel, data),
    delete: ({ selectUuidModel }) => deleteModel(selectUuidModel),
  };
  const wrapperRef = useRef(null);
  const [showModal, setShowModal] = useOutsideClick(wrapperRef);
  const [modelSelect, setModelSelect] = useState({});
  const [actionType, setActionType] = useState('rename');
  const callBack = actions[actionType];

  const optionsMenu = islogin ? ['Duplicate', 'Rename', 'Delete'] : ['Rename'];

  const handleOptionsMenu = (key, model) => {
    setModelSelect(model);
    setActionType(optionsMenu[key].toLowerCase());
    if (key !== 'Duplicate') {
      setShowModal(true);
    } else {
      duplicateModel(model.uuid);
    }
  };

  const handleNewModel = () => {
    setModelSelect({});
    setActionType('newModel');
    setShowModal(true);
  };

  const handleSelectModel = (modelSelected) => {
    changeModel(modelSelected);
    navigate(`/captable/${modelSelected.uuid}`);
  };

  return (
    <div className="flex flex-col gap-5">
      { models.map((model) => {
        return (
          <div key={model.uuid} className={` group hover:text-white text-xs transition-all gap-5 h-10 flex justify-end px-2 py-2 pr-4 border-r-8  items-center hover:bg-blueDark hover:border-blue`}>
            <button type="button">
              <MenuAppsIcon className={` group-hover:fill-white`} />
            </button>
            <span className="text-ellipsis w-24">{model.name}</span>
            <IconDropdown
              onClickItem={(index) => handleOptionsMenu(index, model)}
              options={optionsMenu}
            >
              <ThreeDots nofill className={` fill-pfBlack group-hover:fill-white`} />
            </IconDropdown>
            <button onClick={() => handleSelectModel(model)} type="button">
              <ArrowRightIcon className={` fill-pfBlack group-hover:fill-white`} />
            </button>
          </div>
        );
      })}

      <Button
        icon={MoreIcon}
        onClick={() => handleNewModel()}
        inline
        type="button"
      >
        Add new model
      </Button>

      {
        showModal && (
          <Modal
            refProp={wrapperRef}
            closeModal={() => setShowModal(false)}
          >
            <ModelsModal
              type={actionType}
              model={modelSelect}
              closeModal={() => setShowModal(false)}
              actionButton={callBack}
            />
          </Modal>
        )
      }

    </div>
  );
};
