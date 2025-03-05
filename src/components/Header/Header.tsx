import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../../assets/images/logo.png'
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../redux/redux-store';
import { toggleActiveMenu } from '../../redux/header-reducer';
import { logout } from '../../redux/auth-reducer';
import { getActiveMenu, getIsAuth, getLogin } from '../../redux/header-selectors';
import withAuthRedirect from '../../hoc/withAuthRedirect';



const HeaderPage = () => {
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(getIsAuth);
    const login = useAppSelector(getLogin);
    const activeMenu = useAppSelector(getActiveMenu)

    const onChangeActiveMenu = () => {
        dispatch(toggleActiveMenu())
    }

    const onLogout = () => {
        dispatch(logout())
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
                        isAuth ? <div className={styles.loginBody}><div className={styles.login}>{login}</div><button className={styles.button} onClick={onLogout} >logout</button> </div>
                         : <NavLink className={styles.button} to={'/login'}>Login</NavLink>
                    }
                </div>
                <div onClick={() => {onChangeActiveMenu()}} className={classNames(styles.burger, {[styles._active]: activeMenu, [styles._noactive]: !activeMenu})}>
                    <span></span>
                </div>
            </div>
        </header>
    );
};

export const HeaderWithRedirect = withAuthRedirect(HeaderPage);

