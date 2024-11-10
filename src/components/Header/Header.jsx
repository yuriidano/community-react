import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../../assets/images/logo.png'

const Header = (props) => {

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.body}>
                    <a href="#" className={styles.logo}>
                        <img src={logo} alt="logo" />
                    </a>
                    <a href="#" className={styles.logoText}>Community React</a>
                </div>
                <div className={styles.loginBlock}>
                    {
                        props.isAuth ? <div className={styles.loginBody}><div className={styles.login}>{props.login}</div><button className={styles.button} onClick={props.logout} >logout</button> </div>
                         : <NavLink className={styles.button} to={'/login'}>Login</NavLink>
                    }
                </div>
            </div>
        </header>
    );
};

export default Header;