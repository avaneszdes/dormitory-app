import {
    CLEAR_ALERT_MESSAGE_SUCCEED,
    LOADING_END_SUCCEED,
    LOADING_START_SUCCEED,
    SET_ALERT_MESSAGE_SUCCEED
} from "./constants";
import {DormitoryActionTypes} from "./action";
import {IAlertState} from "../Interfaces";

const initialState: IAlertState = {
    alert: {message: '', type: false},
    loading: true
}

const alert = (state = initialState, action: DormitoryActionTypes) => {

    switch (action.type) {

        case LOADING_START_SUCCEED:
            return {...state, loading: action.payload}

        case LOADING_END_SUCCEED:
            return {...state, loading: action.payload}

        case SET_ALERT_MESSAGE_SUCCEED:
            return {...state, alert: action.payload}

        case CLEAR_ALERT_MESSAGE_SUCCEED:
            return {...state, alert: action.payload}

        default:
            return state
    }
}
export default alert
