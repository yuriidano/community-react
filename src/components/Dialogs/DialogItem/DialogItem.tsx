import { NavLink } from 'react-router-dom';
import s from './../Dialogs.module.scss';
import { FC } from 'react';

type PropsType = {
    name: string,
    id: number,
    icon: string,
}

const DialogItem: FC<PropsType> = (props) => {
    const path = '/dialogs/' + props.id;
    return (
        <div className={s.dialog}>
            <NavLink to={path} className={s.icon}>
                <img src={props.icon} alt="icon" />
            </NavLink>
            <NavLink to={path} className={s.name}>{props.name}</NavLink>
        </div>
    );
};


export default DialogItem;




