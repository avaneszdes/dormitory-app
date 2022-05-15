import {call, put, takeEvery} from "redux-saga/effects";
import {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";
import {
    GET_ALL_DORMITORIES,
    GET_ALL_DORMITORIES_SUCCEED,
    LOADING_END_SUCCEED,
    LOADING_START_SUCCEED
} from "../../Redux/constants";
import httpRequest from "../httpConfig";
import constants from '../../Constants/Constants'
import {Alert} from "../Utils/SetAlert";
import {GetAllDormitories} from "../../Redux/action";
import history from "../../Components/history";
import {getErrorInformation} from "../../Components/Global";

function* getAllDormitoriesWorker(action: GetAllDormitories) {

    yield put({type: LOADING_START_SUCCEED, payload: true})

    const request: AxiosRequestConfig = {
        method: 'GET',
        url: `${constants.host}${constants.getAllDormitories}?pagesToSkip=${action.payload.skip}&pagesToShow=${action.payload.top}`
    }

    try {
        const response: AxiosResponse = yield call(() => httpRequest(request))
        console.log('get', response.data)

        yield put({type: GET_ALL_DORMITORIES_SUCCEED, payload: response.data})
    }catch (err) {
        const er = err as AxiosError
        const status = er?.response?.status ?? 0
        if (status >= 500){
            history.push("/error-page")
        }
        yield Alert(err.response?.data.errorMessage ?? getErrorInformation(err)  ?? 'Error', 3000, false)
    }
    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* watchGetAllDormitoriesWatcher() {
    yield takeEvery(GET_ALL_DORMITORIES, getAllDormitoriesWorker)
}
