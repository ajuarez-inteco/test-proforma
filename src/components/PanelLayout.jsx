import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import LogoSVG from './Logo';
import LinkButton from './LinkButton';
import Loader from './LoaderComponent';
import SideBar from './SideBar/SideBar';
import { SideBarModels } from './SideBar/SideBarModels';
import { UserIcon } from './Icons';
import { signInRoute, modelsRoute } from '../utils/constants';
import { logout } from '../features/auth';

const PanelLayout = ({
  children,
  titleName,
  SideBarType,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [userName, setUserName] = useState(false);
  const { islogin, user } = useSelector((state) => state.auth);

  useEffect(() => {
    document.title = titleName;
    setUserName(`${user['custom:first_name']} ${user['custom:last_name']}`);
  }, [user]);

  const handleLogOut = async () => {
    try {
      setShowLoader(true);
      await Auth.signOut();
      dispatch(logout);
      setShowLoader(false);
      navigate(signInRoute);
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="">
      <div className="fixed bg-white top-0 w-full flex flex-row justify-between items-center px-11 py-2.5 shadow-prDefault z-40">
        <LogoSVG link={modelsRoute} />
        <div className="ml-auto">
          {!islogin && (
            <>
              <LinkButton to={signInRoute} _className="text-pfBlack">
                Sign In
              </LinkButton>
              <span className="text-gray">/</span>
              <LinkButton to="/signup" _className="text-pfBlack">
                Sign Up
              </LinkButton>
            </>
          )}
          {islogin && (
            <div className="relative inline-block">
              <button
                type="button"
                className="font-normal text-sm text-blue flex gap-2"
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
                onClick={handleOpen}
              >
                <UserIcon />
                {userName}
              </button>
              {open ? (
                <div
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right bg-white shadow-lg border border-gray focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabIndex="-1"
                >
                  <div className="py-1" role="none">
                    <button
                      type="button"
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-0"
                      onClick={handleLogOut}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
      <div
        className={`grid ${
          SideBarType === 'models' ? 'grid-cols-models' : 'grid-cols-aside'
        } gap-6 h-layout mt-90`}
      >
        {SideBarType === 'models' && <SideBarModels />}
        {SideBarType === 'model' && <SideBar />}
        <div>{children}</div>
        {showLoader && <Loader fullScreen />}
      </div>
    </div>
  );
};
export default PanelLayout;

PanelLayout.defaultProps = {
  SideBarType: 'models',
};
PanelLayout.propTypes = {
  children: PropTypes.node.isRequired,
  titleName: PropTypes.string.isRequired,
  SideBarType: PropTypes.string,
};
