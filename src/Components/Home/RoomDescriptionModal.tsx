import {Divider, Popover, Typography} from "@mui/material";
import React from "react";
import {useSelector} from "react-redux";
import {IRootState} from "../../Redux/configureStore";
import {useTranslation} from "react-i18next";
import {useRoomDescriptionStyles} from "./HomeStyles";

interface Props {
    props: { dormitoryId: number, roomId: number, open: boolean, anchorEl: HTMLElement | null }
    setProps: (arg: any) => void
}

export default function RoomDescription({props, setProps}: Props) {

    const classes = useRoomDescriptionStyles()
    const dormitories = useSelector((root: IRootState) => root.dormitories)
    const role = useSelector((root: IRootState) => root.auth.role)
    const occupancies = useSelector((root: IRootState) => root.occupancy.occupancies)
    const {t} = useTranslation()

    const room = dormitories.dormitories.filter(x => x.id === props.dormitoryId)[0]
        ?.rooms.filter(x => x.id === props.roomId)[0]

    const getOccupanciesByRoomId = (id: number) => {
        return occupancies.filter(x => {
            if (id === x.roomId && x.status === 'ACTIVE')
                return x.userLogin
        })
    }

    const handleClose = () => setProps({dormitoryId: 0, roomId: 0, open: false, anchorEl: null})

    return <Popover
        id="mouse-over-popover"
        sx={{
            pointerEvents: 'none',
        }}
        elevation={3}
        open={props.open}
        anchorEl={props.anchorEl}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        onClose={handleClose}
        disableRestoreFocus
    >
        <div className={classes.modalItem}>
            <Typography className={classes.modalItemTittle} component="div">
                {t('roomDescription.roomNumber')}:
            </Typography>
            <Typography marginLeft={2} className={classes.modalItemValue} variant="h5" component="div">
                {room?.number}
            </Typography>
        </div>


        <div className={classes.modalItem}>
            <Typography className={classes.modalItemTittle} component="div">
                {t('roomDescription.floor')}:
            </Typography>
            <Typography marginLeft={2} className={classes.modalItemValue} variant="h5" component="div">
                {room?.floor}
            </Typography>
        </div>


        <div className={classes.modalItem}>
            <Typography className={classes.modalItemTittle} component="div">
                {t('roomDescription.capacity')}:
            </Typography>
            <Typography  marginLeft={2} className={classes.modalItemValue} variant="h5" component="div">
                {room?.capacity}
            </Typography>
        </div>


        <div className={classes.modalItem}>
            <Typography className={classes.modalItemTittle} component="div">
                {t('roomDescription.caseload')}:
            </Typography>
            <Typography marginLeft={2} className={classes.modalItemValue} variant="h5" component="div">
                {room?.caseload}
            </Typography>
        </div>


        <div className={classes.modalItem}>
            <Typography className={classes.modalItemTittle} component="div">
                {t('roomDescription.price')}:
            </Typography>
            <Typography marginLeft={2} className={classes.modalItemValue} variant="h5" component="div">
                {room?.price}Br
            </Typography>
        </div>

        {Boolean(getOccupanciesByRoomId(room?.id).length) &&
        <div className={classes.modalItem}>
            <Typography className={classes.modalItemTittle} component="div">
                {t('roomDescription.logins')}:
            </Typography>

            <div className={classes.modalItemValue}>
                {getOccupanciesByRoomId(room?.id).map(x => {
                    return <div key={x.id}>
                        <Typography
                            className={classes.listItem}
                            component="div"
                        >
                            {x.userLogin}
                        </Typography>
                        <Divider component="li"/>
                    </div>
                })}
            </div>

        </div>}

    </Popover>
}
