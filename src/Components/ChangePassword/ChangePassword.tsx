import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import * as yup from "yup";
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import {CHANGE_USER_PASSWORD} from "../../Redux/constants";
import {ChangePasswordInterface} from "../../Interfaces";
import AlertComponent from "../Alerts/SuccessAlert";
import {regexes} from "../Global";
import {useTranslation} from "react-i18next";
import {useChangePasswordStyles} from "./ChangePasswordStyles";


const {password} = regexes
const vScheme = yup.object().shape({
    oldPassword: yup.string().required("required").matches(new RegExp(password), 'Phone number is not valid'),
    newPassword: yup.string().required("required").matches(new RegExp(password), 'Phone number is not valid'),
    verifiedPassword: yup.string().required("required").matches(new RegExp(password), 'Phone number is not valid'),
})

export default function ChangePassword() {

    const classes = useChangePasswordStyles();
    const dispatch = useDispatch()
    const {t} = useTranslation();

    const formik = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            verifiedPassword: '',
        },
        validationSchema: vScheme,
        onSubmit: (values) => {
            const confirmationForm: ChangePasswordInterface = {
                oldPassword: values.oldPassword,
                newPassword: values.newPassword,
                verifiedPassword: values.newPassword,
                guid: window.location.href.substring(42,window.location.href.length)
            }
            dispatch({type: CHANGE_USER_PASSWORD, payload: confirmationForm})
        }
    })


    return (
        <Container component="main" maxWidth="xs" style={{marginTop: '90px'}}>
            <CssBaseline/>
            <AlertComponent/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    {t('changePassword.tittle')}
                </Typography>
                <form className={classes.form} onSubmit={formik.handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="oldPassword"
                        label={t('changePassword.oldPassword')}
                        name="oldPassword"
                        type="password"
                        autoFocus
                        onChange={formik.handleChange}
                        error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
                        value={formik.values.oldPassword}
                        helperText={formik.touched.oldPassword && formik.errors.oldPassword}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="newPassword"
                        label={t('changePassword.newPassword')}
                        type="password"
                        id="newPassword"
                        onChange={formik.handleChange}
                        error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                        value={formik.values.newPassword}
                        helperText={formik.touched.newPassword && formik.errors.newPassword}
                    />

                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="verifiedPassword"
                        label={t('changePassword.verifiedPassword')}
                        type="password"
                        id="verifiedPassword"
                        onChange={formik.handleChange}
                        error={formik.touched.verifiedPassword && Boolean(formik.errors.verifiedPassword)}
                        value={formik.values.verifiedPassword}
                        helperText={formik.touched.verifiedPassword && formik.errors.verifiedPassword}
                    />
                    <Button
                        id={"signIn"}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        {t('changePassword.changeBtn')}
                    </Button>
                </form>
            </div>
        </Container>
    );
}
