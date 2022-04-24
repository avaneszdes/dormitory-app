import {call, put, takeEvery} from "redux-saga/effects";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import {CHANGE_PRICE, CHANGE_PRICE_SUCCEED, LOADING_END_SUCCEED, LOADING_START_SUCCEED} from "../../Redux/constants";
import httpRequest from "../httpConfig";
import constants from '../../Constants/Constants'
import {ChangePrice} from "../../Redux/action";
import {Alert} from "../Utils/SetAlert";
import {getErrorInformation} from "../../Components/Global";

function* changePriceWorker(action: ChangePrice) {

    yield put({type: LOADING_START_SUCCEED, payload: true})
    const request: AxiosRequestConfig = {
        method: 'PUT',
        url: `${constants.host}dormitory-service/v1/payments/${action.payload.paymentId}?newPrice=${action.payload.newPrice}`,
        data: action.payload
    }

    try {
        const response: AxiosResponse = yield call(() => httpRequest(request));
        yield put({type: CHANGE_PRICE_SUCCEED, payload:  response.data})
        yield Alert("Price was updated", 3000, true)

    } catch (err) {
        yield Alert(err.response?.data.errorMessage ?? getErrorInformation(err)  ?? 'Error', 3000, false)
    }
    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* changePriceWatcher() {
    yield takeEvery(CHANGE_PRICE, changePriceWorker)
}
