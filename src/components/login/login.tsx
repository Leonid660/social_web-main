import React from 'react'
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../common/formsControls/formsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../Redux/authReducer";
import {Redirect} from "react-router-dom";
import style from "./../common/formsControls/formsControls.module.css"
import {AppStateType} from "../../Redux/redux-store";

type LoginFormOwnProps = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> =
    ({handleSubmit, error,captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>

            {createField("Email", "email", [required], Input)}
            {createField("Password", "password", [required], Input, {type: "password"})}
            {createField(undefined, "rememberMe", [], Input, {type: "checkbox"}, "remember me")}

            { captchaUrl && <img src={captchaUrl}/>}
            { captchaUrl && createField("Symbols from image", "captcha",[required], Input, {})}


            {error &&
            <div className={style.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm)


type MapStateToPropsType = {
    captchaUrl: string | null
    isAuth: boolean
}
type MapDispatchPropsType = {
    login: (email:string, password:string, rememberMe:boolean, captcha:string) => void
}
type LoginFormValuesType = {
    captcha: string
    rememberMe: boolean
    password: string
    email: string
}
const Login: React.FC<MapStateToPropsType & MapDispatchPropsType> = (props) => {
    const onSubmit = (fromData:any) => {
        props.login(fromData.email, fromData.password, fromData.rememberMe, fromData.captchaUrl)
    }
    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }
    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}
        />
    </div>
}
const mapStateToProps = (state:AppStateType):MapStateToPropsType => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})
export default connect(mapStateToProps, {login})(Login)
