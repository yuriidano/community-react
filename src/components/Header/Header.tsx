import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../../assets/images/logo.png'
import classNames from 'classnames';
import { FC } from 'react';


type PropsHeaderType = {
    logout: () => void,
    toggleActiveMenu: () => void,
    isAuth: boolean,
    login: string | null,
    userId: number | null,
    activeMenu: boolean
}

const Header: FC<PropsHeaderType> = (props) => {

    const onChangeActiveMenu = () => {
        props.toggleActiveMenu()
    }

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.body}>
                    <a href="#" className={styles.logo}>
                        <img src={logo} alt="logo" />
                    </a>
                    <a href="#" className={styles.logoText}>Community React</a>
                </div>
                <div className={styles.logoMobile}>
                    <a href="#" className={styles.logo}>
                        <img src={logo} alt="logo" />
                    </a>
                </div>
                <div className={styles.loginBlock}>
                    {
                        props.isAuth ? <div className={styles.loginBody}><div className={styles.login}>{props.login}</div><button className={styles.button} onClick={props.logout} >logout</button> </div>
                         : <NavLink className={styles.button} to={'/login'}>Login</NavLink>
                    }
                </div>
                <div onClick={() => {onChangeActiveMenu()}} className={classNames(styles.burger, {[styles._active]: props.activeMenu, [styles._noactive]: !props.activeMenu})}>
                    <span></span>
                </div>
            </div>
        </header>
    );
};

export default Header;

