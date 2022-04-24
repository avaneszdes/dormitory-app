import {AxiosRequestConfig, AxiosResponse} from "axios";
import {call, put, takeEvery} from "redux-saga/effects";
import httpRequest from "../httpConfig";
import {
    ADD_STUDENT_TO_ROOM, ADD_STUDENT_TO_ROOM_SUCCEED, LOADING_END_SUCCEED, LOADING_START_SUCCEED
} from "../../Redux/constants";
import host from '../../Constants/Constants'
import {AddStudentToRoom} from "../../Redux/action";
import {Alert} from "../Utils/SetAlert";
import {getErrorInformation} from "../../Components/Global";


function* addStudentToRoomWorker(action: AddStudentToRoom) {

    yield put({type: LOADING_START_SUCCEED, payload: true})

    const httpConfig: AxiosRequestConfig = {
        method: 'POST',
        url: `${host.host}dormitory-service/v1/occupancies`,
        data: action.payload
    }

    try {
        const response: AxiosResponse = yield call(() => httpRequest(httpConfig));
        yield put({type: ADD_STUDENT_TO_ROOM_SUCCEED, payload: {dormitoryId: response.data.dormitoryId, roomId: response.data.roomId}})
        yield Alert("Student successful have been added", 3000, true)

    }catch (err) {
        yield Alert(err.response?.data.errorMessage ?? getErrorInformation(err)  ?? 'Error', 3000, false)
    }
    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* addStudentToRoomWatcher() {
    yield takeEvery(ADD_STUDENT_TO_ROOM, addStudentToRoomWorker)
}
