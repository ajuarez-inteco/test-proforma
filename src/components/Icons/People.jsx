import React from 'react';
import PropTypes from 'prop-types';

const People = ({ width, height, fill }) => (
  <svg width={width} height={height} viewBox="0 0 23 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.5 6C17.16 6 18.49 4.66 18.49 3C18.49 1.34 17.16 0 15.5 0C13.84 0 12.5 1.34 12.5 3C12.5 4.66 13.84 6 15.5 6ZM7.5 6C9.16 6 10.49 4.66 10.49 3C10.49 1.34 9.16 0 7.5 0C5.84 0 4.5 1.34 4.5 3C4.5 4.66 5.84 6 7.5 6ZM7.5 8C5.17 8 0.5 9.17 0.5 11.5V13C0.5 13.55 0.95 14 1.5 14H13.5C14.05 14 14.5 13.55 14.5 13V11.5C14.5 9.17 9.83 8 7.5 8ZM15.5 8C15.21 8 14.88 8.02 14.53 8.05C14.55 8.06 14.56 8.08 14.57 8.09C15.71 8.92 16.5 10.03 16.5 11.5V13C16.5 13.35 16.43 13.69 16.32 14H21.5C22.05 14 22.5 13.55 22.5 13V11.5C22.5 9.17 17.83 8 15.5 8Z" fill={fill} />
  </svg>
);

People.defaultProps = {
  width: 24,
  height: 24,
  fill: 'white',
};

People.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
};

export default People;
