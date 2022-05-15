import {call, put, takeEvery} from "redux-saga/effects";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import {
    LOADING_END_SUCCEED,
    LOADING_START_SUCCEED,
    UPDATE_DORMITORY, UPDATE_DORMITORY_SUCCEED
} from "../../Redux/constants";
import httpRequest from "../httpConfig";
import constants from '../../Constants/Constants'
import {UpdateDormitory} from "../../Redux/action";
import {Alert} from "../Utils/SetAlert";
import {getErrorInformation} from "../../Components/Global";

function* updateDormitoryWorker(action: UpdateDormitory) {

    yield put({type: LOADING_START_SUCCEED, payload: true})

    const request: AxiosRequestConfig = {
        method: 'PUT',
        url: `${constants.host}${constants.updateDormitory}`,
        data: action.payload
    }
    try {
        const response: AxiosResponse = yield call(() => httpRequest(request))

        yield put({type: UPDATE_DORMITORY_SUCCEED, payload: response.data})
        yield Alert("Dormitory successfully updated", 3000, true)

    }catch (err) {
        yield Alert(err.response?.data.errorMessage ?? getErrorInformation(err)  ?? 'Error', 3000, false)
    }

    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* updateDormitoryWatcher() {
    yield takeEvery(UPDATE_DORMITORY, updateDormitoryWorker)
}
