import { useEffect, useState } from 'react';
import Paginator from '../common/Paginator/Paginator';
import styles from './FollowedUsers.module.scss'
import { useAppDispatch, useAppSelector } from '../../redux/redux-store';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import classNames from 'classnames';
import { PopapMessage } from '../common/PopapMessage/PopapMessage';
import { FollowedUser } from './FollowedUser/FollowedUser';
import { FollowedUsersForm } from './FollowedUsersForm/FollowedUsersForm';
import { follow, requestFollowedUsers, unfollow } from '../../redux/followed-reducer';



export const FollowedUsers = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation()
    const totalUsersCount = useAppSelector(state => state.usersFollowedPage.totalUsersCount);
    const pageSize = useAppSelector(state => state.usersFollowedPage.pageSize);
    const term = useAppSelector(state => state.usersFollowedPage.term);
    const currentPage = useAppSelector(state => state.usersFollowedPage.currentPage);
    const followingInProgress = useAppSelector(state => state.usersFollowedPage.followingInProgress)
    const followedUsers= useAppSelector(state => state.usersFollowedPage.followedUsers);
    const userProfile = useAppSelector(state => state.dialogsPage.userProfile)

    const [isActivePopap, setIsActivePopap] = useState(false);

     useEffect(() => {
        const parse = queryString.parse(location.search);
        let actualPage = currentPage;
        let actualTerm= term;
        if(!!parse.pageFollowed) actualPage = +parse.pageFollowed;
        if(!!parse.termFollowed) actualTerm = parse.termFollowed as string;
        dispatch(requestFollowedUsers(pageSize, actualPage, actualTerm, true));
     }, [pageSize]);


    type QueryType = {termFollowed?: string, pageFollowed?: string} 
    useEffect(() => {
        const query:QueryType = {};

        if(!!term) query.termFollowed = term;
 
        if(currentPage !== 1) query.pageFollowed = String(currentPage);

        navigate({
            pathname: '/followedUsers',
            search: queryString.stringify(query)
        });

    }, [term, currentPage]);



    const onPagesChanged = (pageNumber: number) => {

        dispatch(requestFollowedUsers(pageSize, pageNumber, term, true))
    }

    const onSearchUsers = (term: string) => {
        dispatch(requestFollowedUsers(pageSize, currentPage, term, true))
    }

    const followSucces = (userId: number) => {
        dispatch(follow(userId))
    }

    const unfollowSucces = (userId: number) => {
        dispatch(unfollow(userId))
    }


    return (
        <div className={styles.users}>
            <FollowedUsersForm onSearchUsers={onSearchUsers} />
            {totalUsersCount > pageSize &&
                <div className={styles.paginator}>
                    <Paginator totalUsersCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage}
                        onPagesChanged={onPagesChanged} />
                </div>
            }
            <div className={styles.items}>
                {
                    followedUsers.map(user => {
                        return (
                            <FollowedUser key={user.id} user={user} followSucces={followSucces} unfollowSucces={unfollowSucces} followingInProgress={followingInProgress}
                                openPopap={(isActivePopap: boolean) => setIsActivePopap(isActivePopap)} />
                        )
                    })
                }
                <div className={classNames(styles.PopapMessage, { [styles.PopapMessageActive]: isActivePopap })}><PopapMessage topValue={'15%'} leftValue={'43%'} userProfile={userProfile} closePopap={(isActivePopap: boolean) => setIsActivePopap(isActivePopap)} /></div>
            </div>
        </div>
    )
};


export default FollowedUsers;
