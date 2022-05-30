import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import * as yup from "yup";
import {useTranslation} from "react-i18next";
import {AUTHORIZATION, LOG_OUT} from '../../Redux/constants';
import {AuthenticationDto} from "../../Interfaces";
import AlertComponent from "../Alerts/SuccessAlert";
import {IRootState} from "../../Redux/configureStore";
import {regexes} from "../Global";
import Loading from '../Loading/Loading';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: '21vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const {password, login} = regexes
const vScheme = yup.object().shape({
    password: yup.string().required("Required").matches(new RegExp(password), 'Password is not valid'),
    login: yup.string().required("Required").matches(new RegExp(login), 'Login is not valid'),
})

export default function SignIn() {
    const {t} = useTranslation()
    const classes = useStyles()
    const dispatch = useDispatch()
    const exp = useSelector((profile: IRootState) => profile.auth.exp)
    const loading = useSelector((x: IRootState) => x.alert.loading)
    const initValues: AuthenticationDto = {
        login: '',
        password: ''
    }


    const [inputEditHideBtn, setInputEditHideBtn] = useState(false)
    const formik = useFormik({
        initialValues: initValues,
        validationSchema: vScheme,
        onSubmit(values: AuthenticationDto) {

            if (exp !== undefined && Date.now() >= exp * 1000) {
                localStorage.setItem('token', '')
                dispatch({type: LOG_OUT, payload: ''})
            }
            dispatch({type: AUTHORIZATION, payload: values})
        },
    })

    const handleClose = () => {
        setInputEditHideBtn(!inputEditHideBtn);
    }

    return (
        <Container component="main" maxWidth="xs" style={{marginTop: '70px'}}>
            <AlertComponent/>
            <Loading hidden={loading}/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    {t('authorization.signInHeader')}
                </Typography>
                <form className={classes.form} onSubmit={formik.handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="login"
                        label={t('authorization.labelLogin')}
                        name={t('authorization.login')}
                        autoComplete="login"
                        autoFocus
                        onChange={formik.handleChange}
                        error={formik.touched.login && Boolean(formik.errors.login)}
                        value={formik.values.login}
                        helperText={formik.touched.login && formik.errors.login}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name={t('authorization.password')}
                        label={t('authorization.labelPassword')}
                        type="password"
                        autoComplete={"current-password"}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        value={formik.values.password}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <Button
                        id={"signIn"}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        {t('authorization.signInButton')}
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" onClick={handleClose} variant="body2">
                                {t('authorization.forgotPasswordLink')}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>

    )
}
