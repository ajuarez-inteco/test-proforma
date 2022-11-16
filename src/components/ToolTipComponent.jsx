import React from 'react';
import PropTypes from 'prop-types';
import ToolTipIcon from './Icons/ToolTipIcon';

const ToolTipComponent = ({ text, name }) => {
  const enter = () => {
    const tooltip = document.querySelector(`#${name}`);
    tooltip.classList.remove('hidden');
  };
  const leave = () => {
    const tooltip = document.querySelector(`#${name}`);
    tooltip.classList.add('hidden');
  };
  return (
    <div className="flex flex-row ml-1.5">
      <div
        onMouseEnter={() => enter()}
        onMouseLeave={() => leave()}
        className="cursor-pointer"
      >
        <ToolTipIcon />
      </div>
      <span
        className="absolute right-0 mt-4 max-w-200 w-full text-xs text-justify ml-1 bg-blue text-white p-2.5 rounded-md shadow-xl z-50 hidden"
        id={name}
      >
        {text}
      </span>
    </div>
  );
};

ToolTipComponent.defaultProps = {
  text: '',
  name: 'tooltip',
};
ToolTipComponent.propTypes = {
  text: PropTypes.string,
  name: PropTypes.string,
};

export default ToolTipComponent;
