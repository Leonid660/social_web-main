import * as axios from "axios";


const instance =  axios.create({
    withCredentials:true,
    baseURL:'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "ce02fdc3-f220-462d-8381-68f1127f7d72"
    }
})

export const usersAPI = {
    getUsers(currentPage =1 ,pageSize=10){
        return instance.get(baseUrl + `users?page=${currentPage}&count=${pageSize}`)
            .then(response=>{
                return response.data})}
}



export const getUsers2 = (currentPage =1 ,pageSize=10) => {
    return instance.get(baseUrl+`follow?page=${currentPage}&count=${pageSize}`)
        .then(response=>{
            return response.data})
}