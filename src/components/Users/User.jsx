import { NavLink } from 'react-router-dom';
import styles from './Users.module.scss';
import userPhotos from '../../assets/images/user.jpg';

let User = ({user, ...restProps}) => {
    return (
        <div key={user.id} className={styles.users}>
        <div className={styles.user}>
            <div className={styles.avatar}>
                    <NavLink to={`/profile/${user.id}`}>
                        <img src={user.photos.small != null ? user.photos.small : userPhotos} alt="avatar" />
                    </NavLink>
                </div>
                <div>
                    {
                        user.followed
                            ? <button disabled={restProps.followingInProgress.some(id => id == user.id)} onClick={() => {
                                restProps.unfollow(user.id)
                            
                            }} className={styles.button} >Unfollow</button>

                            : <button disabled={restProps.followingInProgress.some(id => id == user.id)} onClick={() => { 

                                restProps.follow(user.id);
                            
                            }} className={styles.button} >Follow</button>

                    }

                </div>
            </div>
            <div className={styles.body}>
                <div className={styles.info}>
                    <div className={styles.name}>{user.name}</div>
                    <div className={styles.status}>{user.status}</div>
                </div>
                <div className={styles.location}>
                </div>
            </div>
        </div>
    )
};


export default User;