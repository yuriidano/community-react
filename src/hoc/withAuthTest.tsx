import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/redux-store"


export const withAuthTest = (Element: React.ElementType) => {

    const RedirectComponent = (props: {}) => {
        const isAuth = useAppSelector(state => state.auth.isAuth);
        const navigate = useNavigate();

        if(!isAuth) return navigate('/login')

        return <Element {...props} />
    }   

    return RedirectComponent;
};