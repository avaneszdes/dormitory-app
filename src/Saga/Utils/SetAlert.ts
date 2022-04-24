import { delay, put} from "redux-saga/effects";
import { SET_ALERT_MESSAGE_SUCCEED} from "../../Redux/constants";

export function* Alert(message: string, timer: number, isError: boolean) {

    yield put({type: SET_ALERT_MESSAGE_SUCCEED, payload: { message:  message, type: isError}})
    yield delay(timer);
    yield put({type: SET_ALERT_MESSAGE_SUCCEED, payload: { message:  '', type: isError}})
}
