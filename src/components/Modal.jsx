import React from 'react';
import PropTypes from 'prop-types';
import { ArrowLeftIcon } from './Icons';
import { Portal } from './Portal';

const Modal = ({
  closeModal,
  children,
  defaultBack,
  refProp,
}) => {
  return (
    <Portal>
      <div
        ref={refProp}
        className="flex flex-col items-center min-w-modal bg-gray rounded py-16 px-24 overflow-y-scroll max-h-modal"
      >
        {defaultBack && (
        <div className="flex w-full justify-start">
          <button type="button" onClick={() => closeModal()}>
            <ArrowLeftIcon />
          </button>
        </div>
        )}
        <div className="w-full flex flex-col items-center justify-center ">
          {children}
        </div>
      </div>
    </Portal>
  );
};

Modal.defaultProps = {
  closeModal: () => {},
  children: '',
  defaultBack: true,
  refProp: { current: null },
};

Modal.propTypes = {
  closeModal: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.element]),
  defaultBack: PropTypes.bool,
  refProp: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

export default Modal;
