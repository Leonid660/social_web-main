import React from 'react';
import s from './Post.module.css';

export const Post = (props) => {
    return <div className={s.item}>
        <img src='https://million-wallpapers.ru/wallpapers/5/51/424703866779568/nejtiri-2017-avatara-2.jpg'/>
        {props.message}
        <div>
            <span>Like</span> {props.likeCount}
        </div>
    </div>
}