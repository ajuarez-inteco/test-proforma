import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';
import Button from './Button';
import { MoreIcon } from './Icons';
import Modal from './Modal';
import { CapTableModal } from './Modal/CapTableModal';

export const ListOfCapTable = ({
  showModal, setShowModal, handleTransaction, handleEditTransaction, refProp,
}) => {
  const { data } = useSelector((state) => state.captable);

  return (
    <div className="w-80 flex flex-col justify-start items-start gap-y-7 bg-white border-r border-grayDark p-5 overflow-hidden overflow-y-scroll h-layout">
      <h3 className="text-xs font-semibold color-pfBlack">CAP TABLE</h3>
      <div className="w-full">
        {data.map((d) => {
          return (
            <div key={d.uuid} className="flex flex-col gap-2">
              <button onClick={() => handleEditTransaction(d)} type="button" key={d.uuid} className={`w-full h-12 mb-2 border  font-normal text-xs flex justify-center items-center gap-3 border-${d.color} text-${d.color}`}>{d.name || d.prefix}</button>
            </div>
          );
        })}
      </div>
      <Button
        icon={MoreIcon}
        onClick={() => setShowModal(true)}
        inline
        type="button"
      >
        Add Transaction
      </Button>

      {showModal && (
      <Modal
        refProp={refProp}
        closeModal={() => setShowModal(false)}
      >
        <CapTableModal actionButton={handleTransaction} />
      </Modal>
      )}
    </div>
  );
};

ListOfCapTable.defaultProps = {
  showModal: false,
  setShowModal: () => {},
  handleTransaction: () => {},
  handleEditTransaction: () => {},
  refProp: { current: null },
};

ListOfCapTable.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  handleTransaction: PropTypes.func,
  handleEditTransaction: PropTypes.func,
  refProp: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};
