import { NavLink } from 'react-router-dom';
import styles from './Users.module.scss';
import userPhotos from '../../assets/images/user.jpg';
import { UserType } from '../../types/types';
import classNames from 'classnames';

type PropsUserType = {
    user: UserType,
    followSucces: (userId: number) => void,
    unfollowSucces: (userId: number) => void,
    followingInProgress: Array<number>,
    openPopap: (openPopap: boolean) => void
}

let User = ({ user, followSucces, unfollowSucces, followingInProgress, openPopap }: PropsUserType) => {
    return (
        <div className={styles.userBody}>
            <div className={styles.user}>
                <div className={styles.avatar}>
                    <NavLink to={`/profile/${user.id}`}>
                        <img src={user.photos.small != null ? user.photos.small : userPhotos} alt="avatar" />
                    </NavLink>
                </div>
                <div className={styles.name}>{user.name}</div>
                <button onClick={() => openPopap(true)} className={classNames(styles.button, styles.buttonMessage)}>Message</button>
                <div>
                    {
                        user.followed
                            ? <button disabled={followingInProgress.some(id => id == user.id)} onClick={() => {
                                unfollowSucces(user.id)

                            }} className={styles.button} >Unfollow</button>

                            : <button disabled={followingInProgress.some(id => id == user.id)} onClick={() => {

                                followSucces(user.id);

                            }} className={styles.button} >Follow</button>
                    }
                </div>
            </div>
        </div>
    )
};


export default User;