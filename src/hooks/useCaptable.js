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
  }, [data]);

  const calculations = (uuidModel, uuidItem = '') => {
    const c = capTableCalcs.calculations(uuidModel, uuidItem);
    dispatch(setCapitalization(c.capitalization));
    dispatch(setShareHolder(c.shareholders));
    dispatch(setTerms(c.terms));
    dispatch(setInvestorReturn(c.investorReturn));
    dispatch(localDataShareholders(c.selectItemUuid));
    dispatch(setselectItemUuid(c.selectItemUuid));
  };

  const updateItemCalcs = (uuidModel, params, calculationsItems = false) => {
    /* eslint-disable no-constant-condition */
    if (true || islogin) {
      dispatch(updateCaptableItem(params));
      captableLocalStorage.update(uuidModel, params);
      if (calculationsItems) {
        calculations(uuidModel);
      }
    }
  };

  const getData = () => {
    const uuidModel = validateUuid();
    setUuid(uuidModel);
    /* eslint-disable no-constant-condition */
    if (true || islogin) {
      dispatch(localDataCT(uuidModel));
      calculations(uuidModel);
    }
    return {};
  };

  const addItem = (type) => {
    /* eslint-disable no-constant-condition */
    if (true || islogin) {
      const itemsChange = (itemstoChange, uuidItemToChange) => {
        itemstoChange.forEach((itemChange) => {
          itemChange.conversionRound = uuidItemToChange;
          const i = {
            uuid: itemChange.uuid,
            data: itemChange,
          };
          console.log(i);
          updateItemCalcs(uuid, i);
        });
      };
      const item = capTableCalcs.getNewItem(uuid, type, itemsChange);
      dispatch(addNewCaptableItem(item));
      captableLocalStorage.create(uuid, item);
      calculations(uuid);
      return item;
    }
    return {};
  };

  const updateItem = (params) => {
    console.log(params);
    // updateItemCalcs(uuid, params, true);
    // console.log('params')
    // console.log(params)
    // res = {}
    // switch(params.type){
    //   case 'ownership':
    //     res = capTableCalcs.ownershipCalcs(params)
    //     break;
    //   case 'share':
    //     res = capTableCalcs.shareCalcs(params)
    //   default:
    //     break
    // }
    // const Newparams = {...params, ...res}
    // updateItemCalcs(uuid, Newparams, true)
    return {};
  };

  const deleteItem = (uuidItem) => {
    /* eslint-disable no-constant-condition */
    if (true || islogin) {
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
