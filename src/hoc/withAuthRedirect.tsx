import { FC } from "react"
import { useAppSelector } from "../redux/redux-store";
import { Navigate } from "react-router-dom";

type PropsType = {};

const withAuthRedirect = (Element: React.ElementType) => {
    const RedirectComponent:FC<PropsType> = (props) => {
        const isAuth = useAppSelector((state) => state.auth.isAuth);
        if(!isAuth) return <Navigate to={'/login'} />
        return (
            <>
                <Element {...props} />
            </>
        )
    }

    return RedirectComponent;
};


export default withAuthRedirect;