import React from 'react';
import PropTypes from 'prop-types';

const Caret = ({ width, height, fill }) => (
  <svg width={width} height={height} viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.28946 3.29L4.69946 0.7C4.30946 0.31 3.67946 0.309999 3.28946 0.699999L0.69946 3.29C0.0694601 3.92 0.51946 5 1.40946 5L6.58946 5C7.47946 5 7.91946 3.92 7.28946 3.29Z" fill={fill} />
  </svg>
);

Caret.defaultProps = {
  width: 24,
  height: 24,
  fill: 'white',
};

Caret.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
};

export default Caret;
