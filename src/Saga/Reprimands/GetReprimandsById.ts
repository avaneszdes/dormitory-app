import {call, put, takeEvery} from "redux-saga/effects";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import {
    GET_REPRIMANDS_BY_USER_ID,
    GET_REPRIMANDS_BY_USER_ID_SUCCEED,
    LOADING_END_SUCCEED,
    LOADING_START_SUCCEED
} from "../../Redux/constants";
import httpRequest from "../httpConfig";
import constants from '../../Constants/Constants'
import {Alert} from "../Utils/SetAlert";
import {GetReprimandsById} from "../../Redux/action";
import {getErrorInformation} from "../../Components/Global";

function* getReprimandsByIdWorker(action: GetReprimandsById) {

    yield put({type: LOADING_START_SUCCEED, payload: true})

    const request: AxiosRequestConfig = {
        method: 'GET',
        url: `${constants.host}${constants.getReprimandsById}${action.payload}`
    }

    try {
        const response: AxiosResponse = yield call(() => httpRequest(request));
        yield put({type: GET_REPRIMANDS_BY_USER_ID_SUCCEED, payload: response.data})

    }catch (err) {
        yield Alert(err.response?.data.errorMessage ?? getErrorInformation(err)  ?? 'Error', 3000, false)
    }
    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* getReprimandsByIdWatcher() {
    yield takeEvery(GET_REPRIMANDS_BY_USER_ID, getReprimandsByIdWorker)
}
