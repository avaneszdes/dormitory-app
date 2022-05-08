import {CLEAR_OCCUPANCY_SUCCEED, GET_ALL_OCCUPANCIES_SUCCEED, GET_OCCUPANCY_DATA_BY_LOGIN_SUCCEED,} from "./constants";
import {DormitoryActionTypes} from "./action";
import {IOccupancyState} from "../Interfaces";

const initialState: IOccupancyState = {
    occupancy: null,
    occupancies: []
}

const occupancy = (state = initialState, action: DormitoryActionTypes) => {

    switch (action.type) {

        case GET_OCCUPANCY_DATA_BY_LOGIN_SUCCEED:
            return {...state, occupancy: action.payload}

        case CLEAR_OCCUPANCY_SUCCEED:
            return {...state, occupancy: null}

        case GET_ALL_OCCUPANCIES_SUCCEED:
            return {...state, occupancies: action.payload}

        default:
            return state
    }
}
export default occupancy



