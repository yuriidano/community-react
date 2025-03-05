import { NavLink } from 'react-router-dom';
import stylles from './../Dialogs.module.scss';

type PropsType = {
    name: string,
    id: number,
    icon: string,
}

const DialogItem = (props: PropsType) => {
    const path = '/dialogs/' + props.id;
    return (
        <div className={stylles.dialog}>
            <NavLink to={path} className={stylles.icon}>
                <img src={props.icon} alt="icon" />
            </NavLink>
            <NavLink to={path} className={stylles.name}>{props.name}</NavLink>
        </div>
    );
};


export default DialogItem;




