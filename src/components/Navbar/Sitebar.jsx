import { NavLink } from 'react-router-dom';
import styles from './Sitebar.module.scss';
import classNames from 'classnames';


const Sitebar = (props) => {
 // classNames(styles.sitebar, { [styles.activeMenu]: props.activeMenu })

 console.log(styles);
  return (
    <div className={styles.sitebar}>
      <div className={classNames({[styles.body]: props.activeMenu})}>
        <nav className={styles.body}>
          <ul className={styles.list}>
            <li className={styles.item}>
              <NavLink to='/profile' className={navData => navData.isActive ? styles.active : styles.link} >Profile</NavLink>
            </li>
            <li className={styles.item}>
              <NavLink to='/dialogs' className={navData => navData.isActive ? styles.active : styles.link} >Messages</NavLink>
            </li>
            <li className={styles.item}>
              <NavLink to='/news' className={navData => navData.isActive ? styles.active : styles.link} >News</NavLink>
            </li>
            <li className={styles.item}>
              <NavLink to='/users' className={navData => navData.isActive ? styles.active : styles.link} >Users</NavLink>
            </li>
            <li className={styles.item}>
              <NavLink to='/music' className={navData => navData.isActive ? styles.active : styles.link} >Music</NavLink>
            </li>
            <li className={styles.item}>
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