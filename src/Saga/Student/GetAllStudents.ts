import {call, put, takeLatest} from "redux-saga/effects";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import {
    GET_ALL_STUDENTS, GET_ALL_STUDENTS_SUCCEED, LOADING_END_SUCCEED, LOADING_START_SUCCEED,
} from "../../Redux/constants";
import httpRequest from "../httpConfig";
import constants from '../../Constants/Constants'
import {Alert} from "../Utils/SetAlert";
import {getErrorInformation} from "../../Components/Global";

function* getAllStudentsWorker() {

    yield put({type: LOADING_START_SUCCEED, payload: true})

    const request: AxiosRequestConfig = {
        method: 'GET',
        url: `${constants.host}${constants.getAllUsers}`
    }

    try {
        const response: AxiosResponse = yield call(() => httpRequest(request));
        yield put({type: GET_ALL_STUDENTS_SUCCEED, payload: response.data})

    } catch (err) {
        yield Alert(err.response?.data.errorMessage ?? getErrorInformation(err)  ?? 'Error', 3000, false)
    }

    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* getAllStudentsWatcher() {
    yield takeLatest(GET_ALL_STUDENTS, getAllStudentsWorker)
}
