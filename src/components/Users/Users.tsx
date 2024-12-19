import { FC } from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import styles from './Users.module.scss'
import { UserType } from '../../types/types';


type PropsUsersType = {
    onPagesChanged: (pageNumber: number) => void,
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,
    follow: (userId: number) => void,
    unfollow: (userId: number) => void,
    users: Array<UserType>
    followingInProgress: Array<number>
    isFetching: boolean
}

let Users: FC<PropsUsersType> = (props) => {

    return (
        <div className={styles.users}>
            <div className={styles.paginator}>
                    <Paginator totalUsersCount={props.totalUsersCount} pageSize={props.pageSize} currentPage={props.currentPage}
                        onPagesChanged={props.onPagesChanged}  />
            </div>
            <div className={styles.items}>
                {
                    props.users.map(user => {
                        return (
                            <User key={user.id} user={user} follow={props.follow} unfollow={props.unfollow} followingInProgress={props.followingInProgress} />
                        )
                    })
                }
            </div>
        </div>

    )
};


export default Users;