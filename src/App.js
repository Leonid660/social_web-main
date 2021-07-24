import React from 'react';
import './App.css';
import {Navbar} from "./components/Navbar/Navbar";

import {Header} from "./components/Header/Header";
import {BrowserRouter, Route} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import {Profile} from "./components/Profile/Profile";
import UsersContainer from "./components/Users/UsersContainer";


const App = () => {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs'
                           render={() => <DialogsContainer
                               />}/>
                    <Route path='/profile'
                           render={() => <Profile/>}/>
                    <Route path='/users'
                           render={() => <UsersContainer/>}/>
                </div>
            </div>
        </BrowserRouter>)
}

export default App