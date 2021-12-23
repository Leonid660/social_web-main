import {instance, ResultCodesEnum, ResultCodesForCaptcha} from "./api";

type MeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    message: Array<string>
}
type LoginResponseType = {
    data: {
        userId: number
    }
    resultCode: ResultCodesEnum | ResultCodesForCaptcha
    messages: Array<string>
}
export const authAPI = {
    me() {
        return instance.get<MeResponseType>(`auth/me`)
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginResponseType>(`auth/login`, {email, password, rememberMe, captcha})
    },
    logout() {
        return instance.delete(`auth/login`)
    },
}