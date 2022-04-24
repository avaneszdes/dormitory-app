import {
    DELETE_USER,
    GET_USERS_SUCCEED
} from "./constants";
import {IStudentProfileInterface} from "../Interfaces";
import {DormitoryActionTypes} from "./action";

const initialState: IStudentProfileInterface[] = []

 const users = (state = initialState, action: DormitoryActionTypes) => {

    switch (action.type) {

        case GET_USERS_SUCCEED:
            return action.payload

        case DELETE_USER:
            return state.filter(x => x.id !== action.payload)

        default:
            return state
    }
}

export default users
