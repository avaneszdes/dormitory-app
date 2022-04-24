import {GetOccupancyDataByLogin} from "../../Redux/action";
import {call, put, takeLatest} from "redux-saga/effects";
import {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";
import {
    GET_OCCUPANCY_DATA_BY_LOGIN,
    GET_OCCUPANCY_DATA_BY_LOGIN_SUCCEED,
    LOADING_END_SUCCEED,
    LOADING_START_SUCCEED,
} from "../../Redux/constants";
import httpRequest from "../httpConfig";
import constants from '../../Constants/Constants'
import {Alert} from "../Utils/SetAlert";
import history from "../../Components/history";
import {getErrorInformation} from "../../Components/Global";
import {RoomInterface} from "../../Interfaces";

function* getOccupancyByLoginWorker(action: GetOccupancyDataByLogin) {

    yield put({type: LOADING_START_SUCCEED, payload: true})

    const getOccupancyRequest: AxiosRequestConfig = {
        method: 'GET',
        url: `${constants.host}${constants.getOccupancyDataByLogin}${action.payload}`
    }

    try {
        const occupancyResponse: AxiosResponse = yield call(() => httpRequest(getOccupancyRequest));

        const requestToGetDormitory: AxiosRequestConfig = {
            method: 'GET',
            url: `${constants.host}${constants.getDormitoryById}${occupancyResponse.data.dormitoryId}`
        }

        const dormitoryResponse: AxiosResponse = yield call(() => httpRequest(requestToGetDormitory))
        const roomNumber = dormitoryResponse.data.rooms.filter((x: RoomInterface) => x.id == occupancyResponse.data.roomId)[0]
        const occupancy = {
            id: occupancyResponse.data.id,
            userLogin: occupancyResponse.data.userLogin,
            room: roomNumber.number,
            dormitory: dormitoryResponse.data.number,
            checkInDate: occupancyResponse.data.checkInDate,
            checkOutDate: occupancyResponse.data?.checkOutDate,
            status: occupancyResponse.data.status,
            price: roomNumber.price
        }

        yield put({type: GET_OCCUPANCY_DATA_BY_LOGIN_SUCCEED, payload: occupancy})

    } catch (err) {
        yield Alert(err.response?.data.errorMessage ?? getErrorInformation(err)  ?? 'Error', 3000, false)
    }

    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* getOccupancyByLoginWatcher() {
    yield takeLatest(GET_OCCUPANCY_DATA_BY_LOGIN, getOccupancyByLoginWorker)
}
