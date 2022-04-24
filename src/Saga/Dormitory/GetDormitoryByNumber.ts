import {call, put, takeEvery} from "redux-saga/effects";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import {
    GET_DORMITORY_BY_NUMBER, GET_DORMITORY_BY_NUMBER_SUCCEED,
    LOADING_END_SUCCEED,
    LOADING_START_SUCCEED
} from "../../Redux/constants";
import httpRequest from "../httpConfig";
import constants from '../../Constants/Constants'
import {Alert} from "../Utils/SetAlert";
import {GetDormitoryByNumber} from "../../Redux/action";
import {getErrorInformation} from "../../Components/Global";

function* getDormitoryByNumberWorker(action: GetDormitoryByNumber) {

    yield put({type: LOADING_START_SUCCEED, payload: true})

    const request: AxiosRequestConfig = {
        method: 'GET',
        url: `${constants.host}${constants.getDormitoryByNumber}${action.payload}`
    }

    try {
        const response: AxiosResponse = yield call(() => httpRequest(request));
        yield put({type: GET_DORMITORY_BY_NUMBER_SUCCEED, payload: response.data})
        yield Alert("Dormitory successfully received", 3000, true)

    }catch (err) {
        yield Alert(err.response?.data.errorMessage ?? getErrorInformation(err)  ?? 'Error', 3000, false)
    }
    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* getDormitoryByNumberWatcher() {
    yield takeEvery(GET_DORMITORY_BY_NUMBER, getDormitoryByNumberWorker)
}
