import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/redux-store";
import { requestUsersFollowed } from "../../redux/followed-reducer";



const FollowedUsers = () => {
    const dispatch = useAppDispatch();
    const usersFollowed = useAppSelector(state => state.usersFollowedPage.users);

    useEffect(() => {
        dispatch(requestUsersFollowed(100, 1, {term: '', friend: true}))
    }, [])

    return (
        <></>
    )
}



export default FollowedUsers;