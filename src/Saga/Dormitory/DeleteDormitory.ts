import {call, put, takeEvery} from "redux-saga/effects";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import {
    DELETE_DORMITORY,
    DELETE_DORMITORY_SUCCEED, LOADING_END_SUCCEED, LOADING_START_SUCCEED,

} from "../../Redux/constants";
import httpRequest from "../httpConfig";
import constants from '../../Constants/Constants'
import {DeleteDormitory} from "../../Redux/action";
import {Alert} from "../Utils/SetAlert";
import {getErrorInformation} from "../../Components/Global";

function* deleteDormitoryWorker(action: DeleteDormitory) {

    yield put({type: LOADING_START_SUCCEED, payload: true})
    const request: AxiosRequestConfig = {
        method: 'DELETE',
        url: `${constants.host}${constants.deleteDormitory}${action.payload}`,
    }

    try {
        const response: AxiosResponse = yield call(() => httpRequest(request))
        if(response.status === 200){
            yield put({type: DELETE_DORMITORY_SUCCEED, payload: action.payload})
            yield Alert("Dormitory successfully deleted", 3000, true)
        }
    } catch (err) {
        yield Alert(err.response?.data.errorMessage ?? getErrorInformation(err)  ?? 'Error', 3000, false)
    }
    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* deleteDormitoryWatcher() {
    yield takeEvery(DELETE_DORMITORY, deleteDormitoryWorker)
}
