import {IPaymentInterface} from "../Interfaces";
import {DormitoryActionTypes} from "./action";
import {
    CHANGE_PRICE_SUCCEED,
    GET_ALL_PAYMENTS_BY_ID_SUCCEED,
    SEND_COMMENT_SUCCEED,
    UPLOAD_RECEIPT,
    UPLOAD_RECEIPT_SUCCEED
} from "./constants";

const initialState: IPaymentInterface[] = []

const payments = (state = initialState, action: DormitoryActionTypes) => {

    switch (action.type) {

        case SEND_COMMENT_SUCCEED:
            return state.map(x => {
                if (x.id === action.payload.id) {
                    return {...x, status: action.payload.status, comment: action.payload.comment}
                }
                return x
            })

        case GET_ALL_PAYMENTS_BY_ID_SUCCEED:
            return action.payload

        case UPLOAD_RECEIPT:
            return state.map(payment => payment.id === action.payload.id ?
                {...payment, receipt: action.payload.receipt}
                : payment)

        case UPLOAD_RECEIPT_SUCCEED:
            return state.map(payment => payment.id === action.payload.id ?
                action.payload
                : payment)

        case CHANGE_PRICE_SUCCEED:
            return state.map(payment => payment.id === action.payload.id ?
                action.payload
                : payment)


        default:
            return state
    }
}
export default payments
