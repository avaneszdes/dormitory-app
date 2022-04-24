import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import AlertComponent from "../Alerts/SuccessAlert";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import React, {useEffect, useState} from "react";
import {IPaymentInterface, IStudentProfileInterface} from "../../Interfaces";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../Redux/configureStore";
import {
    CHANGE_PRICE,
    CLEAR_ALERT_MESSAGE_SUCCEED,
    GET_STUDENT_PROFILE_BY_ID,
    SEND_COMMENT,
    UPLOAD_RECEIPT
} from "../../Redux/constants";
import CardMedia from '@mui/material/CardMedia';
import {saveAs} from 'file-saver'
import Button from "@material-ui/core/Button";
import {useTranslation} from "react-i18next";
import {
    Divider,
    FormControl,
    FormControlLabel,
    FormLabel,
    IconButton,
    InputAdornment,
    InputBase,
    OutlinedInput,
    Paper,
    Radio,
    RadioGroup
} from "@mui/material";
import SendSharpIcon from '@mui/icons-material/SendSharp';
import EripForm from "./EripForm";
import {getFullDate} from "../Global";
import {useModalStyles} from "./PaymentStyles";

interface Props {
    props: { studentId: number, id: number, open: boolean }
    setProps: (arg: any) => void
}


export function PaymentModal({props, setProps}: Props) {

    const classes = useModalStyles();
    const dispatch = useDispatch()
    const payments: IPaymentInterface[] = useSelector((profile: IRootState) => profile.payments)
    const profile: IStudentProfileInterface | null = useSelector((profile: IRootState) => profile.student.profile)
    const auth = useSelector((profile: IRootState) => profile.auth)
    const [comment, setComment] = useState('')
    const [showEripForm, setShowEripForm] = useState(false)
    const [commentType, setCommentType] = useState('Approve')
    const payment: IPaymentInterface = payments.filter(x => x.id === props.id)[0]
    const [price, setPrice] = useState<number>(payment.amount)
    const {t} = useTranslation();

    useEffect(() => {
        dispatch({type: GET_STUDENT_PROFILE_BY_ID, payload: props.studentId})
        dispatch({type: CLEAR_ALERT_MESSAGE_SUCCEED, payload: {message: "", type: true}})
    }, []);

    const handleClose = () => {
        setProps({studentId: 0, id: 0, open: false})
    };

    const onCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => setComment(e.currentTarget.value)

    const onChangeRadioGroup = (e: React.ChangeEvent<HTMLInputElement>) => setCommentType(e.currentTarget.value)

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => setPrice(+e.currentTarget.value)

    const sendComment = (paymentId: number, comment: string, commentType: string) => {
        const commentTypeToSend = commentType === 'Approve'
        dispatch({type: SEND_COMMENT, payload: {id: paymentId, comment: comment, commentType: commentTypeToSend}})
    }

    const changePrice = () => {
        dispatch({type: CHANGE_PRICE, payload: {newPrice: price, paymentId: payment.id}})
    }

    const uploadImage = (target: any) => {
        setShowEripForm(false)
        const reader = new FileReader();

        reader.onload = (e: any) => {

            const updateReceipt: IPaymentInterface = {
                id: payment.id,
                receipt: e.target.result,
                amount: payment.amount,
                status: payment.status,
                comment: payment.comment,
                userId: payment.userId,
                date: payment.date
            }
            dispatch({type: UPLOAD_RECEIPT, payload: updateReceipt})
        };

        if (target.target.files[0]) {
            reader.readAsDataURL(target.target.files[0])
        }
    }

    const downloadImage = (img: string) => {

        const base64 = img.split(',')[1]
        const contentType = img.split(',')[0]

        function base64toBlob(base64Data: string, contentType: string) {
            contentType = contentType || '';
            const sliceSize = 1024;
            const byteCharacters = atob(base64Data);
            const bytesLength = byteCharacters.length;
            const slicesCount = Math.ceil(bytesLength / sliceSize);
            const byteArrays = new Array(slicesCount);

            for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
                const begin = sliceIndex * sliceSize;
                const end = Math.min(begin + sliceSize, bytesLength);

                const bytes = new Array(end - begin);
                for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
                    bytes[i] = byteCharacters[offset].charCodeAt(0);
                }
                byteArrays[sliceIndex] = new Uint8Array(bytes);
            }
            return new Blob(byteArrays, {type: contentType});
        }

        const blob = base64toBlob(base64, contentType)
        saveAs(blob, `${profile?.surname} ${profile?.name[0]}. ${payment.date}.jpg`)
    }

    return (
        <div>
            {profile && <Modal
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
                        <Divider style={{marginTop: '10px'}} component="li"/>
                        <div style={{margin: '10px 0px 0px 0px', display: "flex", justifyContent: 'center'}}>
                            {t('payments.paymentId')}: {payment && payment.id}
                        </div>
                        <Divider style={{margin: '10px 0px 10px 0px'}} component="li"/>

                        <div style={{
                            width: '600px',
                            height: '250px',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: "space-between"
                        }}>
                            <div style={{
                                width: '250px',
                                height: `${auth.role === "ROLE_ADMINISTRATOR" ? '260px' : '205px'}`,
                                border: '0.5px solid',
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: '8px',
                            }}
                            >

                                <div style={{paddingLeft: '10px', display: 'flex', flexDirection: 'row'}}>
                                    <h3 style={{fontWeight: 100}}>{t('payments.createdDate')}:</h3>
                                    <h3 style={{paddingLeft: '10px'}}>{getFullDate(payment.date)}</h3>
                                </div>

                                <div style={{paddingLeft: '10px', display: 'flex', flexDirection: 'row'}}>
                                    <h3 style={{fontWeight: 100}}>{t('payments.status')}: </h3>
                                    <h3 style={{marginLeft: '5px', fontStyle: 'italic'}}>{payment.status}</h3>
                                </div>

                                <div style={{paddingLeft: '10px', display: 'flex', flexDirection: 'row'}}>
                                    <h3 style={{fontWeight: 100}}>{t('payments.price')}:</h3>
                                    {auth.role === "ROLE_ADMINISTRATOR" &&
                                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                            <OutlinedInput
                                                id="outlined-adornment-weight"
                                                value={price}
                                                onChange={handlePriceChange}
                                                endAdornment={<InputAdornment position="end">Br</InputAdornment>}
                                                aria-describedby="outlined-weight-helper-text"
                                                inputProps={{
                                                    'aria-label': 'weight',
                                                }}
                                            />
                                        </FormControl>}

                                    {auth.role === "ROLE_STUDENT" &&
                                    <h3 style={{marginLeft: '5px', fontStyle: 'italic'}}>{payment.amount}Br</h3>}
                                </div>


                                {auth.role === "ROLE_ADMINISTRATOR" &&
                                <Button
                                    onClick={changePrice}
                                    variant="contained"
                                    component="label"
                                    color="primary"
                                    style={{marginLeft: '5px', width: '240px'}}
                                >
                                    {t('payments.changePrice')}
                                </Button>
                                }
                            </div>
                            <div style={{
                                width: '250px',
                                height: '200px',
                                border: '0.5px solid',
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: '8px',
                            }}>
                                <div>
                                    <div style={{paddingLeft: '10px', display: 'flex', flexDirection: 'row'}}>
                                        <h3 style={{fontWeight: 100}}>{t('payments.surname')}: </h3>
                                        <h3 style={{marginLeft: '5px', fontStyle: 'italic'}}>{profile.surname}</h3>
                                    </div>
                                    <div style={{paddingLeft: '10px', display: 'flex', flexDirection: 'row'}}>
                                        <h3 style={{fontWeight: 100}}>{t('payments.name')}: </h3>
                                        <h3 style={{marginLeft: '5px', fontStyle: 'italic'}}>{profile.name}</h3>
                                    </div>
                                    <div style={{paddingLeft: '10px', display: 'flex', flexDirection: 'row'}}>
                                        <h3 style={{fontWeight: 100}}>{t('payments.patronymic')}: </h3>
                                        <h3 style={{
                                            marginLeft: '5px',
                                            fontStyle: 'italic'
                                        }}>{profile.patronymic}</h3>
                                    </div>

                                </div>
                            </div>
                        </div>


                        <div>
                            {payment.status !== 'APPROVED' && auth.role === "ROLE_STUDENT"  &&
                            <Button
                                onChange={uploadImage}
                                variant="contained"
                                component="label"
                                color="primary"
                                style={{marginTop: '5px'}}
                            >
                                {t('payments.uploadReceipt')}
                                <input
                                    type="file"
                                    hidden
                                />
                            </Button>
                            }

                            {payment.status !== 'APPROVED' && auth.role === "ROLE_STUDENT" &&
                            <Button
                                onClick={() => setShowEripForm(true)}
                                variant="contained"
                                component="label"
                                color="primary"
                                style={{margin: '5px 0px 0px 10px' }}
                            >
                                {t('payments.eripPay')}
                            </Button>
                            }
                        </div>


                        {!showEripForm &&
                        <div style={{ marginTop: '30px'}}>
                            <h3 style={{fontWeight: 100}}>{payment.receipt ? t('payments.pressToDownload') : t('payments.receipt')}</h3>
                            <CardMedia
                                component="img"
                                height="200"
                                width='200'
                                image={payment.receipt}
                                alt="Receipt not found"
                                onClick={() => downloadImage(payment.receipt)}
                            />
                        </div>}

                        {showEripForm && <EripForm/>}

                        {auth.role === "ROLE_STUDENT" && <div style={{display: 'flex', flexDirection: 'row'}}>
                            <h3>{t('payments.comment')}: </h3>
                            <h3 style={{marginLeft: '10px'}}>{payment.comment}</h3>
                        </div>}
                        {auth.role === "ROLE_ADMINISTRATOR" &&
                        <div>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Action</FormLabel>
                                <RadioGroup
                                    value={commentType}
                                    onChange={onChangeRadioGroup}
                                >
                                    <FormControlLabel value="Approve" control={<Radio/>} label="Approve"/>
                                    <FormControlLabel value="Decline" control={<Radio color="error"/>}
                                                      label="Decline"/>
                                </RadioGroup>
                            </FormControl>
                            <Paper
                                sx={{p: '2px 4px', display: 'flex', alignItems: 'center', marginTop: '20px'}}
                            >
                                <InputBase
                                    onChange={onCommentChange}
                                    size={'medium'}
                                    sx={{ml: 1, flex: 1}}
                                    placeholder="Write comment"
                                    inputProps={{'aria-label': 'comment'}}
                                />
                                <Divider sx={{height: 28, m: 0.5}} orientation="vertical"/>
                                <IconButton onClick={() => sendComment(payment.id, comment, commentType)}
                                            sx={{p: '10px'}}
                                            aria-label="search">
                                    <SendSharpIcon/>
                                </IconButton>
                            </Paper>
                        </div>
                        }
                    </div>
                </Fade>
            </Modal>}
        </div>
    )

}

