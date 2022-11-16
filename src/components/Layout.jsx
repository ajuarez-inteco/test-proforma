import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import LogoSVG from './Logo';

const Layout = ({ children, title }) => {
  useEffect(() => {
    document.title = title;
  });
  return (
    <div className="">
      <div className="fixed bg-white top-0 w-full flex flex-row justify-between items-center px-6 py-2.5 shadow-prDefault z-40">
        <LogoSVG link="/" />
        <span className="font-normal text-sm text-pfBlack">
          Welcome to Proforma
        </span>
      </div>
      <div className="w-full relative">
        <div className="bg-get-started bg-cover min-h-portal">
          <div className="w-full min-h-portal pt-28 pb-20 bg-overlay">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Layout;

Layout.defaultProps = {
  title: 'PROFORMA',
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};
