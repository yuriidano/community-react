import { connect } from 'react-redux';
import { follow, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFeching, unfollow, toggleFollowingInProgress, requestUsers } from '../../redux/users-reducer';
import React from 'react';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import withAuthNavigate from '../../hoc/withAuthNavigate';
import { compose } from 'redux';
import { getcurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getPortionSize, getTotalUsersCount, getUsers, getUsersOld, } from '../../redux/users-selectors';

class UsersAPIComponent extends React.Component {

    componentDidMount() {
        this.props.requestUsers(this.props.pageSize, this.props.currentPage)
    }

    onPagesChanged = (pageNumber) => {
        this.props.requestUsers(this.props.pageSize, pageNumber)
    }


    render() {    
        return (
            <>
                {
                    this.props.isFetching ?  <Preloader /> : null
                }
                <Users  onPagesChanged={this.onPagesChanged}
                       totalUsersCount={this.props.totalUsersCount}
                       pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage}
                       follow={this.props.follow}
                       unfollow={this.props.unfollow}
                       users={this.props.users}
                       followingInProgress={this.props.followingInProgress}
                       toggleFollowingInProgress={this.props.toggleFollowingInProgress}
                 />
            </>
        )
    }


};




let mapStateToProps = (state) => {
    console.log('mapStateToProps USER');
    return {
        users: getUsers(state),
        totalUsersCount: getTotalUsersCount(state),
        pageSize: getPageSize(state),
        currentPage: getcurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        portionSize: getPortionSize(state)

    };
};


export default compose(
    connect(mapStateToProps, {
        follow,
    
        unfollow,
    
        setUsers,
    
        setCurrentPage,
    
        setTotalUsersCount,
    
        toggleIsFeching,
    
        toggleFollowingInProgress,
    
        requestUsers
    }),
    withAuthNavigate,
) (UsersAPIComponent)



