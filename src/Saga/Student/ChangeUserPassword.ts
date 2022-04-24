import {AxiosRequestConfig, AxiosResponse} from "axios";
import {call, put, takeEvery} from "redux-saga/effects";
import httpRequest from "../httpConfig";
import {CHANGE_USER_PASSWORD, LOADING_END_SUCCEED, LOADING_START_SUCCEED, LOG_OUT} from "../../Redux/constants";
import {ChangeUserPassword} from "../../Redux/action";
import history from "../../Components/history";
import constants from '../../Constants/Constants'
import {Alert} from "../Utils/SetAlert";
import {getErrorInformation} from "../../Components/Global";

function* changeUserPasswordWorker(action: ChangeUserPassword) {

    yield put({type: LOADING_START_SUCCEED, payload: true})


    const httpConfig: AxiosRequestConfig = {
        method: 'POST',
        url: `${constants.host}${constants.changePassword}?guid=${action.payload.guid}`,
        data: {
            'oldPassword' : action.payload.oldPassword,
            'newPassword': action.payload.newPassword,
            'newVerifiedPassword': action.payload.verifiedPassword
        }
    }
    try {
        const response: AxiosResponse = yield call(() => httpRequest(httpConfig));
        if(response.status === 200){
            yield Alert("Data successfully updated", 3000, true)

            yield put({type: LOG_OUT, payload: ''})
            history.push("/")
        }

    }catch (err) {
        yield Alert(err.response?.data.errorMessage ?? getErrorInformation(err)  ?? 'Error', 3000, false)
    }

    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* changeUserPasswordWatcher() {
    yield takeEvery(CHANGE_USER_PASSWORD, changeUserPasswordWorker)
}
