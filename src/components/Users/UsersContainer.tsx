import React from "react";
import {connect} from "react-redux";
import {
    follow,
    unfollow,
    requestUsers
} from "../../Redux/usersReducer";
import Users from "./Users";
import Preloader from "../common/Preloader/preloader";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, getUsers
} from "../../Redux/users-selectors";
import { UserType } from "../../types/types";
import {AppStateType} from "../../Redux/redux-store";

type MapStatePropsType = {
    currentPage:number
    pageSize:number
    totalUsersCount:number
    isFetching: boolean
    users: Array<UserType>
    followingInProgress:Array<number>

}

type MapDispatchPropsType = {
    getUsers:(currentPage:number,pageSize:number) => void
    follow: (userId:number)=> void
    unfollow: (userId:number)=>void
}
type OwnPropsType = {
    title?:string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        let{currentPage,pageSize}=this.props
        this.props.getUsers(currentPage,pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        let{pageSize}=this.props
        this.props.getUsers(pageNumber,pageSize)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

let mapStateToProps = (state: AppStateType):MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress:getFollowingInProgress(state),
    }
}
export default compose(
    connect<MapStatePropsType,MapDispatchPropsType,OwnPropsType,AppStateType>(mapStateToProps, {follow, unfollow, getUsers: requestUsers})
)(UsersContainer)

