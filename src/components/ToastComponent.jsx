import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  AlertIcon, ToastDefaultIcon, NotificationIcon, SuccessIcon,
} from './Icons';

const Toast = ({
  text, type, timeOn, closeAction,
}) => {
  let timer = () => {};
  const colors = {
    success: 'bg-greenDark',
    notification: 'bg-orangeDark',
    alert: 'bg-orange',
    default: 'bg-blueDark',
  };

  const icons = {
    success: SuccessIcon,
    notification: NotificationIcon,
    alert: AlertIcon,
    default: ToastDefaultIcon,
  };

  const bg = colors[type] || 'bg-blueDark';

  const Icon = icons[type] || ToastDefaultIcon;

  const [toast, setToast] = useState(true);

  if (timeOn) {
    timer = () => setTimeout(() => {
      closeAction();
      setToast(false);
    }, 5000);
    timer();
  }

  const closeToast = () => {
    setToast(false);
    clearTimeout(timer);
  };

  return (
    <div>
      {toast && (
        <div
          id="toast-simple"
          className={`flex fixed bottom-16 inset-x-1/4 items-center p-4 space-x-4 max-w-4xl text-white ${bg} rounded-lg shadow`}
          role="alert"
        >
          <Icon />
          <div className="pl-4 text-sm font-normal">{text}</div>
          <button type="button" onClick={() => closeToast()}>
            <span className="sr-only">Close</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

Toast.defaultProps = {
  type: 'default',
  timeOn: false,
  closeAction: () => {},
};
Toast.propTypes = {
  text: PropTypes.string.isRequired,
  timeOn: PropTypes.bool,
  type: PropTypes.oneOf(['success', 'alert', 'notification', 'default']),
  closeAction: PropTypes.func,
};

export default Toast;
