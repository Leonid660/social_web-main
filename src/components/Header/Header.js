import React from 'react';
import s from './Header.module.css';
import {NavLink} from  "react-router-dom";

 export const Header = (props) => {
    return <header className={s.header}>
        <img className={s.header_img} src='https://im0-tub-ru.yandex.net/i?id=f45d9cc83b204a366a5cce9c77f75fa5&n=13'/>
        <div className={s.loginBlock}>
            {props.isAuth ? props.login
            :<NavLink to={'/login'}>Login</NavLink>}
        </div>
    </header>

}

