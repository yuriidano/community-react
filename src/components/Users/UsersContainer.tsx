import { connect } from 'react-redux';
import { follow, unfollow, requestUsers } from '../../redux/users-reducer';
import React from 'react';
import Users from './Users';
import withAuthNavigate from '../../hoc/withAuthNavigate';
import { compose } from 'redux';
import { getcurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getPortionSize, getTotalUsersCount, getUsers } from '../../redux/users-selectors';
import { AppStateType } from '../../redux/redux-store';
import { UserType } from '../../types/types';


type MapStateType = {
    users: Array<UserType>,
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: number[],
    portionSize: number | null
}

type DispatchType = {
    requestUsers: (pageSize: number, currentPage: number) => void,
    follow: (userId: number) => void,
    unfollow: (userId: number) => void,
}

type OwnType = {}

type PropsUsersContainerType  = MapStateType & DispatchType & OwnType;

class UsersAPIComponent extends React.Component<PropsUsersContainerType> {

    componentDidMount() {
        this.props.requestUsers(this.props.pageSize, this.props.currentPage)
    }

    onPagesChanged = (pageNumber: number) => {
        this.props.requestUsers(this.props.pageSize, pageNumber)
    }


    render() {    
        return (
            <>
                <Users  onPagesChanged={this.onPagesChanged}
                       totalUsersCount={this.props.totalUsersCount}
                       pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage}
                       follow={this.props.follow}
                       unfollow={this.props.unfollow}
                       users={this.props.users}
                       followingInProgress={this.props.followingInProgress}
                       isFetching={this.props.isFetching}
                 />
            </>
        )
    }


};




let mapStateToProps = (state: AppStateType): MapStateType => {
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
    connect<MapStateType, DispatchType, OwnType, AppStateType>(mapStateToProps, {follow, unfollow, requestUsers}),
    withAuthNavigate,
) (UsersAPIComponent)



