import {applyMiddleware, combineReducers,compose,createStore} from "redux";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import sidebarReducer from "./sidebarReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import  thunkMiddleware from "redux-thunk"
import { reducer as formReducer} from "redux-form"
import appReducer from "./AppReducer";


let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage:usersReducer,
    auth:authReducer,
    form: formReducer,
    app:appReducer
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

type PropertiesTypes<T> = T extends {[key:string]: infer U} ? U : never

export type InferActionsTypes<T extends {[key:string]:(...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

//@ts-ignore
window._store_ = store

export default store