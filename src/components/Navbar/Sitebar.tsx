import { NavLink } from 'react-router-dom';
import styles from './Sitebar.module.scss'
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../redux/redux-store';
import { getActiveMenu } from '../../redux/sitebar-selectors';
import { toggleActiveMenu } from '../../redux/header-reducer';
import withAuthRedirect from '../../hoc/withAuthRedirect';


const Sitebar = () => {
  const dispatch = useAppDispatch();
  const activeMenu = useAppSelector(getActiveMenu);

  const onActiveMenu = () => {
    dispatch(toggleActiveMenu())
  }

  type NavData = {isActive: boolean};

  const isNavDataActive = () => {
    return (navData: NavData) => navData.isActive ? styles.active : styles.link
  }
  return (
    <div className={classNames(styles.sitebar,{ [styles.activeMenu]: activeMenu })}>
      <div className={styles.body}>
        <nav className={styles.menu}>
          <ul className={styles.list}>
            <li className={styles.item} onClick={onActiveMenu}>
              <NavLink to='/profile' className={isNavDataActive()} >Profile</NavLink>
            </li>
            <li className={styles.item} onClick={onActiveMenu}>
              <NavLink to='/dialogs' className={isNavDataActive()} >Messages</NavLink>
            </li>
            <li className={styles.item} onClick={onActiveMenu}>
              <NavLink to='/users' className={isNavDataActive()} >Users</NavLink>
            </li>
            <li className={styles.item} onClick={onActiveMenu}>
              <NavLink to='/chat' className={isNavDataActive()} >Chat</NavLink>
            </li>
            <li className={styles.item} onClick={onActiveMenu}>
              <NavLink to='/music' className={isNavDataActive()} >Music</NavLink>
            </li>
            <li className={styles.item} onClick={onActiveMenu}>
              <NavLink to='/settings' className={isNavDataActive()} >Settings</NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.copyrite}>© 2024 All Rights Reserved</div>
    </div>
  );
};



export const SitebarWithRedirect = withAuthRedirect(Sitebar);
