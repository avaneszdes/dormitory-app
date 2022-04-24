import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../Redux/configureStore";
import {Collapse} from "@material-ui/core";
import {CLEAR_ALERT_MESSAGE_SUCCEED} from '../../Redux/constants';
import {makeStyles} from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import {AlertInterface} from "../../Interfaces";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
            marginBottom: '10px'
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
            <Collapse in={Boolean(alert.message)}>
                <Alert variant="outlined"
                       severity={alertSeverity}
                       onClose={() => {
                           dispatch({
                               type: CLEAR_ALERT_MESSAGE_SUCCEED,
                               payload:
                                   {
                                       message: '',
                                       type: alertSeverity === "success"
                                   }
                           })
                       }}>
                    {alert.message}
                </Alert>
            </Collapse>
        </div>
    );
}
export default AlertComponent
