import {AxiosRequestConfig, AxiosResponse} from "axios";
import {call, put, takeEvery} from "redux-saga/effects";
import httpRequest from "../httpConfig";
import {DELETE_STUDENT_FROM_ROOM, LOADING_END_SUCCEED, LOADING_START_SUCCEED,} from "../../Redux/constants";
import host from '../../Constants/Constants'
import constants from '../../Constants/Constants'
import {DeleteStudentFromRoom} from "../../Redux/action";
import {Alert} from "../Utils/SetAlert";
import {getErrorInformation} from "../../Components/Global";


function* deleteStudentFromRoomWorker(action: DeleteStudentFromRoom) {

    yield put({type: LOADING_START_SUCCEED, payload: true})

    try {

        const studentByLoginRequest: AxiosRequestConfig = {
            method: 'GET',
            url: `${constants.host}${constants.studentProfileByLogin}${action.payload.userLogin}`
        }
        const student: AxiosResponse = yield call(() => httpRequest(studentByLoginRequest));

        console.log(student.data)
        const deleteStudentFromRoomRequest: AxiosRequestConfig = {
            method: 'PUT',
            url: `${host.host}${host.deleteStudentFromRoom}${student.data.id}`,
        }

        const response: AxiosResponse = yield call(() => httpRequest(deleteStudentFromRoomRequest));

        console.log(response)
        if (response.status === 200){
            yield put({type: DELETE_STUDENT_FROM_ROOM, payload: {dormitoryId: action.payload.dormitoryId, roomId: action.payload.roomId}})
            yield Alert("Student successful have been deleted", 3000, true)
        }

    } catch (err) {
        yield Alert(err.response?.data.errorMessage ?? getErrorInformation(err)  ?? 'Error', 3000, false)
    }
    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* deleteStudentFromRoomWatcher() {
    yield takeEvery(DELETE_STUDENT_FROM_ROOM, deleteStudentFromRoomWorker)
}
