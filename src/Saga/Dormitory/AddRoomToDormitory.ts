import {call, put, takeEvery} from "redux-saga/effects";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import {
    ADD_ROOM_TO_DORMITORY, ADD_ROOM_TO_DORMITORY_SUCCEED, LOADING_END_SUCCEED, LOADING_START_SUCCEED,
} from "../../Redux/constants";
import httpRequest from "../httpConfig";
import constants from '../../Constants/Constants'
import {AddRoomToDormitory} from "../../Redux/action";
import {Alert} from "../Utils/SetAlert";
import {getErrorInformation} from "../../Components/Global";

function* addRoomToDormitoryWorker(action: AddRoomToDormitory) {

    yield put({type: LOADING_START_SUCCEED, payload: true})
    const request: AxiosRequestConfig = {
        method: 'PUT',
        url: `${constants.host}${constants.addRoomToDormitory}${action.payload.id}`,
        data:  {
            number: action.payload.number,
            floor: action.payload.floor,
            capacity: action.payload.capacity,
            price: action.payload.price,
            status: action.payload.status
        }
    }

    try {
        const response: AxiosResponse = yield call(() => httpRequest(request))
        yield put({type: ADD_ROOM_TO_DORMITORY_SUCCEED, payload: {room: response.data, dormitoryId: action.payload.id}})
        yield Alert("Room successfully added", 3000, true)

    } catch (err) {
        yield Alert(err.response?.data.errorMessage ?? getErrorInformation(err)  ?? 'Error', 3000, false)
    }
    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* addRoomToDormitoryWatcher() {
    yield takeEvery(ADD_ROOM_TO_DORMITORY, addRoomToDormitoryWorker)
}
