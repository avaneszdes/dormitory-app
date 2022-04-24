import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

export const useModalStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        closeBtn: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: '97%',
            '&:hover': {
                cursor: 'pointer',
                backgroundColor: '#c8dec6',
                borderRadius: '5px'
            },

        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            width: '600px',
            height: '800px',
            boxShadow: theme.shadows[4],
            padding: theme.spacing(2, 4, 3),
            borderRadius: '10px',
        },
    }))


export const usePageStyles = makeStyles((Theme) =>
    createStyles({
        paymentContainer: {
            overflowX: 'scroll'
        },
        paymentItem: {
            marginTop: '3px',
            border: '0.2px solid black ',
            borderRadius: '8px',
            paddingLeft: '10px',
            paddingBottom: '10px',

        },
        statusRed: {
            paddingLeft: '5px',
            color: 'red'
        },
        statusGreen: {
            paddingLeft: '5px',
            color: 'green'
        },
        statusBlue: {
            paddingLeft: '5px',
            color: '#0941ba'
        },
        statusLightBlue: {
            paddingLeft: '5px',
            color: '#6a8edc'
        },
        statusLightRed: {
            paddingLeft: '5px',
            color: '#d07e82'
        },
        waitingPayments: {
            width: '350px',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            height: '770px',
            overflowY: 'scroll',
            backgroundColor: '#eceeec',
            borderRadius: '7px',
            marginLeft: '10px'

        },
        approvedPayments: {
            width: '350px',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            height: '770px',
            overflowY: 'scroll',
            backgroundColor: '#eceeec',
            borderRadius: '7px',
            marginLeft: '20px'
        },
        processingPayments: {
            width: '350px',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            height: '770px',
            overflowY: 'scroll',
            backgroundColor: '#eceeec',
            borderRadius: '7px',
            marginLeft: '20px'
        },
        declinedPayments: {
            width: '350px',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            height: '770px',
            overflowY: 'scroll',
            backgroundColor: '#eceeec',
            borderRadius: '7px',
            marginLeft: '20px'
        },
        expiredPayments: {
            width: '350px',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            height: '770px',
            overflowY: 'scroll',
            backgroundColor: '#eceeec',
            borderRadius: '7px',
            marginLeft: '20px'
        },
    }))
