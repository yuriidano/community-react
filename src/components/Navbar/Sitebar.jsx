import { NavLink } from 'react-router-dom';
import style from './Sitebar.module.scss';
import { useState } from 'react';


const Sitebar = (props) => {




  return (
    <div className={style.sitebar}>
      <div className={style.menu}>
        <nav className={style.body}>
          <ul className={style.list}>
            <li className={style.item}>
              <NavLink to='/profile' className={navData => navData.isActive ? style.active : style.link} >Profile</NavLink>
            </li>
            <li className={style.item}>
              <NavLink to='/dialogs' className={navData => navData.isActive ? style.active : style.link} >Messages</NavLink>
            </li>
            <li className={style.item}>
              <NavLink to='/news' className={navData => navData.isActive ? style.active : style.link} >News</NavLink>
            </li>
            <li className={style.item}>
              <NavLink to='/users' className={navData => navData.isActive ? style.active : style.link} >Users</NavLink>
            </li>
            <li className={style.item}>
              <NavLink to='/music' className={navData => navData.isActive ? style.active : style.link} >Music</NavLink>
            </li>
            <li className={style.item}>
              <NavLink to='/settings' className={navData => navData.isActive ? style.active : style.link} >Settings</NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className={style.copyrite}>© 2024 All Rights Reserved</div>
    </div>
  );
};

export default Sitebar;