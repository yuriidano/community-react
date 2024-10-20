import { NavLink } from 'react-router-dom';
import s from './Header.module.scss';


const Header = (props) => {

    return (
        <header className={s.header}>
            <div className={s.container}>
                <a href="#" className={s.logo}>Friends</a>
                <div className={s.loginBlock}>
                    {
                        props.isAuth ? <div>{props.login} <button onClick={props.logout} >logout</button></div>
                         : <NavLink to={'/login'}>Login</NavLink>
                    }
                </div>
            </div>
        </header>
    );
};

export default Header;