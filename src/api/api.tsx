import axios from "axios";


export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "ce02fdc3-f220-462d-8381-68f1127f7d72"
    }
})

export enum ResultCodesEnum {
    Success = 0,
    Error
}

export enum ResultCodesForCaptcha {
    CaptchaIsRequired = 10
}

