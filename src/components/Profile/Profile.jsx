import React from 'react';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./My posts/MyPostsContainer";


export const Profile = (props) => {

    return <div>
        <ProfileInfo profile={props.profile}/>
        <MyPostsContainer
        />
    </div>
}