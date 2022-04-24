import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, TextField} from '@mui/material';
import {TransitionProps} from '@mui/material/transitions';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useTranslation} from "react-i18next";
import {DELETE_DORMITORY} from "../../Redux/constants";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<HTMLDivElement, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
    open: boolean
    setShowDeleteDormitory: (arg: boolean) => void
}

export default function DeleteDormitoryDialog(props: Props) {

    const dispatch = useDispatch()
    const [number, setNumber] = useState('')
    const {t} = useTranslation();

    const handleClose = () => {
        props.setShowDeleteDormitory(false)
    }

    const deleteDormitory = () => {
        dispatch({type: DELETE_DORMITORY, payload: number})
    }

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => setNumber(e.target.value);

    return <Dialog TransitionComponent={Transition}
                   keepMounted
                   open={props.open}
                   onClose={handleClose}
                   aria-labelledby="form-title"
    >
        <DialogTitle id="form-title">{t('admin.deleting')}</DialogTitle>
        <DialogContent>
            <TextField
                placeholder={t('admin.dormitoryNumber')}
                label={t('admin.dormitoryNumber')}
                name='dormitoryNumber'
                style={{width: '400px'}}
                onChange={handleNumberChange}

            />
        </DialogContent>
        <DialogActions>
            <Button
                type='submit'
                color='primary'
                onClick={deleteDormitory}
            >
                {t('admin.delete')}
            </Button>
            <Button
                onClick={handleClose}
                color='primary'
            >
                {t('admin.cancel')}
            </Button>
        </DialogActions>
    </Dialog>
}

