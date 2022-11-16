import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { deleteDataShareholder, setDataShareholders, updateDataShareholder } from '../features/shareholders';
import { shareholdersLocalStorage } from '../storage/local/shareholders.localStorage';
import { getNewShareHolder } from '../utils/calcs/captableShareholders.calcs';

const useShareholder = () => {
  const { islogin } = useSelector((state) => state.auth);
  const { selectItemUuid } = useSelector((state) => state.captable);
  const dispatch = useDispatch();
  const createShareholder = (item) => {
    if (!islogin) {
      item.uuid = uuidv4();
      // TODO: Add calc fn
      item.percentOfRound = getNewShareHolder(item);
      dispatch(setDataShareholders(item));
      shareholdersLocalStorage.create(selectItemUuid, item);
    }
    return {};
  };

  const updateShareholder = (item) => {
    if (!islogin) {
      dispatch(updateDataShareholder(item));
      shareholdersLocalStorage.update(selectItemUuid, item);
    }
    return {};
  };

  const deleteShareholder = (paramId) => {
    if (!islogin) {
      dispatch(deleteDataShareholder(paramId));
      shareholdersLocalStorage.delete(selectItemUuid, paramId);
    }
    return {};
  };

  return {
    createShareholder,
    updateShareholder,
    deleteShareholder,
  };
};

export default useShareholder;
