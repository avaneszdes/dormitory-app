import React, {useEffect, useState} from 'react';
import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Slide,
    TextField,
    Typography
} from '@material-ui/core';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import './StudentProfile.css'
import {IRootState} from "../../Redux/configureStore";
import {useDispatch, useSelector} from "react-redux";
import {
    EDIT_USER,
    GET_OCCUPANCY_DATA_BY_LOGIN,
    GET_STUDENT_PROFILE_BY_ID,
    SEND_REQUEST_TO_CHANGE_USER_PASSWORD,
} from "../../Redux/constants";
import {TransitionProps} from "@material-ui/core/transitions";
import AlertComponent from "../Alerts/SuccessAlert";
import {useFormik} from "formik";
import {useTranslation} from "react-i18next";
import {getFullDate, regexes} from "../Global";
import * as yup from 'yup'
import {Box} from "@mui/material";


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const {phoneRegExp} = regexes
const vScheme = yup.object().shape({
    phone: yup.string().required("required")
        .matches(new RegExp(phoneRegExp), 'Phone number is not valid')
        .min(9, "To short")
        .max(13, "To long"),
    mail: yup.string().email('Incorrect email address'),
})

const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
}))(Badge);

export default function StudentProfile() {

    const classes = useStyles()
    const dispatch = useDispatch()
    const [inputEditHideBtn, setInputEditHideBtn] = useState(false)
    const auth = useSelector((rootState: IRootState) => rootState.auth)
    const occupancy = useSelector((rootState: IRootState) => rootState.occupancy.occupancy)
    const {t} = useTranslation();


    useEffect(() => {
        dispatch({type: GET_STUDENT_PROFILE_BY_ID, payload: auth.id})
        dispatch({type: GET_OCCUPANCY_DATA_BY_LOGIN, payload: auth.login})
    }, []);

    const profile = useSelector((profile: IRootState) => profile.student.profile)

    const val = {
        phone: '',
        mail: '',
    }
    const formik = useFormik({
        initialValues: val,
        enableReinitialize: true,
        validationSchema: vScheme,
        onSubmit: (values) => {
            const updateUserObj = {
                id: auth.id,
                name: profile?.name,
                surname: profile?.surname,
                patronymic: profile?.patronymic,
                phone: values.phone || profile?.phone,
                mail: values.mail || profile?.mail,
                image: profile?.image
            }
            dispatch({type: EDIT_USER, payload: updateUserObj})
            formik.values.mail = ''
            formik.values.phone = ''
            setInputEditHideBtn(!inputEditHideBtn);
        }
    })


    const imageHandler = (target: any) => {

        const reader = new FileReader();
        reader.onload = (e: any) => {
            const updateUserObj = {
                id: auth.id,
                name: profile?.name,
                surname: profile?.surname,
                patronymic: profile?.patronymic,
                phone: profile?.phone,
                mail: profile?.mail,
                image: e.target.result
            }

            dispatch({type: EDIT_USER, payload: updateUserObj})
        };

        if (target.target.files[0]) {
            reader.readAsDataURL(target.target.files[0])
        }
    }
    const getPasswordAndEmail = (email: string) => {
        dispatch({type: SEND_REQUEST_TO_CHANGE_USER_PASSWORD, payload: email})
    }
    const handleClose = () => {
        setInputEditHideBtn(!inputEditHideBtn);
    }
    const role = auth.role ? auth.role?.substr(5, auth.role.length)[0].concat(auth.role?.substr(6, auth.role.length).toLocaleLowerCase()) : ''

    return <Container maxWidth="xl" className={classes.container}>
        <AlertComponent/>
        <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            marginBottom: '10px',
            justifyContent: "space-between",
            marginTop: '40px'
        }} >
            <div className={classes.main}>
                <Typography variant="h5" component="h2" style={{margin: '10px'}}>
                    {role}
                </Typography>
                <div className={classes.avatarBlock}>
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        variant="dot"
                    >
                        <Avatar alt="Remy Sharp" src={profile?.image} className={classes.avatar}/>

                    </StyledBadge>
                    <div className='change-photo_wrapper'>
                        <label className="custom-file-upload">
                            {t('studentProfile.updatePhoto')}
                            <input
                                accept="image/*"
                                onChange={imageHandler}
                                type="file"
                            />
                        </label>
                    </div>
                </div>
                <div className={classes.userBlock}>
                    <Typography variant="h5" component="h2">
                        {profile?.surname}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {profile?.name}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {profile?.patronymic}
                    </Typography>
                </div>
            </div>
            <div className={classes.userData}>
                <div className={classes.template}>
                    <Typography variant="h5" component="h2">
                        {t('studentProfile.personalInformation')}
                    </Typography>
                    <Divider component="li" style={{width: '500px'}}/>

                    <div className={classes.userDataItem}>
                        <Typography variant="h5" component="h2">
                            {t('studentProfile.login')}
                        </Typography>

                        <Typography variant="h6" component="h2">
                            {profile?.login}
                        </Typography>

                    </div>

                    <div className={classes.userDataItem}>
                        <Typography variant="h5" component="h2">
                            {t('studentProfile.email')}
                        </Typography>
                        <Typography variant="h6" component="h2">
                            {profile?.mail}
                        </Typography>
                    </div>


                    <div className={classes.userDataItem}>
                        <Typography variant="h5" component="h2">
                            {t('studentProfile.phone')}
                        </Typography>

                        <Typography variant="h6" component="h2">
                            {profile?.phone}
                        </Typography>
                    </div>
                    <div className={classes.updateUserDataBlock}>
                        <Button className="btn-one" onClick={() => getPasswordAndEmail("")}>
                            {t('studentProfile.changePassword')}
                        </Button>
                        <Button className="btn-one" onClick={handleClose}>
                            {t('studentProfile.updateData')}
                        </Button>
                    </div>
                </div>
            </div>
            {occupancy &&
            <div className={classes.userOccupancyData}>
                <div className={classes.template}>
                    <Typography variant="h5" component="h2">
                        {t('studentProfile.occupationHeader')}
                    </Typography>
                    <Divider component="li" style={{width: '500px'}}/>

                    <div className={classes.userOccupancyDataItem}>
                        <Typography variant="h5" component="h2">
                            {t('detailedInfo.dormitoryNumber')}:
                        </Typography>

                        <Typography style={{marginLeft: '15px'}} variant="h6" component="h2">
                            {occupancy?.dormitory}
                        </Typography>
                    </div>


                    <div className={classes.userOccupancyDataItem}>
                        <Typography variant="h5" component="h2">
                            {t('detailedInfo.roomNumber')}:
                        </Typography>
                        <Typography style={{marginLeft: '15px'}} variant="h6" component="h2">
                            {occupancy?.room}
                        </Typography>
                    </div>

                    <div className={classes.userOccupancyDataItem}>
                        <Typography variant="h5" component="h2">
                            {t('detailedInfo.price')}:
                        </Typography>

                        <Typography style={{marginLeft: '15px'}} variant="h6" component="h2">
                            {occupancy?.price} Br
                        </Typography>
                    </div>

                    <div className={classes.userOccupancyDataItem}>
                        <Typography variant="h5" component="h2">
                            {t('detailedInfo.checkInDate')}:
                        </Typography>

                        <Typography style={{marginLeft: '15px'}} variant="h6" component="h2">
                            {getFullDate(occupancy?.checkInDate)}
                        </Typography>
                    </div>
                    <div className={classes.userOccupancyDataItem}>
                        <Typography variant="h5" component="h2">
                            {t('detailedInfo.checkOutDate')}:
                        </Typography>

                        <Typography style={{marginLeft: '15px'}} variant="h6" component="h2">
                            {occupancy?.checkOutDate}
                        </Typography>
                    </div>

                    <div className={classes.userOccupancyDataItem}>
                        <Typography variant="h5" component="h2">
                            {t('detailedInfo.status')}:
                        </Typography>

                        <Typography style={{marginLeft: '15px'}} variant="h6" component="h2">
                            {occupancy?.status}
                        </Typography>
                    </div>


                </div>
            </div>}
            <Dialog TransitionComponent={Transition}
                    keepMounted
                    open={inputEditHideBtn}
                    onClose={handleClose}
                    aria-labelledby="form-title"
            >
                <DialogTitle id="form-title">Update user`s data</DialogTitle>
                <form onSubmit={formik.handleSubmit}>
                    <DialogContent>
                        <TextField
                            placeholder="Write your email"
                            name='mail'
                            id='mailId'
                            label="Email address"
                            style={{width: '400px'}}
                            onChange={formik.handleChange}
                            error={formik.touched.mail && Boolean(formik.errors.mail)}
                            value={formik.values.mail}
                            helperText={formik.touched.mail && formik.errors.mail}
                        />
                    </DialogContent>
                    <DialogContent>
                        <TextField
                            placeholder="Write your phone number"
                            label="Phone number"
                            name='phone'
                            id='phoneId'
                            style={{width: '400px'}}
                            onChange={formik.handleChange}
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            value={formik.values.phone}
                            helperText={formik.touched.phone && formik.errors.phone}
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button
                            type='submit'
                            color='primary'
                        >
                            Update
                        </Button>
                        <Button
                            onClick={handleClose}
                            color='primary'
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>


        </Box>

    </Container>
}
const useStyles = makeStyles(() => (
    {
        mainPaper: {
            marginTop: '10px',
            height: '600px',
            width: '1400px',
            display: 'flex',
            backgroundColor: '#f7f7f7',
            flexDirection: 'row',
        },
        avatar: {
            width: '130px',
            height: '130px',
        },
        container: {
            marginTop: '100px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: "center"

        },
        changePhoto: {
            width: '20px',
            height: '20px',
            backgroundRepeat: 'no-repeat',
        },
        userData: {
            paddingLeft: '30px',
            width: '510px',
            flexDirection: 'row',
            backgroundColor: '#e2fae5',
            border: '0.2px solid #a3f3b0',
            height: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
            display: 'block'
        },
        userOccupancyData: {
            marginLeft: 'auto',
            marginRight: 'auto',
            display: 'block',
            paddingLeft: '30px',
            width: '510px',
            flexDirection: 'row',
            backgroundColor: '#e6fce8',
            height: '600px'
        },
        template: {
            width: '700px',
            height: '400px',
            margin: '20px 10px 3px 0',
        },
        paper: {
            backgroundColor: '#f7f7f7',
            display: 'flex',
            justifyContent: 'space-between',
            paddingLeft: '5px',
            marginBottom: '5px',
        },
        main: {
            width: '20vh',
            minWidth: '400px',
            maxWidth: '550px',
            backgroundColor: '#d7fddd',
            height: '600px',
            flexDirection: 'column',
            marginLeft: 'auto',
            marginRight: 'auto',
            display: 'block'
        },
        avatarBlock: {
            marginLeft: '33%',
            marginTop: '90px'
        },
        userBlock: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '120px',
            marginTop: '20px'
        },
        userDataItem: {
            width: "300px",
            marginTop: '40px',
        },
        userOccupancyDataItem: {
            display: 'flex',
            marginTop: '40px',
        },
        updateUserDataBlock: {
            display: 'flex',
            marginTop: '55px',
            height: '100px',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }
    }))
