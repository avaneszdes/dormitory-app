import {SendComment} from "../../Redux/action";
import {call, put, takeLatest} from "redux-saga/effects";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import {
    LOADING_END_SUCCEED, LOADING_START_SUCCEED,
    SEND_COMMENT, SEND_COMMENT_SUCCEED
} from "../../Redux/constants";
import httpRequest from "../httpConfig";
import constants from '../../Constants/Constants'
import {Alert} from "../Utils/SetAlert";
import {IPaymentInterface} from "../../Interfaces";
import {getErrorInformation} from "../../Components/Global";

function* approveOrDeclineWorker(action: SendComment) {

    yield put({type: LOADING_START_SUCCEED, payload: true})

    const url = action.payload.commentType ? constants.approvePayment : constants.declinePayment

    const paymentDto: IPaymentInterface={
        id: action.payload.id,
        userId: 0,
        amount: 0,
        date: new Date(),
        status: action.payload.commentType? "APPROVED": 'DECLINED',
        receipt: '',
        comment: action.payload.comment
    }
    const request: AxiosRequestConfig = {
        method: 'PATCH',
        url: `${constants.host}${url}${action.payload.id}`,
        data: paymentDto
    }

    try {
        const response: AxiosResponse = yield call(() => httpRequest(request));
        yield put({type: SEND_COMMENT_SUCCEED, payload: response.data})
        yield Alert("Payment`s status successfully uploaded", 3000, true)

    } catch (err) {
        yield Alert(err.response?.data.errorMessage ?? getErrorInformation(err)  ?? 'Error', 3000, false)
    }

    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* approveOrDeclineWatcher() {
    yield takeLatest(SEND_COMMENT, approveOrDeclineWorker)
}
