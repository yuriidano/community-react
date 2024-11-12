import Paginator from '../common/Paginator/Paginator';
import User from './User';
import styles from './Users.module.scss'


let Users = (props) => {

    return (
        <div className={styles.users}>
            <div className={styles.paginator}>
                    <Paginator totalUsersCount={props.totalUsersCount} pageSize={props.pageSize} currentPage={props.currentPage}
                        onPagesChanged={props.onPagesChanged} portionSize={props.portionSize} />
            </div>
            <div className={styles.items}>
                {
                    props.users.map(user => {
                        return (
                            <User key={user.id} user={user} {...props} />
                        )
                    })
                }
            </div>
        </div>

    )
};


export default Users;