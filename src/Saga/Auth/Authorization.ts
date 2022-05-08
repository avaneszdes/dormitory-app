import {AuthorizationAction} from "../../Redux/action";
import {call, put, takeEvery} from "redux-saga/effects";
import {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";
import {
    AUTHORIZATION,
    AUTHORIZATION_SUCCEED, LOADING_END_SUCCEED, LOADING_START_SUCCEED, SET_ALERT_MESSAGE_SUCCEED
} from "../../Redux/constants";
import httpRequest from "../httpConfig";
import jwt_decode, {JwtPayload} from "jwt-decode";
import history from '../../Components/history'
import constants from '../../Constants/Constants'
import {Alert} from "../Utils/SetAlert";
import {getErrorInformation} from "../../Components/Global";

export interface ResponseJwt extends JwtPayload {
    login: string,
    role: string
    id: number
    exp: number
}

function* authorizationWorker(action: AuthorizationAction) {
    yield put({type: LOADING_START_SUCCEED, payload: true})

    const getTokenHttpConfig: AxiosRequestConfig = {
        method: 'POST',
        url: `${constants.host}${constants.authorize}`,
        data: action.payload
    }
    yield put({type: SET_ALERT_MESSAGE_SUCCEED, payload: { message:  "", type: false}})

    try {
        const response: AxiosResponse = yield call(() => httpRequest(getTokenHttpConfig));
        const profile: ResponseJwt = jwt_decode(response.data.token)
        localStorage.setItem('token', response.data.token)

        yield put({
            type: AUTHORIZATION_SUCCEED, payload: {
                token: response.data.token,
                role: profile.role,
                login: profile.login,
                photo: '',
                id: profile.id,
                exp: profile.exp
            }
        })

        history.push("/")

    } catch (err) {
        const er = err as AxiosError
        const status = er?.response?.status ?? 0

        if (status >= 500 || er?.message === 'Network Error'){
            history.push("/error-page")
        }
        yield Alert(err.response?.data.errorMessage ?? getErrorInformation(err)  ?? 'Error', 3000, false)
    }

    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* watchAuthorization() {
    yield takeEvery(AUTHORIZATION, authorizationWorker)
}
