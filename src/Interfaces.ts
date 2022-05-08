export interface IAuthInterface {
    token: string | null;
    role: string | null;
    login: string | null
    photo: string
    id: number
    exp: number | undefined
}

export interface AlertInterface {
    message: string
    type: boolean
}

export interface AddStudentToRoomInterface {
    userLogin: string
    roomId: number
    dormitoryId: number
}

export interface IAlertState {
    alert: AlertInterface
    loading: boolean
}

export interface RoomInterface {
    id: number
    number: string
    floor: number
    capacity: number
    caseload: number
    price: number
    status: string
}

export interface IDormitoryInterface {
    id: number
    number: string
    quantityFloors: number
    address: string
    photo: string
    mapImage: string
    rooms: RoomInterface[]
}

export interface IDormitoryState {
    dormitories: IDormitoryInterface[]
    total: number
    dormitory: IDormitoryInterface | null
}

export interface RequestToAddDormitory {
    number: number
    quantityFloors: number
    address: string
    photo: string
    mapImage: string

}

export interface IPaymentInterface {
    id: number
    userId: number
    amount: number
    date: Date
    status: string
    receipt: string
    comment: string
}

export interface AuthenticationDto {
    login: string
    password: string
}

export interface IOccupancyState{
    occupancy: IOccupancyInterface | null
    occupancies: IOccupancyInterface[]
}

export interface IOccupancyInterface {
    id: number
    userLogin: string
    room: number
    roomId: number
    dormitory: number
    checkInDate: Date
    checkOutDate: Date | null
    status: string
    price: number
}

export interface Filter {
    top: number
    skip: number
}

export interface IDebtsInterface {
    totalCountDepts: number
    totalSumDepts: number
}

export interface RequestAddRoomToDormitoryInterface {
    id: number
    number: string
    status: string
    floor: number
    capacity: number
    price: number
}

export interface IReprimandInterface{
    id: number,
    userId: number,
    date: Date,
    author: string,
    comment: string
}


export interface IStudentsState {
    students: IStudentProfileInterface[]
    profile: IStudentProfileInterface | null
    user: IUserInterface | null
    reprimands: IReprimandInterface[]
    studentDebt: IDebtsInterface | null
}

export interface IStudentProfileInterface {
    id: number
    login: string
    name: string
    surname: string
    image: string
    mail: string
    phone: string
    patronymic: string
    isForeign: string | boolean
}

export interface IUserInterface {
    name: string
    surname: string
    patronymic: string
    phone: string
    mail: string
    login: string
    password: string
    isForeign: number
}

export interface ChangePasswordInterface {
    oldPassword: string
    newPassword: string
    verifiedPassword: string
    guid: string
}

export interface SendCommentInterface {
    id: number
    comment: string
    commentType: boolean
}

export interface SendMessageToMailInterface {
    studentId: number
    subject: string
    body: string
}
