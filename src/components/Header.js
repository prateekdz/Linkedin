import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../features/userSlice';
import { auth } from '../firebase';
import './Header.css';
import HeaderOption from './HeaderOption';
import logo from '../assets/logo.svg';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SupervisorAccountRoundedIcon from '@mui/icons-material/SupervisorAccountRounded';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';

function Header() {
  const dispatch = useDispatch();
  const logoutOfApp = () => {
    dispatch(logout());
    auth.signOut();
  };

  return (
    <div className="header">
      <div className="header__left">
        <img className="header__logo" src={logo} alt="LinkedIn" />

        <div className="header__search">
          <SearchRoundedIcon />
          <input type="text" placeholder="Search" />
        </div>
      </div>

      <div className="header__right">
          <HeaderOption Icon={HomeRoundedIcon} title="Home" />
          <HeaderOption Icon={SupervisorAccountRoundedIcon} title="My Network" />
          <HeaderOption Icon={BusinessCenterRoundedIcon} title="Jobs" />
          <HeaderOption Icon={ChatRoundedIcon} title="Messaging" />
          <HeaderOption Icon={NotificationsRoundedIcon} title="Notifications" />
          <HeaderOption 
            avatar={true}
            title="Me" 
            onClick={logoutOfApp}
          />
      </div>
    </div>
  );
}

export default Header;
