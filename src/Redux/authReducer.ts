import {ResultCodesEnum, ResultCodesForCaptcha} from "../api/api";
import {stopSubmit} from "redux-form";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";


const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS'

export type initialStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl:string | null
}

let initialState: initialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl:null,// if null, then captcha isn't required
}

const authReducer = (state = initialState, action:any): initialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}

type SetAuthUserDataActionPayloadType = {
    userId:number| null
    email:string| null
    login:string| null
    isAuth:boolean
}
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload:SetAuthUserDataActionPayloadType

}

export const setAuthUserData = (userId:number | null, email:string| null, login: string| null, isAuth: boolean):SetAuthUserDataActionType => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
})
type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: { captchaUrl: string}

}

export const getCaptchaUrlSuccess = (captchaUrl: string):GetCaptchaUrlSuccessActionType => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl}
})

export const getAuthUserData = () => async (dispatch: any) => {
    let meData = await authAPI.me()

    if (meData.resultCode === ResultCodesEnum.Success) {
        let {id, email, login} = meData.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}

export const login = (email:string, password:string, rememberMe:boolean, captcha:string) => async (dispatch:any) => {

    let data = await authAPI.login(email, password, rememberMe, captcha)

    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData())
    } else {
        if (data.resultCode === ResultCodesForCaptcha.CaptchaIsRequired){
            dispatch(getCaptchaUrl())
        }
        let message = data.messages.length > 0
            ? data.messages[0] : "Some error"
        dispatch(stopSubmit("login", {_error: message}))
    }
}

export const getCaptchaUrl = () => async (dispatch:any) => {
    const data = await securityAPI.getCaptchaUrl()
    const captchaUrl = data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export const logout = () => async (dispatch:any) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export default authReducer