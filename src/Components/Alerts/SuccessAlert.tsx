import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../Redux/configureStore";
import {makeStyles} from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import {Snackbar} from '@mui/material';
import {AlertInterface} from "../../Interfaces";
import {CLEAR_ALERT_MESSAGE_SUCCEED} from "../../Redux/constants";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            margin: theme.spacing(10),

        },
    },
}));


const AlertComponent = () => {

    const classes = useStyles();
    const dispatch = useDispatch()
    const alert: AlertInterface = useSelector((errorMessage: IRootState) => errorMessage.alert.alert)
    const alertSeverity = alert.type ? "success" : "error"

    return (
        <div className={classes.root}>
            <Snackbar open={Boolean(alert.message)} autoHideDuration={20000} onClose={() => {
                dispatch({
                    type: CLEAR_ALERT_MESSAGE_SUCCEED,
                    payload:
                        {
                            message: '',
                            type: alertSeverity === "success"
                        }
                })
            }}>
                <Alert onClose={() => {
                    dispatch({
                        type: CLEAR_ALERT_MESSAGE_SUCCEED,
                        payload:
                            {
                                message: '',
                                type: alertSeverity === "success"
                            }
                    })
                }} severity={alertSeverity} >
                    {alert.message}
                </Alert>
            </Snackbar>

        </div>
    );
}
export default AlertComponent
