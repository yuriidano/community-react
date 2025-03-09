import { useEffect, useState } from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import styles from './Users.module.scss'
import { FilterInitialType, follow, requestUsers, unfollow } from '../../redux/users-reducer';
import UsersForm from './UsersForm';
import { useAppDispatch, useAppSelector } from '../../redux/redux-store';
import { getcurrentPage, getFilter, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsers } from '../../redux/users-selectors';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { Popap } from './Popap/Popap';
import classNames from 'classnames';



export const Users = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation()
    const totalUsersCount = useAppSelector(getTotalUsersCount);
    const pageSize = useAppSelector(getPageSize);
    const filter = useAppSelector(getFilter);
    const currentPage = useAppSelector(getcurrentPage);
    const followingInProgress = useAppSelector(getFollowingInProgress)
    const users = useAppSelector(getUsers)

    const [isActivePopap, setIsActivePopap] = useState(false);

     useEffect(() => {
        const parse = queryString.parse(location.search);
        let actualPage = currentPage;
        let actualFilter = filter;

        if(!!parse.page) actualPage = +parse.page;
        if(!!parse.term) actualFilter = {...actualFilter, term: parse.term as string};
        if(!!parse.friend) actualFilter = {...actualFilter, friend: parse.friend === 'true' ? true : false}

        dispatch(requestUsers(pageSize, actualPage, actualFilter));
     }, []);


    type QueryType = {term?: string, friend?:string, page?: string} 
    useEffect(() => {
        const query:QueryType = {};

        if(!!filter.term) query.term = filter.term;
        if(filter.friend !== null) query.friend = String(filter.friend);
        if(currentPage !== 1) query.page = String(currentPage);

        navigate({
            pathname: '/users',
            search: queryString.stringify(query)
        });

    }, [filter, currentPage]);



    const onPagesChanged = (pageNumber: number) => {

        dispatch(requestUsers(pageSize, pageNumber, filter))
    }

    const onSearchUsers = (filter: FilterInitialType) => {
        dispatch(requestUsers(pageSize, currentPage, filter))
    }

    const followSucces = (userId: number) => {
        dispatch(follow(userId))
    }

    const unfollowSucces = (userId: number) => {
        dispatch(unfollow(userId))
    }

    return (
        <div className={styles.users}>
            <UsersForm onSearchUsers={onSearchUsers} />
            <div className={styles.paginator}>
                    <Paginator totalUsersCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage}
                        onPagesChanged={onPagesChanged}  />
            </div>
            <div className={styles.items}>
                {
                    users.map(user => {
                        return (
                            <User key={user.id} user={user} followSucces={followSucces} unfollowSucces={unfollowSucces} followingInProgress={followingInProgress} 
                             openPopap={(isActivePopap: boolean) => setIsActivePopap(isActivePopap)} />
                        )
                    })
                }
                <div className={classNames(styles.PopapMessage, {[styles.PopapMessageActive]: isActivePopap})}><Popap closePopap={(isActivePopap: boolean) => setIsActivePopap(isActivePopap)} /></div>
            </div>
        </div>
    )
};

export const UsersWithRedirect = withAuthRedirect(Users);
