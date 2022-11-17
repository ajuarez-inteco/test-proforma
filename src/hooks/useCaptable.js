import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  localDataCT,
  addNewCaptableItem,
  updateCaptableItem,
  deleteCaptableItem,
  setShareHolder,
  setCapitalization,
  setTerms,
  setInvestorReturn,
  setselectItemUuid,
} from '../features/captable';
import { localDataShareholders } from '../features/shareholders';
import { captableLocalStorage, optionsLocalStorage } from '../storage/local';
import { capTableCalcs } from '../utils/calcs';
import { itemCaptablePreferredRound } from '../utils/constants';
import useModel from './useModel';

const useCaptable = () => {
  const dispatch = useDispatch();
  const { islogin } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.captable);
  const { validateUuid } = useModel();
  const [uuid, setUuid] = useState([]);

  const changeOptionsPreferredRound = () => {
    const optionsPreferredRound = data
      .filter((d) => d.type === itemCaptablePreferredRound)
      .map((d) => {
        return {
          name: d.name,
          uuid: d.uuid,
        };
      });
    optionsLocalStorage.setOptionsPreferredRound(optionsPreferredRound);
  };

  useEffect(() => {
    changeOptionsPreferredRound();
    // TODO: Add use Callback
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const calculations = (uuidModel, uuidItem = '') => {
    const c = capTableCalcs.calculations(uuidModel, uuidItem);
    dispatch(setCapitalization(c.capitalization));
    dispatch(setShareHolder(c.shareholders));
    dispatch(setTerms(c.terms));
    dispatch(setInvestorReturn(c.investorReturn));
    dispatch(localDataShareholders(c.selectItemUuid));
    dispatch(setselectItemUuid(c.selectItemUuid));
    return c.capitalization.table;
  };

  const updateItemCalcs = (uuidModel, params, calculationsItems = false) => {
    if (!islogin) {
      dispatch(updateCaptableItem(params));
      captableLocalStorage.update(uuidModel, params);
      if (calculationsItems) {
        return calculations(uuidModel);
      }
    }
    return {};
  };

  const getData = () => {
    const uuidModel = validateUuid();
    setUuid(uuidModel);
    if (!islogin) {
      dispatch(localDataCT(uuidModel));
      calculations(uuidModel);
    }
    return {};
  };

  const addItem = (type) => {
    if (!islogin) {
      const itemsChange = (itemstoChange, uuidItemToChange) => {
        itemstoChange.forEach((itemChange) => {
          itemChange.conversionRound = uuidItemToChange;
          const i = {
            uuid: itemChange.uuid,
            data: itemChange,
          };
          updateItemCalcs(uuid, i);
        });
      };
      let item = capTableCalcs.getNewItem(uuid, type, itemsChange);
      dispatch(addNewCaptableItem(item));
      captableLocalStorage.create(uuid, item);
      const capitalization = calculations(uuid);
      const resStepCalcs = capTableCalcs.stepCalcs(uuid, item.uuid, capitalization, '');
      if (resStepCalcs.change) {
        const ItemToChange = {
          uuid: item.uuid,
          data: resStepCalcs.item,
        };
        item = { ...item, ...ItemToChange };
        updateItemCalcs(uuid, ItemToChange);
      }
      return item;
    }
    return {};
  };

  const updateItem = (params) => {
    const capitalization = updateItemCalcs(uuid, params, true);
    const resStepCalcs = capTableCalcs.stepCalcs(
      uuid,
      params.uuid,
      capitalization,
      params.type,
    );
    if (resStepCalcs.change) {
      const ItemToChange = {
        uuid: params.uuid,
        data: resStepCalcs.item,
      };
      updateItemCalcs(uuid, ItemToChange);
      return { ...params, ...ItemToChange };
    }
    return {};
  };

  const deleteItem = (uuidItem) => {
    if (!islogin) {
      dispatch(deleteCaptableItem(uuidItem));
      captableLocalStorage.delete(uuid, uuidItem);
      calculations(uuid);
    }
    return {};
  };

  const selectItem = (params) => {
    calculations(uuid, params.uuid);
    return {};
  };

  return {
    getData,
    addItem,
    updateItem,
    deleteItem,
    selectItem,
  };
};

export default useCaptable;
