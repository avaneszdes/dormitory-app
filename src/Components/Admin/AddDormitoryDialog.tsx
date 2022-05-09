import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, TextField} from '@mui/material';
import {TransitionProps} from '@mui/material/transitions';
import {useFormik} from 'formik';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {ADD_DORMITORY} from '../../Redux/constants';
import * as yup from 'yup'
import {useTranslation} from "react-i18next";
import CheckIcon from "@mui/icons-material/Check";

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
    dormitoryFloorsQuantity: yup.number().required("Required"),
    dormitoryCity: yup.string().required("Required"),
    dormitoryStreet: yup.string().required("Required"),
    dormitoryStreetNumber: yup.string().required("Required"),
})

export default function AddDormitoryDialog(props: Props) {

    const dispatch = useDispatch()
    const {t} = useTranslation();
    const [image, setImage] = useState('')

    const handleClose = () => {
        props.setShowAddDormitory(false)
    }

    const val = {
        dormitoryNumber: 0,
        dormitoryFloorsQuantity: 0,
        dormitoryCity: '',
        dormitoryStreet: '',
        dormitoryStreetNumber: '',
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
                quantityFloors: values.dormitoryFloorsQuantity,
                address: `${values.dormitoryCity},${values.dormitoryStreet},${values.dormitoryStreetNumber}`,
                photo: image,
                mapImage: formik.values.coordinates
            }

            dispatch({type: ADD_DORMITORY, payload: dormitoryRequest})
            formik.values.dormitoryNumber = 0
            formik.values.dormitoryFloorsQuantity = 0
            formik.values.dormitoryCity = ''
            formik.values.dormitoryStreet = ''
            formik.values.dormitoryStreetNumber = ''
            props.setShowAddDormitory(false)
        }
    })

    const photoHandler = (target: React.ChangeEvent<HTMLInputElement>) => {

        if (!target.target.files) {
            return;
        }


        const reader = new FileReader();
        reader.onload = (e: any) => {
            setImage(e.target.result)
        }
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
                    name='dormitoryFloorsQuantity'
                    id='dormitoryFloorsQuantity'
                    style={{width: '400px'}}
                    onChange={formik.handleChange}
                    error={formik.touched.dormitoryFloorsQuantity && Boolean(formik.errors.dormitoryFloorsQuantity)}
                    value={formik.values.dormitoryFloorsQuantity}
                    helperText={formik.touched.dormitoryFloorsQuantity && formik.errors.dormitoryFloorsQuantity}
                />

            </DialogContent>
            <DialogContent>
                <TextField
                    placeholder={t('admin.dormitoryCity')}
                    label={t('admin.dormitoryCity')}
                    name='dormitoryCity'
                    id='dormitoryCity'
                    style={{width: '400px'}}
                    onChange={formik.handleChange}
                    error={formik.touched.dormitoryCity && Boolean(formik.errors.dormitoryCity)}
                    value={formik.values.dormitoryCity}
                    helperText={formik.touched.dormitoryCity && formik.errors.dormitoryCity}
                />

            </DialogContent>

            <DialogContent>
                <TextField
                    placeholder={t('admin.dormitoryStreet')}
                    label={t('admin.dormitoryStreet')}
                    name='dormitoryStreet'
                    id='dormitoryStreet'
                    style={{width: '400px'}}
                    onChange={formik.handleChange}
                    error={formik.touched.dormitoryStreet && Boolean(formik.errors.dormitoryStreet)}
                    value={formik.values.dormitoryStreet}
                    helperText={formik.touched.dormitoryStreet && formik.errors.dormitoryStreet}
                />
            </DialogContent>

            <DialogContent>
                <TextField
                    placeholder={t('admin.dormitoryStreetNumber')}
                    label={t('admin.dormitoryStreetNumber')}
                    name='dormitoryStreetNumber'
                    id='dormitoryStreetNumber'
                    style={{width: '400px'}}
                    onChange={formik.handleChange}
                    error={formik.touched.dormitoryStreetNumber && Boolean(formik.errors.dormitoryStreetNumber)}
                    value={formik.values.dormitoryStreetNumber}
                    helperText={formik.touched.dormitoryStreetNumber && formik.errors.dormitoryStreetNumber}
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
                <div className='change-photo_wrapper' style={{width: '400px', color: 'black'}}>
                    <label className="custom-file-upload">
                        {t('admin.dormitoryPhoto')}
                        <input
                            accept="image/*"
                            onChange={photoHandler}
                            type="file"
                        />
                    </label>
                    {image !== '' && <CheckIcon color={'success'} style={{marginLeft: '20px'}}/>}
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

