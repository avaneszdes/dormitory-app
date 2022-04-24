import {UploadReceipt} from "../../Redux/action";
import {call, put, takeLatest} from "redux-saga/effects";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import {
    LOADING_END_SUCCEED,
    LOADING_START_SUCCEED,
    UPLOAD_RECEIPT, UPLOAD_RECEIPT_SUCCEED
} from "../../Redux/constants";
import httpRequest from "../httpConfig";
import constants from '../../Constants/Constants'
import {Alert} from "../Utils/SetAlert";
import {getErrorInformation} from "../../Components/Global";

function* uploadReceiptWorker(action: UploadReceipt) {

    yield put({type: LOADING_START_SUCCEED, payload: true})

    const request: AxiosRequestConfig = {
        method: 'PATCH',
        url: `${constants.host}${constants.uploadReceipt}${action.payload.id}`,
        data: action.payload
    }

    try {
        const response: AxiosResponse = yield call(() => httpRequest(request));
        yield put({type: UPLOAD_RECEIPT_SUCCEED, payload: response.data})
        yield Alert("Receipt successfully uploaded", 3000, true)

    } catch (err) {
        yield Alert(err.response?.data.errorMessage ?? getErrorInformation(err)  ?? 'Error', 3000, false)
    }

    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* uploadReceiptWatcher() {
    yield takeLatest(UPLOAD_RECEIPT, uploadReceiptWorker)
}
