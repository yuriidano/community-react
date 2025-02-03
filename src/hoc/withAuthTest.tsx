import { FC } from "react";
import { useAppSelector } from "../redux/redux-store";
import { useNavigate } from "react-router-dom";

type PropsType = {};

const withAuthTest = (Element: React.ComponentType) => {

    const RedirectComponent:FC<PropsType> = (props) => {
        const isAuth = useAppSelector((state) => state.auth.isAuth);
        const navigate = useNavigate();
        if(!isAuth) navigate('/login');

        return <Element {...props} />
    }

    return RedirectComponent;
};


export default withAuthTest;

