import {AxiosRequestConfig} from "axios";
import {call, put, takeEvery} from "redux-saga/effects";
import httpRequest from "../httpConfig";
import {
    LOADING_END_SUCCEED,
    LOADING_START_SUCCEED,
    SEND_MESSAGE_TO_MAIL
} from "../../Redux/constants";
import host from '../../Constants/Constants'
import {SendMessageToMail} from "../../Redux/action";
import {Alert} from "../Utils/SetAlert";
import {getErrorInformation} from "../../Components/Global";


function* sendMessageToMailWorker(action: SendMessageToMail) {

    yield put({type: LOADING_START_SUCCEED, payload: true})

    const httpConfig: AxiosRequestConfig = {
        method: 'POST',
        url: `${host.host}dormitory-service/v1/user/${action.payload.studentId}`,
        data: {subject: action.payload.subject, body: action.payload.body}
    }
    try {
        yield call(() => httpRequest(httpConfig));
        yield Alert("Message successfully has sent", 3000, true)

    }catch (err) {
        yield Alert(err.response?.data.errorMessage ?? getErrorInformation(err)  ?? 'Error', 3000, false)
    }
    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* sendMessageToMailWatcher() {
    yield takeEvery(SEND_MESSAGE_TO_MAIL, sendMessageToMailWorker)
}
