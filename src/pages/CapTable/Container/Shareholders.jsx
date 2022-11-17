import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from '../../../components/Modal';
import Button from '../../../components/Button';
import {
  AddCircle,
  AttachMoney,
  PieChart,
  Save,
  ThreeDots,
} from '../../../components/Icons';
import ShareholderModal from '../../../components/Modal/ShareholderModal';
import IconDropdown from '../../../components/IconDropdown';
import useShareholder from '../../../hooks/useShareholder';
import useOutsideClick from '../../../hooks/useOutsideClick';
import { formatCurrency } from '../../../utils/format';

const Shareholders = () => {
  const wrapperRef = useRef(null);
  const [showModal, setShowModal] = useOutsideClick(wrapperRef);
  const [editMode, setEditMode] = useState(false);
  const [modalData, setModalData] = useState(null);
  const { modelSelected } = useSelector((state) => state.models);
  const { shareholders } = useSelector((state) => state.captable);
  const { selectItemUuid } = useSelector((state) => state.captable);
  const { shareholdersList } = useSelector((state) => state.shareholders);
  const { deleteShareholder } = useShareholder();

  const shareholdersHeaders = [
    'Name',
    'Invesment ('.concat(modelSelected.currency, ')'),
    'Shares',
    'Percent of Round',
  ];

  const onClickItem = (idx, id) => {
    const selectedShareholder = shareholdersList.find((s) => s.uuid === id);
    if (idx === 0) {
      setEditMode(true);
      setShowModal(true);
      setModalData({ ...selectedShareholder, modelId: selectItemUuid });
    }
    if (idx === 1) {
      deleteShareholder(id);
    }
  };

  useEffect(() => {
    if (!showModal) setModalData(null);
  }, [showModal]);

  return (
    <div className="grid grid-cols-9 grid-rows-18 gap-x-6 gap-y-2">
      {showModal && (
        <Modal
          refProp={wrapperRef}
          closeModal={() => {
            setShowModal(false);
          }}
          defaultBack={false}
        >
          <ShareholderModal
            onClose={() => {
              setShowModal(false);
              setModalData(null);
              setEditMode(false);
            }}
            editMode={editMode}
            values={modalData}
          />
        </Modal>
      )}
      <div className="col-start-8 col-span-2">
        <div className="flex mb-6">
          <Button icon={Save}>
            Export
          </Button>
        </div>
      </div>
      <div className="col-span-4">
        <div className="flex flex-col items-center">
          <div className="flex">
            <AttachMoney fill="#004AB5" />
            <h2 className="ml-2 text-xl text-pfBlack">
              Investment Remaining
              {' '}
              (
              {modelSelected.currency}
              )
            </h2>
          </div>
          <p className="text-base text-black">{shareholders.investmentRemaining ? shareholders.investmentRemaining : 0}</p>
        </div>
      </div>
      <div className="col-start-6 col-span-4">
        <div className="flex flex-col items-center">
          <div className="flex">
            <PieChart fill="#004AB5" />
            <h2 className="ml-2 text-xl text-pfBlack flex">
              Shares Remaining
            </h2>
          </div>
          <p className="text-base text-black">{shareholders.sharesRemaining ? shareholders.sharesRemaining : 0}</p>
        </div>
      </div>
      <div className="col-span-9">
        <hr className="w-full my-10 mx-0 px-0 text-grayDark" />
      </div>
      <div className="col-span-9">
        <table className="w-full text-center">
          <thead>
            <tr>
              {shareholdersHeaders.map((title, i) => (
                <th
                  scope="col"
                  key={title}
                >
                  <p className={`
                    text-xs text-pfBlack font-semibold py-4
                    after:content-['']
                    after:flex
                    after:ml-1;
                    after:h-0.5
                    after:w-10
                    after:mt-2.5
                    after:bg-blueDark
                    ${i === 0
                    ? 'text-left'
                    : 'text-right after:ml-auto'
                      }
                    `}
                  >
                    {title}
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shareholdersList.map((row) => (
              <tr key={row.uuid}>
                <td className="relative">
                  <p className="text-left text-pfBlack text-xl">
                    {row.name}
                  </p>
                </td>
                <td className="relative">
                  <p className="text-right text-pfBlack text-xl">
                    {formatCurrency(row.investment)}
                  </p>
                </td>
                <td className="relative">
                  <p className="text-right text-pfBlack text-xl">
                    {formatCurrency(row.shares)}
                  </p>
                </td>
                <td className="relative">
                  <p className="text-right text-pfBlack text-xl">
                    {row.percentOfRound && row.percentOfRound.toFixed(2)}
                  </p>
                </td>
                <td className="relative">
                  <IconDropdown options={['Rename', 'Delete']} onClickItem={(idx) => onClickItem(idx, row.uuid)}>
                    <ThreeDots fill="#333333" />
                  </IconDropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="col-start-8 col-span-2">
        <div className="flex mt-6">
          <Button onClick={() => setShowModal(true)} icon={AddCircle}>
            Add Shareholder
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Shareholders;
