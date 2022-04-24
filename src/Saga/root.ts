import {all} from 'redux-saga/effects'
import {watchAuthorization} from "./Auth/Authorization";
import {getStudentProfileByIdWatcher} from "./Student/GetStudentProfile";
import {updateStudentProfileWatcher} from "./Student/UpdateUser";
import {sendRequestToChangePasswordEmailWatcher} from "./Student/RequestToChangeStudentPassword";
import {changeUserPasswordWatcher} from "./Student/ChangeUserPassword";
import {watchGetAllDormitoriesWatcher} from "./Dormitory/GetAllDormitories";
import {getStudentProfileByLoginWatcher} from "./Student/GetStudentByLogin";
import {addStudentToRoomWatcher} from "./Student/AddStudentToRoom";
import {addRoomToDormitoryWatcher} from "./Dormitory/AddRoomToDormitory";
import {getAllPaymentsByIdWatcher} from "./Payments/GetPaymentsById";
import {uploadReceiptWatcher} from "./Payments/UploadReceipt";
import {deleteRoomFromDormitoryWatcher} from "./Dormitory/DeleteRoom";
import {getAllStudentsWatcher} from "./Student/GetAllStudents";
import {deleteStudentWatcher} from "./Student/DeleteStudent";
import { addDormitoryWatcher } from './Dormitory/AddDormitory';
import {logOutWorkerWatcher} from "./Auth/Logout";
import {getStudentsByFilterWatcher} from "./Student/GetStudentsByFilter";
import {approveOrDeclineWatcher} from "./Payments/ApproveOrDeclinePayment";
import {sendMessageToMailWatcher} from "./Student/SendMessageToMail";
import {changePriceWatcher} from "./Admin/ChangePrice";
import {deleteDormitoryWatcher} from "./Dormitory/DeleteDormitory";
import {updateDormitoryWatcher} from "./Dormitory/UpdateDormitory";
import {getDormitoryByNumberWatcher} from "./Dormitory/GetDormitoryByNumber";
import {getOccupancyByLoginWatcher} from "./Occupancy/GetOccupancyByLogin";
import {addUserWatcher} from "./Admin/AddUser";
import {getReprimandsByIdWatcher} from "./Reprimands/GetReprimandsById";
import {createReprimandWatcher} from "./Reprimands/CreateReprimand";
import {deleteStudentFromRoomWatcher} from "./Student/DeleteStudentFromRoom";
import {getAllOccupanciesWatcher} from "./Occupancy/GetAllOccupancies";
import {deleteReprimandByIdWatcher} from "./Reprimands/DeleteReprimand";
import {getStudentDeptByIdWatcher} from "./Student/GetStudentDept";

export function* rootSaga() {
    yield all([
        sendRequestToChangePasswordEmailWatcher(),
        getStudentProfileByLoginWatcher(),
        deleteRoomFromDormitoryWatcher(),
        watchGetAllDormitoriesWatcher(),
        getStudentProfileByIdWatcher(),
        deleteStudentFromRoomWatcher(),
        getDormitoryByNumberWatcher(),
        updateStudentProfileWatcher(),
        getOccupancyByLoginWatcher(),
        getStudentsByFilterWatcher(),
        deleteReprimandByIdWatcher(),
        addRoomToDormitoryWatcher(),
        getAllPaymentsByIdWatcher(),
        changeUserPasswordWatcher(),
        getStudentDeptByIdWatcher(),
        sendMessageToMailWatcher(),
        getReprimandsByIdWatcher(),
        getAllOccupanciesWatcher(),
        addStudentToRoomWatcher(),
        approveOrDeclineWatcher(),
        deleteDormitoryWatcher(),
        updateDormitoryWatcher(),
        createReprimandWatcher(),
        getAllStudentsWatcher(),
        uploadReceiptWatcher(),
        deleteStudentWatcher(),
        addDormitoryWatcher(),
        logOutWorkerWatcher(),
        watchAuthorization(),
        changePriceWatcher(),
        addUserWatcher(),
    ]);
}
