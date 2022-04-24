import {call, put, takeEvery} from "redux-saga/effects";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import {
    DELETE_REPRIMAND, DELETE_REPRIMAND_SUCCEED,
    LOADING_END_SUCCEED,
    LOADING_START_SUCCEED
} from "../../Redux/constants";
import httpRequest from "../httpConfig";
import constants from '../../Constants/Constants'
import {Alert} from "../Utils/SetAlert";
import {DeleteReprimand} from "../../Redux/action";
import {getErrorInformation} from "../../Components/Global";

function* deleteReprimandByIdWorker(action: DeleteReprimand) {

    yield put({type: LOADING_START_SUCCEED, payload: true})

    const request: AxiosRequestConfig = {
        method: 'DELETE',
        url: `${constants.host}${constants.deleteReprimandById}${action.payload}`
    }

    try {
        const response: AxiosResponse = yield call(() => httpRequest(request))
        if (response.status === 200){
            yield put({type: DELETE_REPRIMAND_SUCCEED, payload: action.payload})
        }

    }catch (err) {
        yield Alert(err.response?.data.errorMessage ?? getErrorInformation(err)  ?? 'Error', 3000, false)
    }
    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* deleteReprimandByIdWatcher() {
    yield takeEvery(DELETE_REPRIMAND, deleteReprimandByIdWorker)
}
