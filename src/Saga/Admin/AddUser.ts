import {AxiosRequestConfig} from "axios";
import {call, put, takeEvery} from "redux-saga/effects";
import httpRequest from "../httpConfig";
import {ADD_USER, LOADING_END_SUCCEED, LOADING_START_SUCCEED} from "../../Redux/constants";
import host from '../../Constants/Constants'
import {Alert} from "../Utils/SetAlert";
import {AddUserAction} from "../../Redux/action";
import {getErrorInformation} from "../../Components/Global";

function* addUserWorker(action: AddUserAction) {

    yield put({type: LOADING_START_SUCCEED, payload: true})

    const httpConfig: AxiosRequestConfig = {
        method: 'POST',
        url: `${host.host}${host.registerUser}${action.payload.role}`,
        data: action.payload.user
    }

    try {
        yield call(() => httpRequest(httpConfig));
        yield Alert("User successfully have been registered", 3000, true)

    } catch (err) {
        yield Alert(err.response?.data.errorMessage ?? getErrorInformation(err)  ?? 'Error', 3000, false)
    }
    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* addUserWatcher() {
    yield takeEvery(ADD_USER, addUserWorker)
}
