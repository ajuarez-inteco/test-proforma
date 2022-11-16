import React from 'react';
import PropTypes from 'prop-types';

const CaretDown = ({ width, height, fill }) => (
  <svg width={width} height={height} viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.71054 1.71L3.30054 4.3C3.69054 4.69 4.32054 4.69 4.71054 4.3L7.30054 1.71C7.93054 1.08 7.48054 0 6.59054 0H1.41054C0.52054 0 0.0805397 1.08 0.71054 1.71Z" fill={fill} />
  </svg>
);

CaretDown.defaultProps = {
  width: 24,
  height: 24,
  fill: 'white',
};

CaretDown.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
};

export default CaretDown;
