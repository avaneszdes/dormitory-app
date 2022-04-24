import {call, put, takeEvery} from "redux-saga/effects";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import {
    ADD_DORMITORY,
    ADD_DORMITORY_SUCCEED, LOADING_END_SUCCEED, LOADING_START_SUCCEED,
} from "../../Redux/constants";
import httpRequest from "../httpConfig";
import constants from '../../Constants/Constants'
import {AddDormitory} from "../../Redux/action";
import {Alert} from "../Utils/SetAlert";
import {getErrorInformation} from "../../Components/Global";

function* addDormitoryWorker(action: AddDormitory) {

    yield put({type: LOADING_START_SUCCEED, payload: true})
    const request: AxiosRequestConfig = {
        method: 'POST',
        url: `${constants.host}${constants.addDormitory}`,
        data:  action.payload
    }

    try {
        const response: AxiosResponse = yield call(() => httpRequest(request));
        yield put({type: ADD_DORMITORY_SUCCEED, payload:  response.data})
        yield Alert("Dormitory successfully added", 3000, true)

    } catch (err) {
        yield Alert(err.response?.data.errorMessage ?? getErrorInformation(err)  ?? 'Error', 3000, false)
    }
    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* addDormitoryWatcher() {
    yield takeEvery(ADD_DORMITORY, addDormitoryWorker)
}
