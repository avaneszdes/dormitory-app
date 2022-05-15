import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

export const useCarouselStyles = makeStyles(() => ({
    dormitoryImage: {
        '&:hover': {
            border: '0.3px solid',
            cursor: 'pointer',
            borderRadius: '10px'
        }
    },
    caruselButtonsIn: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontWeight: 600

    },
    caruselButtons: {
        margin: '0 28px 0 28px',
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    leftRightButton: {
        '&:hover': {
            background: "#c6c4c4",
        }
    },
    caruselBlock: {
        margin: '40px 20px 20px 20px',
        width: '46.5vw',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'block',
    },
    caruselBlockText: {
        padding: '2px 0px 0px 0px',
        maxWidth: '865px',
    },
    dormitoryLocationText: {
        display: "grid",
        gridTemplateColumns: '70px 1fr',
        gridRowGap: '24px',
        gridColumnGap: '16px'
    },
    textWithLine: {
        maxWidth: '825px',
        display: 'flex',
        justifyContent: "space-between",
        flexWrap: 'wrap'
    }
}))


export const useFooterStyles = makeStyles((theme) => ({
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(8),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
        },
    }
}));

export const useRoomDescriptionStyles = makeStyles(() => ({
    modalItem: {
        display: 'flex', flexDirection: 'row', alignItems: 'baseline', margin: '0px 5px 0px 5px'
    },
    modalItemTittle: {
        margin: '10px 10px 0px 5px', fontWeight: 100
    },
    modalItemValue: {
        margin: '10px 10px 0px 20px', fontStyle: 'italic'
    },
    listItem: {
        marginLeft: '5px', fontWeight: 100, display: 'flex', flexDirection: 'row'
    }
}));

export interface StyleProps {
    width: number
    height: number,
    fontSize: string
    blockMaxWidth: number
    margin: number
}

export const progressLineStyles = makeStyles<Theme, StyleProps>(() => ({
    containerStyles: {
        height: ({height}) => `${height}px`,
        width: ({blockMaxWidth}) => `${blockMaxWidth}px`,
        backgroundColor: "green",
        borderRadius: '11px',
        marginLeft: ({margin}) => `${margin}px`,
        marginTop: '5px'
    },
    fillerStyles: {
        height: ({height}) => `${height}px`,
        width: ({width}) => `${width}px`,
        backgroundColor: 'red',
        borderRadius: '10px',
        borderBottomLeftRadius: '10px',
        textAlign: 'right',
        lineHeight: 2.43,
    },
    labelStyles: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: ({fontSize}) => `${fontSize}rem`,
    }
}));


export const useFloorModalStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            width: '80%',
            height: '90%',
            boxShadow: theme.shadows[4],
            padding: theme.spacing(2, 4, 3),
            borderRadius: '7px',
            overflowY: 'scroll'
        },
        roomsOnFlat: {
            display: 'flex',
            overflowX: "auto",
            margin: '10px 0px 15px 0px',
            padding: 0,
            listStyle: "none",
            width: "100%",
            '&::-webkit-scrollbar': {
                height: '0.6em'
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
        searchInput: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '40ch',
            },
        },
        roomTopBtn: {
            '&:hover': {
                cursor: 'pointer',
                backgroundColor: '#b8dbb5',
                borderRadius: '5px'
            },
        },
        roomButtons: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '10px',
            width: '80px',

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
        room: {
            display: 'flex',
            maxWidth: '170px',
            marginBottom: '5px',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#8ece8e',
            marginLeft: '10px',
            width: '100px',
            height: '150px',
            borderRadius: '10px',
            transition: 'all 0.5s',
            position: 'relative',
            '&:hover': {
                border: '3px solid green',
                cursor: 'pointer',
                borderRadius: '11px'
            },


        },
        roomRed: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ce8eb0',
            marginLeft: '10px',
            width: '100px',
            height: '150px',
            borderRadius: '10px',
            transition: 'all 0.5s',
            position: 'relative',
            '&:hover': {
                border: '0.3px solid green',
                cursor: 'pointer',
                borderRadius: '10px'
            },
        },
        roomNumberPart: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: -5,
            backgroundColor: 'white',
            border: '0.3px solid #8ece8e',
            height: '50px',
            width: '100px',
            '&:hover': {
                color: 'blue',
                border: '0.3px solid green',
                cursor: 'pointer',
                borderRadius: '10px'
            },
        }
    }),
);

export const useHomePageStyles = makeStyles(() => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    mapBlock: {
        backgroundColor: "#e3e3e3",
        display: 'flex',
        flexDirection: 'row',
        marginTop: '50px'
    },
    about: {
        width: '600px',
        height: '300px',
        display: 'flex',
        justifyContent: "space-between",
        flexDirection: 'column',
        paddingLeft: '70px',
        paddingTop: '30px'
    },
    line: {
        marginLeft: '30px',
        borderRadius: '20px',
        width: "60%",
        height: 4,
        background: "red",
        position: "relative",
        "&:before": {
            borderRadius: '20px',
            position: "absolute",
            content: '""',
            top: 0,
            left: 0,
            right: 0,
            width: "30%",
            height: 4,
            background: "green"
        }
    }
}));
