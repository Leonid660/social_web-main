import {getAuthUserData} from "./authReducer";
import {InferActionsTypes} from "./redux-store";

let initialState = {
    initialize:false
}
export type initialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

const appReducer = (state = initialState, action:ActionsType):initialStateType => {
    switch (action.type) {
        case 'SN/APP/INITIALIZED_SUCCESS':
            return {
                ...state,
                initialize:true
            }
        default:
            return state
    }
}

export const actions = {
    initializedSuccess: () => ({type: 'SN/APP/INITIALIZED_SUCCESS'}as const)
}


export const initializeApp = () => (dispatch:any) => {
    let promise = dispatch(getAuthUserData())

    Promise.all([promise])
    .then(() => {
        dispatch(actions.initializedSuccess())
    })
}

export default appReducer