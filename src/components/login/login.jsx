import React from 'react'
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/formsControls/formsControls";
import {required} from "../../utils/validators/validators";

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Login"}
                       name={"login"}
                       validate={[required]}
                       component={Input}/>
            </div>
            <div>
                <Field placeholder={"Password"}
                       validate={[required]}
                       name={"password"}
                       component={Input}/>
            </div>
            <div>
                <Field component={Input}
                       name={"rememberMe"}
                       type={"checkbox"}/>Remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm ({form:'login'})(LoginForm)

const Login = (props) => {
    const onSubmit = (fromData) => {
    }
    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}
export default Login
