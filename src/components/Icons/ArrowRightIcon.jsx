import React from 'react';
import PropTypes from 'prop-types';

const ArrowRightIcon = ({ className }) => (
  <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path className={className} d="M1.38658 0.946371C0.866582 1.46637 0.866582 2.30637 1.38658 2.82637L6.55992 7.9997L1.38658 13.173C0.866582 13.693 0.866582 14.533 1.38658 15.053C1.90658 15.573 2.74658 15.573 3.26658 15.053L9.38658 8.93304C9.90658 8.41304 9.90658 7.57304 9.38658 7.05304L3.26658 0.933037C2.75992 0.42637 1.90658 0.426371 1.38658 0.946371Z" />
  </svg>
);

ArrowRightIcon.defaultProps = {
  className: 'fill-pfBlack',
};

ArrowRightIcon.propTypes = {
  className: PropTypes.string,
};

export default ArrowRightIcon;
