import {call, put, takeEvery} from "redux-saga/effects";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import {
    EDIT_USER, EDIT_USER_SUCCEED, LOADING_END_SUCCEED, LOADING_START_SUCCEED
} from "../../Redux/constants";
import httpRequest from "../httpConfig";
import constants from '../../Constants/Constants'
import {EditUser} from "../../Redux/action";
import {Alert} from "../Utils/SetAlert";
import {getErrorInformation} from "../../Components/Global";

function* updateProfileWorker(action: EditUser) {

    yield put({type: LOADING_START_SUCCEED, payload: true})
    const request: AxiosRequestConfig = {
        method: 'PUT',
        url: `${constants.host}${constants.updateStudentProfile}${action.payload.id}`,
        data: action.payload
    }

    try {

        const response: AxiosResponse = yield call(() => httpRequest(request));
        yield put({type: EDIT_USER_SUCCEED, payload: response.data})
        yield Alert("Data successfully updated", 3000, true)

    }catch (err) {
        yield Alert(err.response?.data.errorMessage ?? getErrorInformation(err)  ?? 'Error', 3000, false)
    }

    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* updateStudentProfileWatcher() {
    yield takeEvery(EDIT_USER, updateProfileWorker)
}
