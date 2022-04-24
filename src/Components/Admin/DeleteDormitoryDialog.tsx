import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, TextField} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import {useFormik} from 'formik';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {ADD_DORMITORY} from '../../Redux/constants';
import * as yup from 'yup'

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const vScheme = yup.object().shape({
    dormitoryNumber: yup.number().required("Required"),
    dormitoryQuantity: yup.number().required("Required"),
    dormitoryAddress: yup.string().required("Required"),
})

export default function AddDormitoryDialog() {

    const dispatch = useDispatch()
    const [inputEditHideBtn, setInputEditHideBtn] = useState(true)


    const handleClose = () => {
        setInputEditHideBtn(!inputEditHideBtn);
    }
    const val = {
        dormitoryNumber: 0,
        dormitoryQuantity: 0,
        dormitoryAddress: '',
    }
    const formik = useFormik({
        initialValues: val,
        enableReinitialize: true,
        validationSchema: vScheme,
        onSubmit: (values) => {

            const dormitoryRequest = {
                number: values.dormitoryNumber,
                quantityFloors: values.dormitoryQuantity,
                address: values.dormitoryAddress
            }

            dispatch({type: ADD_DORMITORY, payload: dormitoryRequest})
            formik.values.dormitoryNumber = 0
            formik.values.dormitoryQuantity = 0
            formik.values.dormitoryAddress = ''
            setInputEditHideBtn(!inputEditHideBtn);
        }
    })

    return <Dialog TransitionComponent={Transition}
                   keepMounted
                   open={inputEditHideBtn}
                   onClose={handleClose}
                   aria-labelledby="form-title"
    >
        <DialogTitle id="form-title">Creating dormitory</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
            <DialogContent>
                <TextField
                    placeholder="Dormitory number"
                    name='dormitoryNumber'
                    id='dormitoryNumber'
                    label="Dormitory number"
                    style={{width: '400px'}}
                    onChange={formik.handleChange}
                    error={formik.touched.dormitoryNumber && Boolean(formik.errors.dormitoryNumber)}
                    value={formik.values.dormitoryNumber}
                    helperText={formik.touched.dormitoryNumber && formik.errors.dormitoryNumber}
                />
            </DialogContent>
            <DialogContent>
                <TextField
                    placeholder="Dormitory quantity"
                    label="Dormitory quantity"
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
                    placeholder="Dormitory address"
                    label="Dormitory address"
                    name='dormitoryAddress'
                    id='dormitoryAddress'
                    style={{width: '400px'}}
                    onChange={formik.handleChange}
                    error={formik.touched.dormitoryAddress && Boolean(formik.errors.dormitoryAddress)}
                    value={formik.values.dormitoryAddress}
                    helperText={formik.touched.dormitoryAddress && formik.errors.dormitoryAddress}
                />

            </DialogContent>
            <DialogActions>
                <Button
                    type='submit'
                    color='primary'
                >
                    Create
                </Button>
                <Button
                    onClick={handleClose}
                    color='primary'
                >
                    Cancel
                </Button>
            </DialogActions>
        </form>
    </Dialog>
}

