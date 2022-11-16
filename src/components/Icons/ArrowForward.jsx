import React from 'react';
import PropTypes from 'prop-types';

const ArrowForward = ({ width, height, fill }) => (
  <svg width={width} height={height} viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 9.49875H12.17L7.29 14.3787C6.9 14.7687 6.9 15.4087 7.29 15.7987C7.68 16.1887 8.31 16.1887 8.7 15.7987L15.29 9.20875C15.68 8.81875 15.68 8.18875 15.29 7.79875L8.71 1.19875C8.32 0.80875 7.69 0.80875 7.3 1.19875C6.91 1.58875 6.91 2.21875 7.3 2.60875L12.17 7.49875H1C0.45 7.49875 0 7.94875 0 8.49875C0 9.04875 0.45 9.49875 1 9.49875Z" fill={fill} />
  </svg>
);
ArrowForward.defaultProps = {
  fill: 'blue',
  width: 24,
  height: 24,
};

ArrowForward.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default ArrowForward;
