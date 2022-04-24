import {takeEvery} from "redux-saga/effects";
import {
    LOG_OUT,
} from "../../Redux/constants";
import history from '../../Components/history'

function* logOutWorker() {
  yield history.push('/')
}

export function* logOutWorkerWatcher() {
    yield takeEvery(LOG_OUT, logOutWorker)
}
