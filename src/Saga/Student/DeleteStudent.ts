import {call, put, takeEvery} from "redux-saga/effects";
import {AxiosRequestConfig} from "axios";
import {
    DELETE_STUDENT, LOADING_END_SUCCEED, LOADING_START_SUCCEED,
} from "../../Redux/constants";
import httpRequest from "../httpConfig";
import constants from '../../Constants/Constants'
import {DeleteStudent} from "../../Redux/action";
import {Alert} from "../Utils/SetAlert";
import {getErrorInformation} from "../../Components/Global";

function* deleteStudentWorker(action: DeleteStudent) {

    yield put({type: LOADING_START_SUCCEED, payload: true})
    const request: AxiosRequestConfig = {
        method: 'DELETE',
        url: `${constants.host}${constants.deleteStudent}${action.payload}`,
    }

    try {
        yield call(() => httpRequest(request));
        yield Alert("Student successfully deleted", 3000, true)

    } catch (err) {
        yield Alert(err.response?.data.errorMessage ?? getErrorInformation(err)  ?? 'Error', 3000, false)
    }
    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* deleteStudentWatcher() {
    yield takeEvery(DELETE_STUDENT, deleteStudentWorker)
}
