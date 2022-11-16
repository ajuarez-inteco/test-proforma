import React from 'react';
import PropTypes from 'prop-types';
import { captable } from '../../utils/config/modals.config';
import Button from '../Button';
import { ArrowRightIcon } from '../Icons';

export const CapTableModal = ({ actionButton }) => {
  const handleClick = (key) => {
    actionButton(key);
  };
  return (
    <div className="flex flex-col justify-center items-center max-w-568 gap-8">
      <h2 className="text-pfBlack font-xl">Select Transaction Type</h2>
      <p className="text-black text-base font-normal max-w-368">
        Choose the type of transaction to add to your cap table.
        If you are unsure, start with a Common transaction.

      </p>
      <div className="flex flex-col gap-8">
        { captable.map(({ name, description, key }) => (
          <div key={key} className="flex flex-col gap-2">
            <Button icon={ArrowRightIcon} variant="modal" inline onClick={() => handleClick(key)} type="button">{name}</Button>
            <span className="font-normal text-xs pfBlack">{description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

CapTableModal.defaultProps = {
  actionButton: () => {},
};

CapTableModal.propTypes = {
  actionButton: PropTypes.func,
};
