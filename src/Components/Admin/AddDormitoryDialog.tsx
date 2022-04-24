import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, TextField} from '@mui/material';
import {TransitionProps} from '@mui/material/transitions';
import {useFormik} from 'formik';
import React from 'react';
import {useDispatch} from 'react-redux';
import {ADD_DORMITORY} from '../../Redux/constants';
import * as yup from 'yup'
import {useTranslation} from "react-i18next";

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
    setShowAddDormitory: (arg: boolean) => void
}

const vScheme = yup.object().shape({
    dormitoryNumber: yup.number().required("Required"),
    dormitoryQuantity: yup.number().required("Required"),
    dormitoryAddress: yup.string().required("Required"),
})

export default function AddDormitoryDialog(props: Props) {

    const dispatch = useDispatch()
    const {t} = useTranslation();

    const handleClose = () => {
        props.setShowAddDormitory(false)
    }
    const val = {
        dormitoryNumber: 0,
        dormitoryQuantity: 0,
        dormitoryAddress: '',
        photo: '',
        coordinates: '53.923249,27.594045',
    }
    const formik = useFormik({
        initialValues: val,
        enableReinitialize: true,
        validationSchema: vScheme,
        onSubmit: (values) => {

            const dormitoryRequest = {
                number: values.dormitoryNumber,
                quantityFloors: values.dormitoryQuantity,
                address: values.dormitoryAddress,
                photo: formik.values.photo,
                mapImage: formik.values.coordinates
            }

            dispatch({type: ADD_DORMITORY, payload: dormitoryRequest})
            formik.values.dormitoryNumber = 0
            formik.values.dormitoryQuantity = 0
            formik.values.dormitoryAddress = ''
            props.setShowAddDormitory(false)
        }
    })

    const photoHandler = (target: React.ChangeEvent<HTMLInputElement>) => {

        if (!target.target.files) {
            return;
        }

        const reader = new FileReader();

        reader.onload = (e: any) => formik.values.photo = e.target.result
        reader.readAsDataURL(target.target.files[0])
    }


    return <Dialog TransitionComponent={Transition}
                   keepMounted
                   open={props.open}
                   onClose={handleClose}
                   aria-labelledby="form-title"
    >
        <DialogTitle id="form-title">{t('admin.creating')}</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
            <DialogContent>
                <TextField
                    placeholder={t('admin.dormitoryNumber')}
                    label={t('admin.dormitoryNumber')}
                    name='dormitoryNumber'
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
                    label= {t('admin.dormitoryAddress')}
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
                    label= {t('admin.dorLocation')}
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
                <div className='change-photo_wrapper' style={{width: '400px', color: 'black'}}>
                    <label className="custom-file-upload">
                        {t('admin.dormitoryPhoto')}
                        <input
                            accept="image/*"
                            onChange={photoHandler}
                            type="file"
                        />
                    </label>
                </div>
            </DialogContent>
            <DialogActions>
                <Button
                    type='submit'
                    color='primary'
                >
                    {t('admin.create')}
                </Button>
                <Button
                    onClick={handleClose}
                    color='primary'
                >
                    {t('admin.cancel')}
                </Button>
            </DialogActions>
        </form>
    </Dialog>
}

