import React from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {Redirect} from "react-router-dom"
import AddMessageForm from "./AddMessageForm";



export const Dialogs = (props) => {

    let state = props.dialogsPage
    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>);
    let messagesElements = state.messages.map(m => <Message message={m.message} id={m.id}/>)


    let addNewMessage = (values) => {
        props.sendMessage(values.newMessageBody)
    }
    if (!props.isAuth) return <Redirect to="./login"/>

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
            </div>
           <AddMessageForm onSubmit={addNewMessage}/>
        </div>
    )
}

