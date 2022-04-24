import {GetStudentProfileById} from "../../Redux/action";
import {call, put, takeEvery} from "redux-saga/effects";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import {
    GET_STUDENT_PROFILE_BY_ID,
    GET_STUDENT_PROFILE_BY_ID_SUCCEED, LOADING_END_SUCCEED, LOADING_START_SUCCEED
} from "../../Redux/constants";
import httpRequest from "../httpConfig";
import constants from '../../Constants/Constants'
import history from "../../Components/history";
import {Alert} from "../Utils/SetAlert";
import {getErrorInformation} from "../../Components/Global";

function* getStudentProfileByIdWorker(action: GetStudentProfileById) {

    yield put({type: LOADING_START_SUCCEED, payload: true})

    const request: AxiosRequestConfig = {
        method: 'GET',
        url: `${constants.host}${constants.studentProfileById}${action.payload}`
    }

    try {
        const response:AxiosResponse = yield call(() => httpRequest(request));
        yield put({type: GET_STUDENT_PROFILE_BY_ID_SUCCEED, payload: response.data})

    }catch (err) {
        yield Alert(err.response?.data.errorMessage ?? getErrorInformation(err)  ?? 'Error', 3000, false)
        history.push('/authorization')
    }

    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* getStudentProfileByIdWatcher() {
    yield takeEvery(GET_STUDENT_PROFILE_BY_ID, getStudentProfileByIdWorker)
}
