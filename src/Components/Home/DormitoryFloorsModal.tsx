import React, {useState} from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../Redux/configureStore";
import {
    AddStudentToRoomInterface,
    IDormitoryInterface,
    RequestAddRoomToDormitoryInterface
} from "../../Interfaces";
import './dormitoryFloorModal.css'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Slide} from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import {
    ADD_ROOM_TO_DORMITORY,
    ADD_STUDENT_TO_ROOM,
    DELETE_ROOM_FROM_DORMITORY,
    DELETE_STUDENT_FROM_ROOM,
    GET_STUDENT_PROFILE_BY_LOGIN
} from "../../Redux/constants";
import AlertComponent from "../Alerts/SuccessAlert";
import {Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography} from "@mui/material";
import {TransitionProps} from "@material-ui/core/transitions";
import {useFormik} from "formik";
import {useTranslation} from "react-i18next";
import * as yup from 'yup'
import RoomDescription from "./RoomDescriptionModal";
import {useFloorModalStyles} from "./HomeStyles";



const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<HTMLDivElement, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface RoomProps {
    dormitoryId: number,
    roomId: number,
    open: boolean,
    anchorEl: HTMLElement | null
}

interface Props {
    props: { id: number, open: boolean }
    setProps: (arg: any) => void
}

const vScheme = yup.object().shape({
    number: yup.string().required("required"),
    floor: yup.string().required("required"),
    capacity: yup.string().required("required"),
    price: yup.string().required("required"),
    status: yup.string().required("required"),
})

const addRoomForm = {
    number: '',
    floor: 0,
    capacity: 0,
    price: 0,
    status: '',
}

export default function DormitoryFloorsModal({props, setProps}: Props) {
    const classes = useFloorModalStyles();
    const dispatch = useDispatch()
    const [showAddPopup, setShowAddPopup] = useState(false)
    const [showRemovePopup, setShowRemovePopup] = useState(false)
    const [numberToDelete, setNumberToDelete] = useState('')
    const dormitories = useSelector((root: IRootState) => root.dormitories.dormitories)
    const auth = useSelector((root: IRootState) => root.auth)
    const foundStudent = useSelector((root: IRootState) => root.student.profile)
    const dormitory: IDormitoryInterface | boolean = Boolean(props.id) && dormitories.filter(x => x.id === props.id)[0]
    const [showSearcher, setShowSearcher] = React.useState({isDelete: false, show: false, id: 0});
    const [roomProps, setRoomProps] = React.useState<RoomProps>({dormitoryId: 0, roomId: 0, open: false, anchorEl: null});
    const [login, setLogin] = React.useState('');
    const {t} = useTranslation();

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, dormitoryId: number, roomId: number, open: boolean) => {
        setRoomProps({dormitoryId, roomId, open, anchorEl: event.currentTarget})
    };

    const handlePopoverClose = () => {
        setRoomProps({dormitoryId: 0,roomId:  0,open: false,anchorEl: null})
    };

    const formik = useFormik({
        initialValues: addRoomForm,
        enableReinitialize: true,
        validationSchema: vScheme,
        onSubmit: (values) => {
            const dto: RequestAddRoomToDormitoryInterface = {
                id: props.id,
                number: values.number,
                floor: values.floor,
                capacity: values.capacity,
                price: values.price,
                status: values.status

            }
            dispatch({type: ADD_ROOM_TO_DORMITORY, payload: dto})
            setShowAddPopup(false);
        }
    })

    const handleClose = () => {
        setProps({id: 0, open: false})
    };

    const getUserByLogin = (login: string) => {
        console.log('error1')
        dispatch({type: GET_STUDENT_PROFILE_BY_LOGIN, payload: login})
    }

    const addStudentToDormitory = (login: string, roomId: number, dormitoryId: number) => {
        const dto: AddStudentToRoomInterface = {userLogin: login, roomId: roomId, dormitoryId: dormitoryId}
        dispatch({type: ADD_STUDENT_TO_ROOM, payload: dto})
        setLogin('')
        setShowSearcher({isDelete: false, show: false, id: 0})

    }

    const removeStudentFromRoom = (login: string, roomId: number, dormitoryId: number) => {
        const dto: AddStudentToRoomInterface = {userLogin: login, roomId: roomId, dormitoryId: dormitoryId}
        dispatch({type: DELETE_STUDENT_FROM_ROOM, payload: dto})
        setLogin('')
        setShowSearcher({isDelete: true, show: false, id: 0})
    }

    const onLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(e.currentTarget.value)
    }

    const onChangeRoomNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNumberToDelete(e.currentTarget.value)
    }
    const removeRoom = (dormitoryId: number | boolean) => {
        if (typeof dormitory !== "boolean") {

            const roomId = dormitory.rooms.filter(x => x.number === numberToDelete)[0].id
            dispatch({
                type: DELETE_ROOM_FROM_DORMITORY,
                payload: {dormitoryId: dormitoryId, roomNumber: numberToDelete, roomId: roomId}
            })
        }
    }

    return (
        <div>

            <Modal
                className={classes.modal}
                open={props.open}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.open}>
                    <div className={classes.paper}>
                        <AlertComponent/>
                        <div className={classes.closeBtn} onClick={() => handleClose()}><CloseOutlinedIcon/></div>
                        {auth && (auth.role === 'ROLE_ADMINISTRATOR' || auth.role === 'ROLE_DEAN') &&
                        <Button variant="outlined"
                               color="primary"
                               onClick={() => setShowAddPopup(true)}
                        >
                            {t('rooms.addRoom')}
                        </Button>}
                        {auth && (auth.role === 'ROLE_ADMINISTRATOR' || auth.role === 'ROLE_DEAN')  &&
                        <Button variant="outlined"
                               color="secondary"
                               onClick={() => setShowRemovePopup(true)}
                               style={{marginLeft: '5px'}}
                        >
                            {t('rooms.deleteRoom')}
                        </Button>}
                        <div>
                            <Dialog TransitionComponent={Transition}
                                    keepMounted
                                    open={showAddPopup}
                                    onClose={() => setShowAddPopup(false)}
                                    aria-labelledby="form-title"
                            >
                                <DialogTitle id="form-title">{t('room.addRoomText')}
                                     {dormitory && dormitory.number}</DialogTitle>
                                <form onSubmit={formik.handleSubmit}>
                                    <DialogContent>
                                        <TextField
                                            placeholder={t('room.number')}
                                            name='number'
                                            id='numberId'
                                            label={t('room.number')}
                                            onChange={formik.handleChange}
                                            error={formik.touched.number && Boolean(formik.errors.number)}
                                            value={formik.values.number}
                                            helperText={formik.touched.number && formik.errors.number}
                                        />
                                    </DialogContent>
                                    <DialogContent>
                                        <TextField
                                            placeholder={t('room.floor')}
                                            name='floor'
                                            id='floor'
                                            label={t('room.floor')}
                                            onChange={formik.handleChange}
                                            error={formik.touched.floor && Boolean(formik.errors.floor)}
                                            value={formik.values.floor}
                                            helperText={formik.touched.floor && formik.errors.floor}
                                        />
                                    </DialogContent>
                                    <DialogContent>
                                        <TextField
                                            placeholder={t('room.price')}
                                            name='price'
                                            id='price'
                                            label={t('room.price')}
                                            onChange={formik.handleChange}
                                            error={formik.touched.price && Boolean(formik.errors.price)}
                                            value={formik.values.price}
                                            helperText={formik.touched.price && formik.errors.price}
                                        />
                                    </DialogContent>
                                    <DialogContent>
                                        <TextField
                                            placeholder={t('room.capacity')}
                                            name='capacity'
                                            id='capacity'
                                            label={t('room.capacity')}
                                            onChange={formik.handleChange}
                                            error={formik.touched.capacity && Boolean(formik.errors.capacity)}
                                            value={formik.values.capacity}
                                            helperText={formik.touched.capacity && formik.errors.capacity}
                                        />
                                    </DialogContent>
                                    <DialogContent>
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend">{t('room.optional')}</FormLabel>
                                            <RadioGroup
                                                name="status"
                                                value={formik.values.status}
                                                onChange={formik.handleChange}
                                            >
                                                <FormControlLabel value="ACTIVE" control={<Radio/>} label="Active"/>
                                                <FormControlLabel value="INACTIVE" control={<Radio color="error"/>}
                                                                  label="Inactive"/>
                                            </RadioGroup>
                                        </FormControl>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button
                                            type='submit'
                                            color='primary'
                                        >
                                            Add
                                        </Button>
                                        <Button
                                            onClick={() => setShowAddPopup(false)}
                                            color='primary'
                                        >
                                            Cancel
                                        </Button>
                                    </DialogActions>
                                </form>
                            </Dialog>
                        </div>
                        <div>
                            <Dialog TransitionComponent={Transition}
                                    keepMounted
                                    open={showRemovePopup}
                                    onClose={() => setShowRemovePopup(false)}
                                    aria-labelledby="form-title"
                            >
                                <DialogTitle id="form-title">{t('room.removeRoomText')}
                                     {dormitory && dormitory.number}</DialogTitle>
                                <DialogContent>
                                    <TextField
                                        placeholder={t('room.number')}
                                        label={t('room.number')}
                                        onChange={onChangeRoomNumber}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        type='submit'
                                        color='primary'
                                        onClick={() => removeRoom(dormitory && dormitory.id)}
                                    >
                                        Remove
                                    </Button>
                                    <Button
                                        onClick={() => setShowRemovePopup(false)}
                                        color='primary'
                                    >
                                        Cancel
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                        {dormitory && dormitory.rooms.map((room, index) => {

                            const dormitoryRooms = dormitory.rooms.filter(x => x.floor === index + 1)
                            if (dormitoryRooms.length > 0) {
                                return <div style={index % 2 === 0 ? {
                                    backgroundColor: '#edf3ed',
                                    borderRadius: '10px'
                                } : {backgroundColor: '#d6dae7', borderRadius: '10px'}} key={index}>
                                    <Divider style={{marginTop: '10px'}} component="li"/>
                                    <h2 style={{display: 'flex', justifyContent: 'center'}}>{t('rooms.floor')} {index + 1}</h2>
                                    <Divider style={{marginTop: '10px'}} component="li"/>

                                    <div className={classes.roomsOnFlat}>

                                        {dormitoryRooms.map(x => {
                                            if (x.status === 'ACTIVE')
                                                return <div key={x.id * 2}>
                                                    {roomProps.open &&
                                                    <RoomDescription props={roomProps} setProps={setRoomProps}/>}
                                                    <div className={x.capacity - x.caseload
                                                        ? classes.room : classes.roomRed}
                                                         key={x.number}
                                                    >
                                                        {auth && auth.role === 'ROLE_ADMINISTRATOR' &&
                                                        <div className={classes.roomButtons}>
                                                            <AddIcon onClick={() => setShowSearcher({
                                                                isDelete: false,
                                                                show: !showSearcher.show,
                                                                id: x.id
                                                            })} className={classes.roomTopBtn}/>
                                                            <DeleteOutlineIcon
                                                                onClick={() => setShowSearcher({
                                                                    isDelete: true,
                                                                    show: !showSearcher.show,
                                                                    id: x.id
                                                                })}
                                                                className={classes.roomTopBtn}/>
                                                        </div>}
                                                        <Typography
                                                            aria-owns={roomProps.open ? 'mouse-over-popover' : undefined}
                                                            aria-haspopup="true"
                                                            onMouseEnter={(e) => handlePopoverOpen(e, dormitory.id, x.id, true)}
                                                            onMouseLeave={handlePopoverClose}
                                                            className={classes.roomNumberPart}
                                                        >
                                                            {x.number}
                                                        </Typography>
                                                        <h4 style={{margin: '4px 0px 0px 0px'}}>{t('rooms.free')} {x.capacity - x.caseload}</h4>
                                                        <h4 style={{margin: 0}}>{t('rooms.from')} {x.capacity}</h4>
                                                    </div>

                                                    <div>
                                                        {showSearcher.show && showSearcher.id === x.id &&
                                                        <Grid container>
                                                            <Grid item style={{width: '150px', marginTop: '10px'}}>
                                                                <TextField onChange={onLoginChange} id="standard-basic"
                                                                           className={classes.searchInput}
                                                                           label="Search"/>
                                                            </Grid>
                                                            <Grid item xs={2} sm={1} style={{marginTop: '5px'}}>
                                                                <IconButton onClick={() => getUserByLogin(login)}
                                                                            color="primary" component="span">
                                                                    <SearchIcon/>
                                                                </IconButton>
                                                            </Grid>
                                                            {foundStudent?.name && showSearcher.show && showSearcher.id === x.id &&
                                                            <Grid container>
                                                                {login && <Grid item style={{maxWidth: '150px'}}>
                                                                    <h3>{foundStudent?.surname + ' ' + foundStudent?.name[0] + '.' + foundStudent?.patronymic[0] + '.'}</h3>
                                                                </Grid>}
                                                                {login && !showSearcher.isDelete && <Grid item xs={2} sm={1}>
                                                                    <IconButton
                                                                        onClick={() => addStudentToDormitory(login, showSearcher.id, dormitory.id)}
                                                                        color="primary" component="span">
                                                                        <AddIcon/>
                                                                    </IconButton>
                                                                </Grid>}
                                                                {showSearcher.isDelete && <Grid item xs={2} sm={1}>
                                                                    <IconButton
                                                                        onClick={() => removeStudentFromRoom(login, showSearcher.id, dormitory.id)}
                                                                        color="primary" component="span">
                                                                        <DeleteOutlineIcon/>
                                                                    </IconButton>
                                                                </Grid>}
                                                            </Grid>}

                                                        </Grid>}
                                                    </div>
                                                </div>
                                        })}
                                    </div>

                                </div>
                            }
                        })}
                    </div>

                </Fade>
            </Modal>


        </div>
    );
}
