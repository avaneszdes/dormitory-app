import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Typography } from '@mui/material';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface Props{
    answer: (isOk: boolean) => void
    title: string
    text: string
    open: boolean
}

export default function ActionDialog({answer,title, text, open}: Props) {

    return (
        <Dialog
            BackdropProps={{
                style: {
                    opacity: 0.5,
                    filter: 'alpha(Opacity=70)'
                }
            }}
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => answer(false)}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    <Typography component={'span'} variant={'body2'}>{text}</Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => answer(false)}>Нет</Button>
                <Button onClick={() => answer(true)}>Да</Button>
            </DialogActions>
        </Dialog>
    );
}
