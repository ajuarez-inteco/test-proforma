import { v4 as uuidv4 } from 'uuid';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch, useStore } from 'react-redux';
import { modelsLocalStorage } from '../storage/local';
import {
  addNewModelItem,
  deleteModelItem,
  setModelSelected,
  updateModelItem,
} from '../features/models';
import { modelsRoute } from '../utils/constants';
import { modelsValues } from '../utils/data';

const useModel = () => {
  const navigate = useNavigate();
  const { uuidModel } = useParams();
  const { islogin } = useSelector((state) => state.auth);
  const { models } = useSelector((state) => state.models);
  const dispatch = useDispatch();
  const store = useStore();

  const validateUuid = () => {
    const currentModels = store.getState().models.models;
    if (uuidModel !== undefined) {
      const index = currentModels.findIndex((m) => m.uuid === uuidModel);
      if (index < 0) {
        dispatch(setModelSelected(currentModels[index]));
        navigate(modelsRoute);
      }
      return uuidModel;
    }
    /* eslint-disable no-constant-condition */
    if ((true || !islogin) && currentModels.length > 0) {
      dispatch(setModelSelected(currentModels[0]));
      return currentModels[0].uuid;
    }
    navigate(modelsRoute);
    return {};
  };

  const changeModel = (newModelSelected) => {
    /* eslint-disable no-constant-condition */
    if (true || islogin) {
      dispatch(setModelSelected(newModelSelected));
      return newModelSelected;
    }
    return {};
  };

  const addModel = (newModel) => {
    /* eslint-disable no-constant-condition */
    if (true || islogin) {
      const item = {
        uuid: uuidv4(),
        ...modelsValues.modelDefault,
        ...newModel,
      };
      dispatch(addNewModelItem(item));
      modelsLocalStorage.create(item);
      return item;
    }
    return {};
  };

  const updateModel = (uuid, params) => {
    /* eslint-disable no-constant-condition */
    if (true || islogin) {
      dispatch(updateModelItem({ uuid, ...params }));
      modelsLocalStorage.update(uuid, params);
    }
    return {};
  };

  const duplicateModel = (uuid) => {
    /* eslint-disable no-constant-condition */
    if (true || islogin) {
      const [COPY_MODEL = {}] = models.filter(
        (item) => item.uuid === uuid,
      );
      const item = {
        ...COPY_MODEL,
        name: `${COPY_MODEL?.name} copy`,
        uuid: uuidv4(),
      };
      dispatch(addNewModelItem(item));
      modelsLocalStorage.create(item);
    }
    return {};
  };

  const deleteModel = (uuid) => {
    /* eslint-disable no-constant-condition */
    if (true || islogin) {
      dispatch(deleteModelItem(uuid));
      modelsLocalStorage.delete(uuid);
    }
    return {};
  };

  return {
    addModel,
    updateModel,
    duplicateModel,
    deleteModel,
    validateUuid,
    changeModel,
  };
};

export default useModel;
