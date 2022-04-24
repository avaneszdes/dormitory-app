import {GetDebtsById} from "../../Redux/action";
import {call, put, takeEvery} from "redux-saga/effects";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import {
    GET_DEBTS_BY_ID,
    GET_DEBTS_BY_ID_SUCCEED,
    LOADING_END_SUCCEED, LOADING_START_SUCCEED
} from "../../Redux/constants";
import httpRequest from "../httpConfig";
import constants from '../../Constants/Constants'
import {Alert} from "../Utils/SetAlert";
import {getErrorInformation} from "../../Components/Global";

function* getStudentDeptByIdWorker(action: GetDebtsById) {

    yield put({type: LOADING_START_SUCCEED, payload: true})

    const request: AxiosRequestConfig = {
        method: 'GET',
        url: `${constants.host}${constants.getStudentDebtsById}${action.payload}`
    }

    try {
        const response:AxiosResponse = yield call(() => httpRequest(request));
        yield put({type: GET_DEBTS_BY_ID_SUCCEED, payload: response.data})

    }catch (err) {
        yield Alert(err.response?.data.errorMessage ?? getErrorInformation(err)  ?? 'Error', 3000, false)
    }

    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* getStudentDeptByIdWatcher() {
    yield takeEvery(GET_DEBTS_BY_ID, getStudentDeptByIdWorker)
}
