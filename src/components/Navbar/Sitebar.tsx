import { NavLink } from 'react-router-dom';
import styles from './Sitebar.module.scss'
import classNames from 'classnames';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/redux-store';
import { getActiveMenu } from '../../redux/sitebar-selectors';
import { toggleActiveMenu } from '../../redux/header-reducer';
import withAuthRedirect from '../../hoc/withAuthRedirect';



type PropsType = {};

const Sitebar: FC<PropsType> = (props) => {
  const dispatch = useAppDispatch();
  const activeMenu = useAppSelector(getActiveMenu);

  const onActiveMenu = () => {
    dispatch(toggleActiveMenu())
  }
  return (
    <div className={classNames(styles.sitebar,{ [styles.activeMenu]: activeMenu })}>
      <div className={styles.body}>
        <nav className={styles.menu}>
          <ul className={styles.list}>
            <li className={styles.item} onClick={onActiveMenu}>
              <NavLink to='/profile' className={navData => navData.isActive ? styles.active : styles.link} >Profile</NavLink>
            </li>
            <li className={styles.item} onClick={onActiveMenu}>
              <NavLink to='/dialogs' className={navData => navData.isActive ? styles.active : styles.link} >Messages</NavLink>
            </li>
            <li className={styles.item} onClick={onActiveMenu}>
              <NavLink to='/news' className={navData => navData.isActive ? styles.active : styles.link} >News</NavLink>
            </li>
            <li className={styles.item} onClick={onActiveMenu}>
              <NavLink to='/users' className={navData => navData.isActive ? styles.active : styles.link} >Users</NavLink>
            </li>
            <li className={styles.item} onClick={onActiveMenu}>
              <NavLink to='/music' className={navData => navData.isActive ? styles.active : styles.link} >Music</NavLink>
            </li>
            <li className={styles.item} onClick={onActiveMenu}>
              <NavLink to='/settings' className={navData => navData.isActive ? styles.active : styles.link} >Settings</NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.copyrite}>© 2024 All Rights Reserved</div>
    </div>
  );
};



export const SitebarWithRedirect = withAuthRedirect(Sitebar);
