import React from 'react';
import s from './../Dialogs.module.css'
import {NavLink} from 'react-router-dom'

export const DialogItem = (props) => {
    return <div className={s.dialog + ' ' + s.active}>
        <NavLink to={'/dialogs/1' + props.id}>{props.name}</NavLink>
    </div>
}

