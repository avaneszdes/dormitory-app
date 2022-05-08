import {DormitoryActionTypes} from "./action";
import {IStudentsState} from "../Interfaces";
import {
    ADD_STUDENT_TO_ROOM,
    ADD_USER,
    CHANGE_USER_PASSWORD,
    CREATE_REPRIMAND_SUCCEED,
    DELETE_REPRIMAND_SUCCEED,
    DELETE_STUDENT,
    EDIT_USER_SUCCEED,
    GET_ALL_STUDENTS_SUCCEED,
    GET_DEBTS_BY_ID_SUCCEED,
    GET_REPRIMANDS_BY_USER_ID_SUCCEED,
    GET_STUDENT_PROFILE_BY_ID_SUCCEED,
    GET_STUDENT_PROFILE_BY_LOGIN_SUCCEED,
    GET_STUDENTS_BY_FILTER_SUCCEED,
} from "./constants";

const initialState: IStudentsState = {
    students: [],
    user: null,
    profile: null,
    reprimands: [],
    studentDebt: null
}

const student = (state = initialState, action: DormitoryActionTypes) => {

    switch (action.type) {

        case GET_STUDENT_PROFILE_BY_ID_SUCCEED:
            return {...state, profile: action.payload}

        case GET_STUDENTS_BY_FILTER_SUCCEED:
            return {...state, students: action.payload}

        case ADD_STUDENT_TO_ROOM:
            return state

        case GET_STUDENT_PROFILE_BY_LOGIN_SUCCEED:
            return {...state, profile: action.payload}

        case GET_ALL_STUDENTS_SUCCEED:
            return {...state, students: action.payload}

        case EDIT_USER_SUCCEED:
            return {...state, profile: action.payload}

        case CHANGE_USER_PASSWORD:
            return state

        case DELETE_STUDENT:
            return {...state, students: state.students.filter(x => x.id !== action.payload)}

        // case DELETE_STUDENT_FROM_ROOM:
        //     return {...state, students: state.students.filter(x => x.login !== action.payload.userLogin)}

        case ADD_USER:
            return {...state, user: action.payload.user}

        case GET_REPRIMANDS_BY_USER_ID_SUCCEED:
            return {...state, reprimands: action.payload}

        case CREATE_REPRIMAND_SUCCEED:
            return {...state, reprimands: [...state.reprimands, action.payload]}

        case DELETE_REPRIMAND_SUCCEED:
            return {...state, reprimands: state.reprimands.filter(x => x.id !== action.payload)}

        case GET_DEBTS_BY_ID_SUCCEED:
            return {...state, studentDebt: action.payload}

        default:
            return state
    }
}

export default student
