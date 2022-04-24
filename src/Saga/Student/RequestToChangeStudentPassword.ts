import {AxiosRequestConfig} from "axios";
import {call, put, select, takeEvery} from "redux-saga/effects";
import httpRequest from "../httpConfig";
import {
    LOADING_END_SUCCEED,
    LOADING_START_SUCCEED,
    SEND_REQUEST_TO_CHANGE_USER_PASSWORD
} from "../../Redux/constants";
import host from '../../Constants/Constants'
import {IRootState} from "../../Redux/configureStore";
import {IAuthInterface} from "../../Interfaces";
import {Alert} from "../Utils/SetAlert";
import {getErrorInformation} from "../../Components/Global";

function* sendRequestToChangePasswordWorker() {

    yield put({type: LOADING_START_SUCCEED, payload: true})
    const user: IAuthInterface = yield select((x: IRootState) => x.auth);
    const httpConfig: AxiosRequestConfig = {
        method: 'GET',
        url: `${host.host}${host.requestToChangePassword}${user.id}`,
    }

    try {
        yield call(() => httpRequest(httpConfig));
        yield Alert("Request successfully have been sent, please check your mail ", 3000, true)
    }catch (err) {
        yield Alert(err.response?.data.errorMessage ?? getErrorInformation(err)  ?? 'Error', 3000, false)
    }
    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* sendRequestToChangePasswordEmailWatcher() {
    yield takeEvery(SEND_REQUEST_TO_CHANGE_USER_PASSWORD, sendRequestToChangePasswordWorker)
}
