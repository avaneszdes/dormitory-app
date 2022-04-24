import {IAuthInterface} from "../Interfaces";
import jwt_decode from "jwt-decode";
import {AUTHORIZATION_SUCCEED, LOG_OUT, SEND_REQUEST_TO_CHANGE_USER_PASSWORD} from "./constants";
import {DormitoryActionTypes} from "./action";
import {ResponseJwt} from "../Saga/Auth/Authorization";

const getAuthState = (): { role: string; photo: string; id: number; login: string | null; token: string , exp: number} => {

    const token = localStorage.getItem('token')!
    let role = ''
    let login: string | null = ''
    let photo = ''
    let id= 0
    let exp =  0

    if(token){
        const profile : ResponseJwt = jwt_decode(token)

        if (token && profile.exp !== undefined) {
            role = profile.role || ''
            login = profile.login || null
            photo = photo || ""
            id = profile.id
            exp = profile.exp
        }
    }

    return {
        token,
        role : role,
        login: login,
        photo,
        id,
        exp,
    }

}

const initialState: IAuthInterface = getAuthState();

const auth = (state = initialState, action: DormitoryActionTypes) => {

    switch (action.type) {

        case AUTHORIZATION_SUCCEED:
            return {
                token: action.payload.token,
                role: action.payload.role,
                login: action.payload.login,
                id: action.payload.id,
                photo: action.payload.photo,
                exp: action.payload.exp
            }

        case LOG_OUT:
            return {token: action.payload, role: action.payload, name: action.payload}

        case SEND_REQUEST_TO_CHANGE_USER_PASSWORD:
            return {...state, email: action.payload}

        default:
            return state
    }
}

export default auth
