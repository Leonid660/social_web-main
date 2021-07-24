import React from 'react';
import {addPostAC, updateNewPostTextAC} from "../../../Redux/profileReducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";


let mapStateToProps=(state)=>{
    return {
        posts:state.profilePage.posts,
        newPostText:state.profilePage.newPostText
    }
}

let mapDispatchToProps=(dispatch)=>{
    return {
        updateNewPostText:(text)=>{
            let action = updateNewPostTextAC(text);
            dispatch(action)
        },
        addPost:()=>{
            dispatch(addPostAC())
        }
    }
}

const MyPostsContainer=connect(mapStateToProps,mapDispatchToProps)(MyPosts)

export default MyPostsContainer