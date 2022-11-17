import React, { useEffect, useRef, useState } from 'react';
import { ListOfCapTable, PanelLayout, Tab } from '../../components';
import { captableData } from '../../utils/data';
import { CapTableForm } from '../../components/Form';
import useCaptable from '../../hooks/useCaptable';
import useOutsideClick from '../../hooks/useOutsideClick';

const Captable = () => {
  const [currentTransaction, setCurrentTransaction] = useState({});
  const wrapperRef = useRef(null);
  const [showModal, setShowModal] = useOutsideClick(wrapperRef);
  const [editTransaction, setEditTransaction] = useState(false);
  const [listInputs, setListInputs] = useState([]);
  const {
    getData, addItem, deleteItem, updateItem, selectItem,
  } = useCaptable();

  useEffect(() => {
    getData();
    // TODO: Add fix to this line
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTransaction = (type) => {
    setShowModal(false);
    if (type) {
      const values = addItem(type);
      setCurrentTransaction(values);
      const transaction = captableData[type];
      const keys = Object.keys(transaction);
      const inputs = keys.map((item) => {
        if (item !== 'prefixName') {
          return transaction[item];
        }
        return null;
      }).filter(Boolean);
      setListInputs(inputs);
      setEditTransaction(true);
    }
  };

  const handleEditTransaction = (selectTransaction) => {
    selectItem(selectTransaction);
    setCurrentTransaction(selectTransaction);
    const transaction = captableData[selectTransaction?.type];
    const keys = Object.keys(transaction);
    const inputs = keys.map((item) => {
      if (item !== 'prefixName') {
        return transaction[item];
      }
      return null;
    }).filter(Boolean);
    setListInputs(inputs);
    setEditTransaction(true);
  };

  const deleteTransaction = (id) => {
    setEditTransaction(false);
    deleteItem(id);
  };

  const updateStoreCaptable = (data) => {
    const { data: DATA = {} } = updateItem(data);
    const newData = {
      ...currentTransaction,
      ...data.data,
      ...DATA,
    };
    setCurrentTransaction(newData);
  };

  const goBack = () => {
    setEditTransaction(false);
    selectItem({});
  };
  return (
    <PanelLayout titleName="Captable" SideBarType="model">
      <div className="flex gap-3">
        {editTransaction ? (
          <CapTableForm
            currentTransaction={currentTransaction}
            listInputs={listInputs}
            goBack={goBack}
            deleteTransaction={deleteTransaction}
            updateTransaction={updateStoreCaptable}
          />
        ) : (
          <ListOfCapTable
            handleTransaction={handleTransaction}
            handleEditTransaction={handleEditTransaction}
            setShowModal={setShowModal}
            showModal={showModal}
            selectTransaction={setCurrentTransaction}
            refProp={wrapperRef}
          />
        )}
        <div className="flex flex-col w-full h-layout overflow-y-scroll pr-36">
          <Tab />
        </div>
      </div>
    </PanelLayout>
  );
};

export default Captable;
