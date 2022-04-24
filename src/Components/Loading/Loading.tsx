import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import logoBantu from "../../images/LogoBntu2.png";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1
        },
    }),
);

interface ComponentProps {
    hidden: boolean;
}
export default function SimpleBackdrop(props: ComponentProps) {
    const classes = useStyles();

    return (
        <div>
            <Backdrop className={classes.backdrop} open={props.hidden}>
                <div style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50px',
                    backgroundImage: `url(${logoBantu})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    color: '#286815'
                }}>
                    <CircularProgress thickness={3} color="inherit" size={100}/>
                </div>
            </Backdrop>
        </div>
    );
}
