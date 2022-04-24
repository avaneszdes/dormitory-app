import {
    AddStudentToRoomInterface,
    AuthenticationDto,
    ChangePasswordInterface,
    Filter,
    IAuthInterface, IDebtsInterface,
    IDormitoryInterface, IOccupancyInterface,
    IPaymentInterface, IReprimandInterface,
    IStudentProfileInterface, IUserInterface,
    RequestAddRoomToDormitoryInterface,
    RequestToAddDormitory,
    RoomInterface,
    SendCommentInterface,
    SendMessageToMailInterface
} from "../Interfaces";
import {
    ADD_DORMITORY,
    ADD_DORMITORY_SUCCEED,
    ADD_PAYMENT_RECEIPT,
    ADD_ROOM_TO_DORMITORY,
    ADD_ROOM_TO_DORMITORY_SUCCEED,
    ADD_STUDENT_TO_ROOM,
    AUTHORIZATION,
    AUTHORIZATION_SUCCEED,
    CHANGE_USER_PASSWORD,
    CHANGE_USER_PASSWORD_SUCCEED,
    CLEAR_ALERT_MESSAGE_SUCCEED,
    DELETE_ROOM_FROM_DORMITORY,
    DELETE_ROOM_FROM_DORMITORY_SUCCEED,
    DELETE_STUDENT,
    DELETE_STUDENT_FROM_ROOM,
    DELETE_STUDENT_FROM_ROOM_SUCCEED,
    DELETE_STUDENT_SUCCEED,
    DELETE_USER,
    EDIT_USER,
    EDIT_USER_SUCCEED,
    GET_ALL_DORMITORIES,
    GET_ALL_DORMITORIES_SUCCEED,
    GET_ALL_PAYMENTS_BY_ID,
    GET_ALL_PAYMENTS_BY_ID_SUCCEED,
    GET_ALL_STUDENTS,
    GET_ALL_STUDENTS_SUCCEED,
    GET_STUDENT_PROFILE_BY_ID,
    GET_STUDENT_PROFILE_BY_ID_SUCCEED,
    GET_STUDENT_PROFILE_BY_LOGIN,
    GET_STUDENT_PROFILE_BY_LOGIN_SUCCEED,
    GET_USERS,
    GET_USERS_SUCCEED,
    LOG_OUT,
    SEND_COMMENT,
    SEND_COMMENT_SUCCEED,
    SEND_REQUEST_TO_CHANGE_USER_PASSWORD,
    SEND_REQUEST_TO_CHANGE_USER_PASSWORD_SUCCEED,
    SET_ALERT_MESSAGE_SUCCEED,
    UPLOAD_RECEIPT,
    UPLOAD_RECEIPT_SUCCEED,
    SEND_MESSAGE_TO_MAIL,
    CHANGE_PRICE,
    CHANGE_PRICE_SUCCEED,
    DELETE_DORMITORY,
    DELETE_DORMITORY_SUCCEED,
    UPDATE_DORMITORY,
    UPDATE_DORMITORY_SUCCEED,
    LOADING_START_SUCCEED,
    LOADING_END_SUCCEED,
    GET_OCCUPANCY_DATA_BY_LOGIN,
    GET_OCCUPANCY_DATA_BY_LOGIN_SUCCEED,
    GET_STUDENTS_BY_FILTER,
    GET_STUDENTS_BY_FILTER_SUCCEED,
    GET_DORMITORY_BY_NUMBER,
    GET_DORMITORY_BY_NUMBER_SUCCEED,
    ADD_USER,
    ADD_USER_SUCCEED,
    GET_REPRIMANDS_BY_USER_ID,
    GET_REPRIMANDS_BY_USER_ID_SUCCEED,
    CREATE_REPRIMAND,
    CREATE_REPRIMAND_SUCCEED,
    ADD_STUDENT_TO_ROOM_SUCCEED,
    GET_ALL_OCCUPANCIES,
    GET_ALL_OCCUPANCIES_SUCCEED,
    DELETE_REPRIMAND,
    DELETE_REPRIMAND_SUCCEED, GET_DEBTS_BY_ID, GET_DEBTS_BY_ID_SUCCEED
} from "./constants";


export interface AuthorizationAction {
    type: typeof AUTHORIZATION,
    payload: AuthenticationDto
}

export interface AuthorizationSucceedAction {
    type: typeof AUTHORIZATION_SUCCEED,
    payload: IAuthInterface
}

export interface GetUsersAction {
    type: typeof GET_USERS,
    payload: string
}

export interface GetUsersSucceedAction {
    type: typeof GET_USERS_SUCCEED,
    payload: IStudentProfileInterface[]
}

export interface DeleteUserAction {
    type: typeof DELETE_USER,
    payload: number
}

interface EditUserAction {
    type: typeof EDIT_USER,
    payload: IStudentProfileInterface
}

export interface EditUserSucceedAction {
    type: typeof EDIT_USER_SUCCEED,
    payload: IStudentProfileInterface
}

export interface AddUserAction {
    type: typeof ADD_USER,
    payload: {user: IUserInterface, role: string}
}

export interface AddUserActionSucceed {
    type: typeof ADD_USER_SUCCEED,
    payload: IUserInterface
}


export interface GetStudentProfileSucceed {
    type: typeof GET_STUDENT_PROFILE_BY_ID_SUCCEED,
    payload: IStudentProfileInterface
}

export interface GetStudentProfileById {
    type: typeof GET_STUDENT_PROFILE_BY_ID,
    payload: number
}

export interface GetStudentProfileByLoginSucceed {
    type: typeof GET_STUDENT_PROFILE_BY_LOGIN_SUCCEED,
    payload: IStudentProfileInterface
}

export interface GetStudentProfileByLogin {
    type: typeof GET_STUDENT_PROFILE_BY_LOGIN,
    payload: string
}

export interface EditUser {
    type: typeof EDIT_USER,
    payload: IStudentProfileInterface
}

export interface EditUserSucceed {
    type: typeof EDIT_USER_SUCCEED,
    payload: IStudentProfileInterface
}

export interface LogOut {
    type: typeof LOG_OUT,
    payload: string
}

export interface SendRequestToChangeUserPasswordSucceed {
    type: typeof SEND_REQUEST_TO_CHANGE_USER_PASSWORD_SUCCEED,
    payload: string
}

export interface SendRequestToChangeUserPassword {
    type: typeof SEND_REQUEST_TO_CHANGE_USER_PASSWORD,
    payload: string
}

export interface ChangeUserPassword {
    type: typeof CHANGE_USER_PASSWORD,
    payload: ChangePasswordInterface
}

export interface ChangeUserPasswordSucceed {
    type: typeof CHANGE_USER_PASSWORD_SUCCEED,
    payload: string
}

export interface ClearAlertMessage {
    type: typeof CLEAR_ALERT_MESSAGE_SUCCEED,
    payload: string
}

export interface SetAlertMessage {
    type: typeof SET_ALERT_MESSAGE_SUCCEED,
    payload: string
}

export interface GetAllDormitories {
    type: typeof GET_ALL_DORMITORIES,
    payload: Filter
}

export interface GetAllDormitoriesSucceed {
    type: typeof GET_ALL_DORMITORIES_SUCCEED,
    payload: IDormitoryInterface[]
}

export interface GetAllPaymentsById {
    type: typeof GET_ALL_PAYMENTS_BY_ID,
    payload: { studentId: number, year: string }
}

export interface GetAllPaymentsByIdSucceed {
    type: typeof GET_ALL_PAYMENTS_BY_ID_SUCCEED,
    payload: IDormitoryInterface[]
}


export interface AddStudentToRoom {
    type: typeof ADD_STUDENT_TO_ROOM,
    payload: AddStudentToRoomInterface
}

export interface AddStudentToRoomSucceed {
    type: typeof ADD_STUDENT_TO_ROOM_SUCCEED,
    payload: {dormitoryId: number, roomId: number}
}

export interface LoadingStartSucceed {
    type: typeof LOADING_START_SUCCEED,
    payload: boolean
}

export interface LoadingEndSucceed {
    type: typeof LOADING_END_SUCCEED,
    payload: boolean
}

export interface AddRoomToDormitory {
    type: typeof ADD_ROOM_TO_DORMITORY,
    payload: RequestAddRoomToDormitoryInterface
}

export interface AddRoomToDormitorySucceed {
    type: typeof ADD_ROOM_TO_DORMITORY_SUCCEED,
    payload: { room: RoomInterface, dormitoryId: number }
}

export interface DeleteRoomFromDormitory {
    type: typeof DELETE_ROOM_FROM_DORMITORY,
    payload: { dormitoryId: number, roomNumber: string, roomId: number }
}

export interface DeleteRoomFromDormitorySucceed {
    type: typeof DELETE_ROOM_FROM_DORMITORY_SUCCEED,
    payload: { dormitoryId: number, roomNumber: string, roomId: number }
}

export interface AddPaymentReceipt {
    type: typeof ADD_PAYMENT_RECEIPT,
    payload: string
}

export interface AddDormitory {
    type: typeof ADD_DORMITORY,
    payload: RequestToAddDormitory
}

export interface AddDormitorySucceed {
    type: typeof ADD_DORMITORY_SUCCEED,
    payload: IDormitoryInterface
}

export interface UploadReceipt {
    type: typeof UPLOAD_RECEIPT,
    payload: IPaymentInterface
}

export interface UploadReceiptSucceed {
    type: typeof UPLOAD_RECEIPT_SUCCEED,
    payload: IPaymentInterface
}

export interface GetAllStudents {
    type: typeof GET_ALL_STUDENTS,
    payload: string
}

export interface GetAllStudentsSucceed {
    type: typeof GET_ALL_STUDENTS_SUCCEED,
    payload: IStudentProfileInterface[]
}

export interface DeleteStudent {
    type: typeof DELETE_STUDENT,
    payload: number
}

export interface DeleteStudentSucceed {
    type: typeof DELETE_STUDENT_SUCCEED,
    payload: IStudentProfileInterface[]
}

export interface GetStudentsByDormitory {
    type: typeof GET_STUDENTS_BY_FILTER,
    payload: {faculty: string, dormitory: string, group: string, foreign: boolean}
}

export interface GetStudentsByDormitorySucceed {
    type: typeof GET_STUDENTS_BY_FILTER_SUCCEED,
    payload: IStudentProfileInterface[]
}

export interface SendComment {
    type: typeof SEND_COMMENT,
    payload: SendCommentInterface
}

export interface SendCommentSucceed {
    type: typeof SEND_COMMENT_SUCCEED,
    payload: IPaymentInterface
}

export interface SendMessageToMail {
    type: typeof SEND_MESSAGE_TO_MAIL,
    payload: SendMessageToMailInterface
}

export interface DeleteStudentFromRoom {
    type: typeof DELETE_STUDENT_FROM_ROOM,
    payload: AddStudentToRoomInterface
}

export interface DeleteStudentFromRoomSucceed {
    type: typeof DELETE_STUDENT_FROM_ROOM_SUCCEED,
    payload: string
}

export interface ChangePrice {
    type: typeof CHANGE_PRICE,
    payload: {newPrice: number, paymentId: number}
}

export interface ChangePriceSucceed {
    type: typeof CHANGE_PRICE_SUCCEED,
    payload: IPaymentInterface
}

export interface DeleteDormitory {
    type: typeof DELETE_DORMITORY,
    payload: number
}

export interface DeleteDormitorySucceed {
    type: typeof DELETE_DORMITORY_SUCCEED,
    payload: number
}

export interface UpdateDormitory {
    type: typeof UPDATE_DORMITORY,
    payload: IDormitoryInterface
}

export interface UpdateDormitorySucceed {
    type: typeof UPDATE_DORMITORY_SUCCEED,
    payload: IDormitoryInterface
}

export interface GetOccupancyDataByLogin {
    type: typeof GET_OCCUPANCY_DATA_BY_LOGIN,
    payload: string
}

export interface GetOccupancyDataByLoginSucceed {
    type: typeof GET_OCCUPANCY_DATA_BY_LOGIN_SUCCEED,
    payload: IOccupancyInterface
}

export interface GetDormitoryByNumber {
    type: typeof GET_DORMITORY_BY_NUMBER,
    payload: string
}

export interface GetDormitoryByNumberSucceed {
    type: typeof GET_DORMITORY_BY_NUMBER_SUCCEED,
    payload: IDormitoryInterface
}

export interface GetReprimandsById {
    type: typeof GET_REPRIMANDS_BY_USER_ID,
    payload: number
}

export interface GetReprimandsByIdSucceed {
    type: typeof GET_REPRIMANDS_BY_USER_ID_SUCCEED,
    payload: IReprimandInterface
}

export interface CreateReprimand {
    type: typeof CREATE_REPRIMAND,
    payload: {userId: number, comment: string}
}

export interface CreateReprimandSucceed {
    type: typeof CREATE_REPRIMAND_SUCCEED,
    payload: IReprimandInterface
}

export interface DeleteReprimand {
    type: typeof DELETE_REPRIMAND,
    payload: number
}

export interface DeleteReprimandSucceed {
    type: typeof DELETE_REPRIMAND_SUCCEED,
    payload: number
}

export interface GetAllOccupancies {
    type: typeof GET_ALL_OCCUPANCIES,
    payload: string
}

export interface GetAllOccupanciesSucceed {
    type: typeof GET_ALL_OCCUPANCIES_SUCCEED,
    payload: IOccupancyInterface[]
}

export interface GetDebtsById {
    type: typeof GET_DEBTS_BY_ID,
    payload: number
}

export interface GetDebtsByIdSucceed {
    type: typeof GET_DEBTS_BY_ID_SUCCEED,
    payload: IDebtsInterface
}

export type DormitoryActionTypes =
    | GetDebtsById
    | GetDebtsByIdSucceed
    | DeleteReprimand
    | DeleteReprimandSucceed
    | GetAllOccupancies
    | GetAllOccupanciesSucceed
    | CreateReprimand
    | CreateReprimandSucceed
    | GetReprimandsById
    | GetReprimandsByIdSucceed
    | AddUserAction
    | AddUserActionSucceed
    | GetDormitoryByNumberSucceed
    | GetDormitoryByNumber
    | GetOccupancyDataByLogin
    | GetOccupancyDataByLoginSucceed
    | UpdateDormitory
    | UpdateDormitorySucceed
    | SendMessageToMail
    | DeleteDormitorySucceed
    | DeleteDormitory
    | ChangePrice
    | ChangePriceSucceed
    | DeleteStudentFromRoomSucceed
    | DeleteStudentFromRoom
    | SendComment
    | SendCommentSucceed
    | GetStudentsByDormitorySucceed
    | GetStudentsByDormitory
    | AddDormitory
    | AddDormitorySucceed
    | DeleteStudentSucceed
    | DeleteStudent
    | GetAllStudents
    | GetAllStudentsSucceed
    | DeleteRoomFromDormitory
    | DeleteRoomFromDormitorySucceed
    | UploadReceipt
    | UploadReceiptSucceed
    | AddRoomToDormitorySucceed
    | AddRoomToDormitory
    | AddStudentToRoom
    | AddStudentToRoomSucceed
    | AuthorizationAction
    | AuthorizationSucceedAction
    | GetUsersAction
    | GetUsersSucceedAction
    | DeleteUserAction
    | EditUserAction
    | EditUserSucceedAction
    | GetStudentProfileSucceed
    | GetStudentProfileById
    | LogOut
    | EditUser
    | EditUserSucceed
    | SendRequestToChangeUserPassword
    | SendRequestToChangeUserPasswordSucceed
    | ChangeUserPassword
    | ChangeUserPasswordSucceed
    | ClearAlertMessage
    | SetAlertMessage
    | GetAllDormitoriesSucceed
    | GetAllDormitories
    | LoadingStartSucceed
    | LoadingEndSucceed
    | GetStudentProfileByLogin
    | GetStudentProfileByLoginSucceed
    | GetAllPaymentsById
    | GetAllPaymentsByIdSucceed
    | AddPaymentReceipt
