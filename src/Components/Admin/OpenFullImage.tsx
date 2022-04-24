import {Button, Dialog, DialogActions, Slide} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {IRootState} from "../../Redux/configureStore";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function OpenImage() {

    const [inputEditHideBtn, setInputEditHideBtn] = useState(true)
    const {t} = useTranslation();

    const profileImg = useSelector((x:IRootState) => x.student.profile)
    const handleClose = () => {
        setInputEditHideBtn(!inputEditHideBtn);
    }

    return <Dialog TransitionComponent={Transition}
                   maxWidth={'xl'}
                   keepMounted
                   open={inputEditHideBtn}
                   onClose={handleClose}
                   aria-labelledby="form-title"
    >
        <img alt="?" src={profileImg?.image} width={800} height={800}/>

        <DialogActions>
            <Button onClick={handleClose}>
                {t('admin.close')}
            </Button>
        </DialogActions>
    </Dialog>
}

