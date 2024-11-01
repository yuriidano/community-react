import Paginator from '../common/Paginator/Paginator';
import User from './User';


let Users = (props) => {

    return (
        <div>
            <div>
                <Paginator totalUsersCount={props.totalUsersCount} pageSize={props.pageSize} currentPage={props.currentPage}
                    onPagesChanged={props.onPagesChanged} portionSize={props.portionSize} />
            </div>
            {
                props.users.map(user => {
                    return (
                        <User user={user} {...props} />
                    )
                })
            }
        </div>
    )
};


export default Users;