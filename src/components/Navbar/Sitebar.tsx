import { NavLink } from 'react-router-dom';
import styles from './Sitebar.module.scss'
import classNames from 'classnames';
import { FC } from 'react';



type PropsType = {
  activeMenu: boolean,
  toggleActiveMenu: () => void,


}

const Sitebar: FC<PropsType> = (props) => {

 console.log(styles);
  return (
    <div className={classNames(styles.sitebar,{ [styles.activeMenu]: props.activeMenu })}>
      <div className={styles.body}>
        <nav className={styles.menu}>
          <ul className={styles.list}>
            <li className={styles.item} onClick={props.toggleActiveMenu}>
              <NavLink to='/profile' className={navData => navData.isActive ? styles.active : styles.link} >Profile</NavLink>
            </li>
            <li className={styles.item} onClick={props.toggleActiveMenu}>
              <NavLink to='/dialogs' className={navData => navData.isActive ? styles.active : styles.link} >Messages</NavLink>
            </li>
            <li className={styles.item} onClick={props.toggleActiveMenu}>
              <NavLink to='/news' className={navData => navData.isActive ? styles.active : styles.link} >News</NavLink>
            </li>
            <li className={styles.item} onClick={props.toggleActiveMenu}>
              <NavLink to='/users' className={navData => navData.isActive ? styles.active : styles.link} >Users</NavLink>
            </li>
            <li className={styles.item} onClick={props.toggleActiveMenu}>
              <NavLink to='/music' className={navData => navData.isActive ? styles.active : styles.link} >Music</NavLink>
            </li>
            <li className={styles.item} onClick={props.toggleActiveMenu}>
              <NavLink to='/settings' className={navData => navData.isActive ? styles.active : styles.link} >Settings</NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.copyrite}>© 2024 All Rights Reserved</div>
    </div>
  );
};

export default Sitebar;