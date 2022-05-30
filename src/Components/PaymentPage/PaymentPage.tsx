import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../Redux/configureStore";
import {CLEAR_ALERT_MESSAGE_SUCCEED, GET_ALL_PAYMENTS_BY_ID} from "../../Redux/constants";
import Button from "@material-ui/core/Button";
import {Menu, MenuItem} from "@material-ui/core";
import {IPaymentInterface} from "../../Interfaces";
import {PaymentModal} from "./PaymentModal";
import {useTranslation} from "react-i18next";
import {usePageStyles} from "./PaymentStyles";
import PaymentGrid from "./PaymentGrid";

interface PaymentObj {
    processing: boolean,
    approved: boolean,
    waiting: boolean,
    expired: boolean,
    declined: boolean
}

function PaymentPage(state: any) {

    const dispatch = useDispatch()
    const classes = usePageStyles()
    const payments: IPaymentInterface[] = useSelector((profile: IRootState) => profile.payments)
    const auth = useSelector((profile: IRootState) => profile.auth)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const handleLanguageClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)
    const [props, setProps] = React.useState({studentId: 0,id: 0, open: false});
    const [yearToShow, setYearToShow] = React.useState(new Date().getFullYear().toString());
    const {t} = useTranslation();
    const [showPayments, setShowPayments] = React.useState<PaymentObj>({
        processing: true,
        approved: true,
        waiting: true,
        expired: true,
        declined: true
    });

    const yearNow = new Date().getFullYear()
    const studentId: number = isNaN(state.location.state) ? auth.id : +state.location.state

    useEffect(() => {
        dispatch({type: GET_ALL_PAYMENTS_BY_ID, payload: {studentId: studentId, year: yearNow.toString()}})
        dispatch({type: CLEAR_ALERT_MESSAGE_SUCCEED, payload: {message: "", type: true}})
    }, []);


    const handleMenuClose = (year: string) => {
        dispatch({type: GET_ALL_PAYMENTS_BY_ID, payload: {studentId: studentId, year: year}})
        setYearToShow(year)
        setAnchorEl(null)
    }

    return (
        <div style={{margin: '70px 30px 0px 30px'}}>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '19%', justifyContent: "space-between"}}>
                <div>
                    <Button variant={'outlined'} aria-controls="simple-menu"
                             onClick={handleLanguageClick}>
                        <h5>{t('payments.paymentsByYear')}</h5>
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={() => handleMenuClose((yearNow - 1).toString())}>{yearNow - 1}</MenuItem>
                        <MenuItem onClick={() => handleMenuClose(yearNow.toString())}>{yearNow}</MenuItem>
                    </Menu>
                </div>
                    {payments.length === 0 &&
                    <h2 style={{left: '40%', top: '45%', position: 'absolute'}} >
                        {t('payments.zeroPayments') + ' ' + yearToShow}
                    </h2>}

            </div>
            {auth.token && payments.length > 0 &&
            <div>
                <div style={{marginTop: '20px', display: 'flex'}}>
                    <div className={classes.waitingPayments}>
                        <Button onClick={() => {
                            setShowPayments({...showPayments, waiting: !showPayments.waiting})
                        }}>
                            {t('payments.showWaiting')}
                        </Button>
                        {showPayments.waiting && payments.map((x, index) => {
                            if (x.status === 'WAITING')
                                return <PaymentGrid setProps={setProps}  index={index} item={x} studentId={studentId} style={classes.statusLightBlue}/>
                        })}
                    </div>

                    <div className={classes.processingPayments}>
                        <Button onClick={() => {
                            setShowPayments({...showPayments, processing: !showPayments.processing})
                        }}>
                            {t('payments.showProcessing')}
                        </Button>
                        {showPayments.processing && payments.map((x, index) => {
                            if (x.status === 'PROCESSING')
                                return <PaymentGrid setProps={setProps}  index={index} item={x} studentId={studentId} style={classes.statusBlue}/>
                        })}
                    </div>

                    <div className={classes.approvedPayments}>
                        <Button onClick={() => {
                            setShowPayments({...showPayments, approved: !showPayments.approved})
                        }}>
                            {t('payments.showApproved')}
                        </Button>
                        {showPayments.approved && payments.map((x, index) => {
                            if (x.status === 'APPROVED')
                                return <PaymentGrid setProps={setProps}  index={index} item={x} studentId={studentId} style={classes.statusGreen}/>
                        })}
                    </div>

                    <div className={classes.declinedPayments}>
                        <Button onClick={() => {
                            setShowPayments({...showPayments, declined: !showPayments.declined})
                        }}>
                            {t('payments.showDeclined')}
                        </Button>
                        {showPayments.declined && payments.map((x, index) => {
                            if (x.status === 'DECLINED')
                                return <PaymentGrid setProps={setProps}  index={index} item={x} studentId={studentId} style={classes.statusRed}/>
                        })}
                    </div>


                    <div className={classes.expiredPayments}>
                        <Button onClick={() => {
                            setShowPayments({...showPayments, expired: !showPayments.expired})
                        }}>
                            {t('payments.showExpired')}
                        </Button>
                        {showPayments.expired && payments.map((x, index) => {
                            if (x.status === 'EXPIRED')
                                return <PaymentGrid setProps={setProps}  index={index} item={x} studentId={studentId} style={classes.statusLightRed}/>
                        })}
                    </div>


                    {props.open &&
                    <PaymentModal
                        props={props}
                        setProps={() => setProps({studentId: studentId , id: 0, open: false})}
                    />}
                </div>

            </div>}

        </div>
    );
}

export default PaymentPage;


