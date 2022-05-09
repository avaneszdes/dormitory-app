import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    Slide,
    TextField
} from '@mui/material';
import {TransitionProps} from '@mui/material/transitions';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {IRootState} from "../../Redux/configureStore";
import Avatar from '@mui/material/Avatar';
import {useTranslation} from "react-i18next";
import SendSharpIcon from "@mui/icons-material/SendSharp";
import OpenImage from "./OpenFullImage";
import {
    CREATE_REPRIMAND,
    GET_DEBTS_BY_ID_SUCCEED,
    GET_OCCUPANCY_DATA_BY_LOGIN_SUCCEED,
    GET_REPRIMANDS_BY_USER_ID_SUCCEED,
    GET_STUDENT_PROFILE_BY_LOGIN_SUCCEED,
    LOG_OUT,
    SEND_MESSAGE_TO_MAIL
} from "../../Redux/constants";
import AlertComponent from "../Alerts/SuccessAlert";
import {getFullDate} from "../Global";
import {useDetailedInfoStyles} from "./AdminStyles";
import ReprimandItem from "./ReprimandItem";
import ProgressLine from "../Home/ProgressLine";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<HTMLDivElement, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


interface Props {
    props: boolean
    setProps: (arg: any) => void
}

export default function DetailedInfoDialog({props, setProps}: Props) {

    const dispatch = useDispatch()
    const [mail, setMail] = useState({subject: '', body: ''})
    const [comment, setComment] = useState('')
    const [imageClick, setImageClick] = useState(false)
    const [showReprimand, setShowReprimand] = useState(false)
    const studentProfile = useSelector((state: IRootState) => state.student.profile)
    const auth = useSelector((authState: IRootState) => authState.auth)
    const reprimands = useSelector((state: IRootState) => state.student.reprimands)
    const debts = useSelector((state: IRootState) => state.student.studentDebt)
    const occupancy = useSelector((state: IRootState) => state.occupancy.occupancy)
    const classes = useDetailedInfoStyles()
    const {t} = useTranslation()

    const tokenLife = auth.exp !== undefined ? auth.exp * 1000 : 0;

    useEffect(() => {
        if (Date.now() > tokenLife || tokenLife === 0) {
            localStorage.setItem('token', '')
            dispatch({type: LOG_OUT, payload: ''})
        }
    }, []);

    const handleClose = () => {
        dispatch({type: GET_STUDENT_PROFILE_BY_LOGIN_SUCCEED, payload: null})
        dispatch({type: GET_REPRIMANDS_BY_USER_ID_SUCCEED, payload: []})
        dispatch({type: GET_DEBTS_BY_ID_SUCCEED, payload: {}})
        dispatch({type: GET_OCCUPANCY_DATA_BY_LOGIN_SUCCEED, payload: null})
        setProps({id: 0, open: false})
    }

    const onChangeMail = (e: React.ChangeEvent<HTMLInputElement>) => setMail({...mail, [e.target.name]: e.target.value})
    const onChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => setComment(e.target.value)

    const sendMessage = () => {
        dispatch({
            type: SEND_MESSAGE_TO_MAIL,
            payload: {studentId: studentProfile?.id, subject: mail.subject, body: mail.body}
        })
    }

    const createReprimand = () => {
        dispatch({
            type: CREATE_REPRIMAND,
            payload: {userId: studentProfile?.id, comment: comment}
        })
        setComment('')
    }

    const showImage = () => setImageClick(!imageClick)

    return <div>

        <Dialog TransitionComponent={Transition}
                keepMounted
                fullScreen={true}
                open={props}
                onClose={handleClose}
                aria-labelledby="form-title"
                fullWidth={true}
                style={{display: 'flex', justifyContent: "center"}}
        >
            <AlertComponent/>
            <DialogTitle id="form-title" style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '20px'
            }}>{t('payments.title')}</DialogTitle>
            <Divider component="li"/>
            <div style={{display: 'flex', width: '100%'}}>
                <DialogContent style={{width: '400px'}}>
                    <div className={classes.mailBlock}>
                        <Avatar onClick={() => showImage()} sx={{width: 100, height: 100, marginTop: '15px'}}
                                alt={studentProfile?.name}
                                src={studentProfile?.image}/>
                        <div>
                            <div className={classes.desInfoOccupancyBlockItem}>
                                <h3 style={{fontWeight: 100}}>{t('payments.surname')}: </h3>
                                <h2 style={{margin: '0px 0px 0px 15px'}}>{studentProfile?.surname}</h2>
                            </div>
                            <div className={classes.desInfoOccupancyBlockItem}>
                                <h3 style={{fontWeight: 100}}>{t('payments.name')}: </h3>
                                <h2 style={{margin: '0px 0px 0px 15px'}}>{studentProfile?.name}</h2>
                            </div>
                            <div className={classes.desInfoOccupancyBlockItem}>
                                <h3 style={{fontWeight: 100}}>{t('payments.patronymic')}: </h3>
                                <h2 style={{margin: '0px 0px 0px 15px'}}>{studentProfile?.patronymic}</h2>
                            </div>
                            <div className={classes.desInfoOccupancyBlockItem}>
                                <h3 style={{fontWeight: 100}}>{t('admin.phone')}: </h3>
                                <h2 style={{margin: '0px 0px 0px 15px'}}>{studentProfile?.phone}</h2>
                            </div>

                            <div className={classes.desInfoOccupancyBlockItem}>
                                <h3 style={{fontWeight: 100}}>{t('admin.mail')}: </h3>
                                <h2 style={{margin: '0px 0px 0px 15px'}}>{studentProfile?.mail}</h2>
                            </div>

                        </div>
                    </div>

                    <div style={{
                        display: 'flex',
                        width: '400px',
                        marginTop: '10px',
                        flexDirection: 'column',
                        borderRadius: '5px',
                        border: '1px solid black'
                    }}>
                        <TextField
                            placeholder="Mail subject"
                            label={t('detailedInfo.mailSubject')}
                            name='subject'
                            style={{width: '400px'}}
                            variant="filled"
                            onChange={onChangeMail}
                        />
                        <TextField
                            id="outlined-multiline-static"
                            label={t('detailedInfo.mailBody')}
                            multiline
                            style={{width: '400px'}}
                            rows={7}
                            onChange={onChangeMail}
                            name='body'
                        />
                        <IconButton aria-label="search"
                                    onClick={sendMessage}
                                    color={"success"}
                                    edge={"end"}>
                            {t('detailedInfo.send')}
                            <SendSharpIcon color='success'/>
                        </IconButton>
                    </div>
                </DialogContent>

                <DialogContent>

                    {occupancy &&
                    <div className={classes.desInfoOccupancyBlock}>
                        <div className={classes.desInfoOccupancyBlockItem}>
                            <h3 style={{fontWeight: 100}}>{t('detailedInfo.dormitoryNumber')}: </h3>
                            <h2 style={{marginLeft: '15px'}}>{occupancy.dormitory}</h2>
                        </div>
                        <div className={classes.desInfoOccupancyBlockItem}>
                            <h3 style={{fontWeight: 100}}>{t('detailedInfo.roomNumber')}: </h3>
                            <h2 style={{marginLeft: '15px'}}>{occupancy.room}</h2>
                        </div>
                        <div className={classes.desInfoOccupancyBlockItem}>
                            <h3 style={{fontWeight: 100}}>{t('detailedInfo.price')}: </h3>
                            <h2 style={{marginLeft: '15px'}}>{occupancy.price}</h2>
                        </div>

                        <div className={classes.desInfoOccupancyBlockItem}>
                            <h3 style={{fontWeight: 100}}>{t('detailedInfo.login')}: </h3>
                            <h2 style={{marginLeft: '15px'}}>{occupancy.userLogin}</h2>
                        </div>
                        <div className={classes.desInfoOccupancyBlockItem}>
                            <h3 style={{fontWeight: 100}}>{t('detailedInfo.checkInDate')}: </h3>
                            <h2 style={{marginLeft: '15px'}}>{getFullDate(occupancy.checkInDate)}</h2>
                        </div>

                        <div className={classes.desInfoOccupancyBlockItem}>
                            <h3 style={{fontWeight: 100}}>{t('detailedInfo.checkOutDate')}: </h3>
                            <h2 style={{marginLeft: '15px'}}>{occupancy.checkOutDate}</h2>
                        </div>

                    </div>}


                    <div className={classes.createReprimandBlock}>
                        <h2 className={classes.createReprimandTittle}>{t('detailedInfo.reprimandTitle')}</h2>
                        <TextField id="outlined-multiline-static"
                                   label={t('detailedInfo.reprimandCommentBody')}
                                   multiline style={{width: '400px'}}
                                   rows={7} onChange={onChangeComment} name='body'
                        />
                        <IconButton aria-label="search"
                                    onClick={createReprimand}
                                    color={"success"} edge={"end"}
                        >
                            {t('detailedInfo.create')}
                        </IconButton>
                    </div>
                </DialogContent>

                <DialogContent>
                     <span
                         className={classes.progressLinesTittle}
                     >
                        {t('detailedInfo.countOfArrears') + ' за ' + debts?.totalCountDepts + ' месяца'}
                    </span>
                    <ProgressLine
                        completed={(debts?.totalCountDepts ?? 0) > 10 ? 400 : (debts?.totalCountDepts ?? 0) * 30}
                        text={`${(debts?.totalCountDepts ?? 0)}`}
                        height={40} fontSize={'0.7rem'}
                        blockMaxWidth={400} margin={0}
                    />

                    <span className={classes.progressLinesTittle} style={{marginTop: '20px'}}>
                        Количество задолженостей в денежном эквиваленте
                    </span>
                    <div style={{marginTop: '10px'}}>
                        <ProgressLine
                            completed={(debts?.totalSumDepts ?? 0) > 10 ? 400 : (debts?.totalSumDepts ?? 0)}
                            text={`${(debts?.totalSumDepts ?? 0)} Br`}
                            height={40} fontSize={'0.7rem'}
                            blockMaxWidth={400} margin={0}
                        />
                    </div>

                    {Boolean(reprimands.length) &&
                    <Button variant={'outlined'} style={{marginTop: '10px', width: '400px'}}
                            onClick={() => setShowReprimand(!showReprimand)}
                    >
                        {showReprimand ? t('reprimandItem.hideReprimands') : t('reprimandItem.showReprimands')}
                    </Button>}

                    <div>
                        {showReprimand && Boolean(reprimands.length) && <div className={classes.reprimands}>
                            {reprimands.map((x, index) => {
                                return <ReprimandItem key={index} item={x} index={index}/>
                            })}
                        </div>}
                    </div>

                </DialogContent>
            </div>


            <Divider component="li"/>

            <DialogActions>
                <Button
                    onClick={handleClose}
                    color='primary'
                >
                    {t('admin.cancel')}
                </Button>
            </DialogActions>
        </Dialog>

        {imageClick && <OpenImage/>}
    </div>
}

