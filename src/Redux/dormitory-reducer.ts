import {
    ADD_DORMITORY_SUCCEED,
    ADD_ROOM_TO_DORMITORY_SUCCEED,
    ADD_STUDENT_TO_ROOM_SUCCEED,
    DELETE_DORMITORY_SUCCEED,
    DELETE_ROOM_FROM_DORMITORY_SUCCEED, DELETE_STUDENT_FROM_ROOM,
    GET_ALL_DORMITORIES_SUCCEED,
    GET_DORMITORY_BY_NUMBER_SUCCEED,
    UPDATE_DORMITORY_SUCCEED,
} from "./constants";
import {DormitoryActionTypes} from "./action";
import {IDormitoryInterface, IDormitoryState, RoomInterface} from "../Interfaces";

const initialState: IDormitoryState = {dormitories: [], total: 0, dormitory: null}


const dormitories = (state = initialState, action: DormitoryActionTypes) => {

    switch (action.type) {

        case GET_ALL_DORMITORIES_SUCCEED:
            return action.payload

        case GET_DORMITORY_BY_NUMBER_SUCCEED:
            return {...state, dormitory: action.payload}

        case ADD_ROOM_TO_DORMITORY_SUCCEED:
            return {
                ...state,
                dormitories: state.dormitories.map((dormitory) => {
                    if (dormitory.id === action.payload.dormitoryId) {
                        return {...dormitory, rooms: [...dormitory.rooms, action.payload.room]}
                    }
                    return dormitory
                })
            }


        case DELETE_ROOM_FROM_DORMITORY_SUCCEED:
            return {
                ...state, dormitories: state.dormitories.map((dormitory) => {
                    if (dormitory.id === action.payload.dormitoryId) {
                        return {
                            ...dormitory,
                            rooms: dormitory.rooms.filter(x => x.number !== action.payload.roomNumber)
                        }
                    }
                    return dormitory
                })
            }

        case ADD_DORMITORY_SUCCEED:
            return [...state.dormitories, action.payload]

        case DELETE_DORMITORY_SUCCEED:
            return {...state.dormitories, dormitories: state.dormitories.filter(x => x.id !== action.payload)}

        case UPDATE_DORMITORY_SUCCEED:
            return {
                ...state.dormitories, dormitories: state.dormitories.map(dormitory => {
                    if (dormitory.id === action.payload.id) {
                        return action.payload
                    }

                    return dormitory;
                })
            }

        case ADD_STUDENT_TO_ROOM_SUCCEED:
            return {
                ...state,
                dormitories: state.dormitories.map((dormitory: IDormitoryInterface) => {
                    if (dormitory.id === action.payload.dormitoryId) {

                        return {
                            ...dormitory, rooms:
                                dormitory.rooms.map((room: RoomInterface) => {
                                    if (room.id === action.payload.roomId) {
                                        return {...room, caseload: room.caseload + 1}
                                    }
                                    return room
                                })
                        }
                    }
                    return dormitory
                })
            }

        case DELETE_STUDENT_FROM_ROOM:
            return {
                ...state,
                dormitories: state.dormitories.map((dormitory: IDormitoryInterface) => {
                    if (dormitory.id === action.payload.dormitoryId) {

                        return {
                            ...dormitory, rooms:
                                dormitory.rooms.map((room: RoomInterface) => {
                                    if (room.id === action.payload.roomId) {
                                        return {...room, caseload: room.caseload - 1}
                                    }
                                    return room
                                })
                        }
                    }
                    return dormitory
                })
            }

        default:
            return state
    }
}
export default dormitories



