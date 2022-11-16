import React from 'react';
import PropTypes from 'prop-types';

const Save = ({ width, height, color }) => (
  <svg width={width} height={height} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.5 13V18C19.5 18.55 19.05 19 18.5 19H6.5C5.95 19 5.5 18.55 5.5 18V13C5.5 12.45 5.05 12 4.5 12C3.95 12 3.5 12.45 3.5 13V19C3.5 20.1 4.4 21 5.5 21H19.5C20.6 21 21.5 20.1 21.5 19V13C21.5 12.45 21.05 12 20.5 12C19.95 12 19.5 12.45 19.5 13ZM13.5 12.67L15.38 10.79C15.77 10.4 16.4 10.4 16.79 10.79C17.18 11.18 17.18 11.81 16.79 12.2L13.2 15.79C12.81 16.18 12.18 16.18 11.79 15.79L8.2 12.2C7.81 11.81 7.81 11.18 8.2 10.79C8.59 10.4 9.22 10.4 9.61 10.79L11.5 12.67V4C11.5 3.45 11.95 3 12.5 3C13.05 3 13.5 3.45 13.5 4V12.67Z" fill={color} />
  </svg>
);

Save.defaultProps = {
  width: 24,
  height: 24,
  color: 'white',
};

Save.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
};

export default Save;
