import Paginator from '../common/Paginator/Paginator';
import InfoContainer from '../Info/InfoContainer';
import User from './User';
import styles from './Users.module.scss'


let Users = (props) => {

    return (
        <div className={styles.users}>
            <div>
                <Paginator totalUsersCount={props.totalUsersCount} pageSize={props.pageSize} currentPage={props.currentPage}
                    onPagesChanged={props.onPagesChanged} portionSize={props.portionSize} />
            </div>
            {
                props.users.map(user => {
                    return (
                        <User key={user.id} user={user} {...props} />
                    )
                })
            }
        </div>

    )
};


export default Users;