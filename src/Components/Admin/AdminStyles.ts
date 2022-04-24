import {createStyles, makeStyles} from "@material-ui/core/styles";


export const useColumnStyles = makeStyles((theme) => ({
    cell: {
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: '5px',
        margin: '3px',
    },
    header: {
        margin: '3px'
    },
}));

export const useDetailedInfoStyles = makeStyles(() => ({
    reprimands: {
        width: '400px',
        height: '563px',
        overflowX: "auto",
        border: '0.5px solid',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '8px',
        margin: '10px 0px 10px 0px',
        listStyle: "none",
        '&::-webkit-scrollbar': {
            width: '0.6em'
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            outline: '1px solid slategrey'
        }
    },
    createReprimandBlock: {
        display: 'flex',
        width: '400px',
        marginTop: '10px',
        flexDirection: 'column',
        borderRadius: '5px',
        border: '1px solid black'
    },
    createReprimandTittle: {
        fontWeight: 100,
        height: '55px',
        margin: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    progressLinesTittle: {
        marginBottom: '7px', display: 'flex', justifyContent: 'center'
    },
    desInfoOccupancyBlock: {
        width: '390px',
        height: '420px',
        border: '0.5px solid',
        borderRadius: '8px',
        marginTop: '10px',
        paddingLeft: '10px'
    },
    desInfoOccupancyBlockItem: {
        display: 'flex', flexDirection: 'row', alignItems: 'baseline'
    },
    mailBlock: {
        width: '400px',
        height: '420px',
        border: '0.5px solid',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '8px',
        marginTop: '10px'
    }
}))


export const useReprimandStyles = makeStyles(() =>
    createStyles({
        reprimandItem: {
            marginTop: '3px',
            marginBottom: '3px',
            border: '0.2px solid black ',
            borderRadius: '8px',
            paddingLeft: '10px',
            paddingBottom: '10px',
        }
    }))
