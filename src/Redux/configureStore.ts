import {applyMiddleware, combineReducers, createStore} from "redux";
import createSagaMiddleware from 'redux-saga'
import {composeWithDevTools } from 'redux-devtools-extension';
import {
    IAuthInterface,
    IAlertState,
    IStudentProfileInterface,
    IPaymentInterface,
    IStudentsState, IDormitoryState, IOccupancyState
} from "../Interfaces";
import {rootSaga} from "../Saga/root";
import auth from "./auth-reducer";
import users from "./admin-reducer";
import student from "./student-reducer";
import alert from "./alert-reducer";
import dormitories from "./dormitory-reducer";
import payments from "./payment-reducer";
import occupancy from "./occupancy-reducer";

export interface IRootState {
    auth: IAuthInterface
    users: IStudentProfileInterface[]
    student: IStudentsState
    alert: IAlertState
    dormitories: IDormitoryState
    payments: IPaymentInterface[]
    occupancy: IOccupancyState
}

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware()
    const reducers = combineReducers({auth, users, student, alert, dormitories, payments, occupancy})
    const store = createStore(reducers,  composeWithDevTools(applyMiddleware(sagaMiddleware)))
    sagaMiddleware.run(rootSaga)

    return store
}
