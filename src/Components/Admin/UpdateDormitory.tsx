import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    InputAdornment,
    OutlinedInput,
    Slide,
    TextField
} from '@mui/material';
import {TransitionProps} from '@mui/material/transitions';
import {useFormik} from 'formik';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {GET_DORMITORY_BY_NUMBER, UPDATE_DORMITORY} from '../../Redux/constants';
import * as yup from 'yup'
import {useTranslation} from "react-i18next";
import FindReplaceIcon from '@mui/icons-material/FindReplace';
import {IRootState} from "../../Redux/configureStore";
import CheckIcon from '@mui/icons-material/Check';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<HTMLDivElement, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const vScheme = yup.object().shape({
    dormitoryNumber: yup.number(),
    dormitoryQuantity: yup.string(),
    dormitoryAddress: yup.string(),
})

interface Props {
    open: boolean
    setShowUpdateDormitory: (arg: boolean) => void
}

export default function UpdateDormitoryDialog(props: Props) {

    const dispatch = useDispatch()
    const {t} = useTranslation();
    const [dormitoryNumber, setDormitoryNumber] = useState('')
    const [photos, setPhotos] = useState({photo: '', mapImage: ''})
    const dormitory = useSelector((rootState: IRootState) => rootState.dormitories.dormitory)

    const handleClose = () => {
        props.setShowUpdateDormitory(false)
    }

    const val = {
        dormitoryNumber: dormitory?.number,
        dormitoryQuantity: dormitory?.quantityFloors,
        dormitoryAddress: dormitory?.address,
        photo: dormitory?.photo,
        coordinates: '53.923249,27.594045',
    }


    const formik = useFormik({
        initialValues: val,
        enableReinitialize: true,
        validationSchema: vScheme,
        onSubmit: (values) => {

            const dormitoryRequest = {
                number: values.dormitoryNumber ?? val.dormitoryNumber,
                quantityFloors: values.dormitoryQuantity ?? val.dormitoryQuantity,
                address: values.dormitoryAddress ?? val.dormitoryAddress,
                photo: photos?.photo === '' ? dormitory?.photo : photos?.photo,
                mapImage: values.coordinates ?? val.coordinates
            }

            dispatch({type: UPDATE_DORMITORY, payload: dormitoryRequest})
            formik.values.dormitoryNumber = '0'
            formik.values.dormitoryQuantity = 0
            formik.values.dormitoryAddress = ''
            props.setShowUpdateDormitory(false)
        }
    })

    const getDormitory = (number: string) => {
        dispatch({type: GET_DORMITORY_BY_NUMBER, payload: number})
    }

    const dormitoryPhotoHandler = (target: React.ChangeEvent<HTMLInputElement>) => {

        if (!target.target.files) {
            return;
        }

        const reader = new FileReader();

        reader.onload = (e: any) => setPhotos({...photos, photo: e.target.result})
        reader.readAsDataURL(target.target.files[0])

    }

    return <Dialog TransitionComponent={Transition}
                   keepMounted
                   open={props.open}
                   onClose={handleClose}
                   aria-labelledby="form-title"
    >
        <DialogTitle id="form-title">{t('admin.updatingDormitory')}</DialogTitle>
        <DialogContent>
            <OutlinedInput
                placeholder={t('admin.dormitoryNumber')}
                value={dormitoryNumber}
                onChange={(e) => setDormitoryNumber(e.target.value)}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => getDormitory(dormitoryNumber)}
                            edge="end"
                        >
                            <FindReplaceIcon/>
                        </IconButton>
                    </InputAdornment>
                }
            />
        </DialogContent>
        {dormitory && <form onSubmit={formik.handleSubmit}>
            <DialogContent>
                <TextField
                    placeholder={t('admin.dormitoryNumber')}
                    label={t('admin.dormitoryNumber')}
                    name="dormitoryNumber"
                    id='dormitoryNumber'
                    style={{width: '400px'}}
                    onChange={formik.handleChange}
                    error={formik.touched.dormitoryNumber && Boolean(formik.errors.dormitoryNumber)}
                    value={formik.values.dormitoryNumber}
                    helperText={formik.touched.dormitoryNumber && formik.errors.dormitoryNumber}
                />
            </DialogContent>
            <DialogContent>
                <TextField
                    placeholder={t('admin.floorsQuantity')}
                    label={t('admin.floorsQuantity')}
                    name='dormitoryQuantity'
                    id='dormitoryQuantity'
                    style={{width: '400px'}}
                    onChange={formik.handleChange}
                    error={formik.touched.dormitoryQuantity && Boolean(formik.errors.dormitoryQuantity)}
                    value={formik.values.dormitoryQuantity}
                    helperText={formik.touched.dormitoryQuantity && formik.errors.dormitoryQuantity}
                />

            </DialogContent>
            <DialogContent>
                <TextField
                    placeholder={t('admin.dormitoryAddress')}
                    label={t('admin.dormitoryAddress')}
                    name='dormitoryAddress'
                    id='dormitoryAddress'
                    style={{width: '400px'}}
                    onChange={formik.handleChange}
                    error={formik.touched.dormitoryAddress && Boolean(formik.errors.dormitoryAddress)}
                    value={formik.values.dormitoryAddress}
                    helperText={formik.touched.dormitoryAddress && formik.errors.dormitoryAddress}
                />

            </DialogContent>

            <DialogContent>
                <TextField
                    placeholder={t('admin.dorLocation' + ' 53.923249,53.923249')}
                    label={t('admin.dorLocation')}
                    name='coordinates'
                    id='coordinates'
                    style={{width: '400px'}}
                    onChange={formik.handleChange}
                    error={formik.touched.coordinates && Boolean(formik.errors.coordinates)}
                    value={formik.values.coordinates}
                    helperText={formik.touched.coordinates && formik.errors.coordinates}
                />

            </DialogContent>

            <DialogContent>
                <div className='change-photo_wrapper' style={{width: '300px', color: 'black'}}>
                    <label className="custom-file-upload">
                        {t('admin.updateDormitoryPhoto')}
                        <input
                            id={'photo'}
                            accept="image/*"
                            onChange={dormitoryPhotoHandler}
                            type="file"
                        />
                    </label>
                    {photos.photo !== '' && <CheckIcon color={'success'} style={{marginLeft: '20px'}}/>}
                </div>

            </DialogContent>
            <DialogActions>
                <Button
                    type='submit'
                    color='primary'
                >
                    {t('admin.update')}
                </Button>
                <Button
                    onClick={handleClose}
                    color='primary'
                >
                    {t('admin.cancel')}
                </Button>
            </DialogActions>
        </form>}
    </Dialog>
}

