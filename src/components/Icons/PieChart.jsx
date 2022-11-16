import React from 'react';
import PropTypes from 'prop-types';

const PieChart = ({ width, height, fill }) => (
  <svg width={width} height={height} viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.5 1.17629V18.8163C9.5 19.4563 8.91 19.9363 8.29 19.7963C3.82 18.7963 0.5 14.7863 0.5 9.99629C0.5 5.20629 3.82 1.19629 8.29 0.196292C8.91 0.0562922 9.5 0.536292 9.5 1.17629ZM11.53 1.17629V7.98629C11.53 8.53629 11.98 8.98629 12.53 8.98629H19.32C19.96 8.98629 20.44 8.39629 20.3 7.76629C19.45 4.00629 16.5 1.04629 12.75 0.196292C12.12 0.0562922 11.53 0.536292 11.53 1.17629ZM11.53 12.0063V18.8163C11.53 19.4563 12.12 19.9363 12.75 19.7963C16.51 18.9463 19.46 15.9763 20.31 12.2163C20.45 11.5963 19.96 10.9963 19.33 10.9963H12.54C11.98 11.0063 11.53 11.4563 11.53 12.0063Z" fill={fill} />
  </svg>
);

PieChart.defaultProps = {
  width: 24,
  height: 24,
  fill: 'white',
};

PieChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
};

export default PieChart;
