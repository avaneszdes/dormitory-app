import {call, put, takeLatest} from "redux-saga/effects";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import {
    GET_STUDENTS_BY_FILTER, GET_STUDENTS_BY_FILTER_SUCCEED,
    LOADING_END_SUCCEED, LOADING_START_SUCCEED,
} from "../../Redux/constants";
import httpRequest from "../httpConfig";
import constants from '../../Constants/Constants'
import {Alert} from "../Utils/SetAlert";
import {GetStudentsByDormitory} from "../../Redux/action";
import {getErrorInformation} from "../../Components/Global";

function* getStudentsByFilterWorker(action: GetStudentsByDormitory) {

    yield put({type: LOADING_START_SUCCEED, payload: true})


    const filterArr = Object.entries(action.payload)

    let param = ''

    filterArr.map((x, index) => {
        if(x[1] && param[0] !== '?'){
            param = `?${x[0]}Sort=${filterArr[index][1]}`
        }
        else if(x[1]){
            param += `&${x[0]}Sort=${filterArr[index][1]}`
        }
    })

    const request: AxiosRequestConfig = {
        method: 'GET',
        url: `${constants.host}${constants.getAllUsers}${param}`
    }

    try {
        const response: AxiosResponse = yield call(() => httpRequest(request));
        yield put({type: GET_STUDENTS_BY_FILTER_SUCCEED, payload: response.data})

    } catch (err) {
        yield Alert(err.response?.data.errorMessage ?? getErrorInformation(err)  ?? 'Error', 3000, false)
    }

    yield put({type: LOADING_END_SUCCEED, payload: false})
}

export function* getStudentsByFilterWatcher() {
    yield takeLatest(GET_STUDENTS_BY_FILTER, getStudentsByFilterWorker)
}
