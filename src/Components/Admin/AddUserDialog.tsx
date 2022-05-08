import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, TextField} from '@mui/material';
import {TransitionProps} from '@mui/material/transitions';
import {useFormik} from 'formik';
import React from 'react';
import {useDispatch} from 'react-redux';
import {ADD_USER} from '../../Redux/constants';
import * as yup from 'yup'
import {useTranslation} from "react-i18next";
import {IUserInterface} from "../../Interfaces";
import {Menu, MenuItem} from "@material-ui/core";
import {getRole, regexes} from "../Global";

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
    setShowAddUser: (arg: boolean) => void
}

const {phoneRegExp, password, login} = regexes

const vScheme = yup.object().shape({
    name: yup.string().required("Required"),
    surname: yup.string().required("Required"),
    patronymic: yup.string(),
    phone: yup.string().required("Required").matches(new RegExp(phoneRegExp), 'Phone number is not valid'),
    mail: yup.string().required("Required"),
    login: yup.string().required("Required").matches(new RegExp(login), 'Login is not valid'),
    password: yup.string().required("Required").matches(new RegExp(password), 'Password is not valid'),
})

const values = {
    name: '',
    surname: '',
    patronymic: '',
    phone: '',
    mail: '',
    login: '',
    password: '',
}

export default function AddUserDialog(props: Props) {

    const dispatch = useDispatch()
    const {t} = useTranslation();
    const [val, setVal] = React.useState({isForeigner: false, role: ''});
    const [foreignerAnchorEl, setForeignerAnchorEl] = React.useState<null | HTMLElement>(null);
    const [roleAnchorEl, setRoleAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleForeignerClick = (event: React.MouseEvent<HTMLButtonElement>) => setForeignerAnchorEl(event.currentTarget);
    const handleRoleClick = (event: React.MouseEvent<HTMLButtonElement>) => setRoleAnchorEl(event.currentTarget);

    const handleClose = () => {
        props.setShowAddUser(false)
    }

    const handleForeignerClose = (value: boolean) => {
        setVal({...val, isForeigner: value})
        setForeignerAnchorEl(null);
    }

    const handleRoleClose = (role: string) => {
        setVal({...val, role: role})
        setRoleAnchorEl(null);
    }

    const formik = useFormik({
        initialValues: values,
        enableReinitialize: true,
        validationSchema: vScheme,
        onSubmit: (values) => {

            const user: IUserInterface = {
                name: values.name,
                surname: values.surname,
                patronymic: values.patronymic,
                phone: values.phone,
                mail: values.mail,
                login: values.login,
                password: values.password,
                isForeign: val.isForeigner ? 1 : 0
            }

            dispatch({type: ADD_USER, payload: {user: user, role: val.role}})
            props.setShowAddUser(false)
        }
    })





    return <Dialog TransitionComponent={Transition}
                   keepMounted
                   open={props.open}
                   onClose={handleClose}
                   aria-labelledby="form-title"
    >
        <DialogTitle id="form-title">{t('addUserForm.title')}</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
            <DialogContent>
                <TextField
                    placeholder={t('addUserForm.name')}
                    label={t('addUserForm.name')}
                    name='name'
                    id='name'
                    style={{width: '550px'}}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    value={formik.values.name}
                    helperText={formik.touched.name && formik.errors.name}
                />
            </DialogContent>

            <DialogContent>
                <TextField
                    placeholder={t('addUserForm.surname')}
                    label={t('addUserForm.surname')}
                    name='surname'
                    id='surname'
                    style={{width: '550px'}}
                    onChange={formik.handleChange}
                    error={formik.touched.surname && Boolean(formik.errors.surname)}
                    value={formik.values.surname}
                    helperText={formik.touched.surname && formik.errors.surname}
                />
            </DialogContent>

            <DialogContent>
                <TextField
                    placeholder={t('addUserForm.patronymic')}
                    label={t('addUserForm.patronymic')}
                    name='patronymic'
                    id='patronymic'
                    style={{width: '550px'}}
                    onChange={formik.handleChange}
                    error={formik.touched.patronymic && Boolean(formik.errors.patronymic)}
                    value={formik.values.patronymic}
                    helperText={formik.touched.patronymic && formik.errors.patronymic}
                />
            </DialogContent>

            <DialogContent style={{display: 'flex'}}>
                <TextField
                    placeholder={t('addUserForm.phone')}
                    label={t('addUserForm.phone')}
                    name='phone'
                    id='phone'
                    style={{width: '300px'}}
                    onChange={formik.handleChange}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    value={formik.values.phone}
                    helperText={formik.touched.phone && formik.errors.phone}
                />

                <TextField
                    placeholder={t('addUserForm.mail')}
                    label={t('addUserForm.mail')}
                    name='mail'
                    id='mail'
                    style={{width: '300px', marginLeft: '10px'}}
                    onChange={formik.handleChange}
                    error={formik.touched.mail && Boolean(formik.errors.mail)}
                    value={formik.values.mail}
                    helperText={formik.touched.mail && formik.errors.mail}
                />

            </DialogContent>

            <DialogContent style={{display: 'flex'}} >
                <TextField
                    placeholder={t('addUserForm.login')}
                    label={t('addUserForm.login')}
                    name='login'
                    id='login'
                    style={{width: '300px'}}
                    onChange={formik.handleChange}
                    error={formik.touched.login && Boolean(formik.errors.login)}
                    value={formik.values.login}
                    helperText={formik.touched.login && formik.errors.login}
                />

                <TextField
                    placeholder={t('addUserForm.password')}
                    label={t('addUserForm.password')}
                    name='password'
                    id='password'
                    style={{width: '300px', marginLeft: '10px'}}
                    type={'password'}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    value={formik.values.password}
                    helperText={formik.touched.password && formik.errors.password}
                />
            </DialogContent>

            <DialogContent style={{display: 'flex'}}>
                <div>
                    <Button
                        id="basic-button"
                        aria-controls={foreignerAnchorEl ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        variant={"outlined"}
                        style={{width: '270px'}}
                        aria-expanded={foreignerAnchorEl ? 'true' : undefined}
                        onClick={handleForeignerClick}
                    >
                        {t('addUserForm.isForeign')}
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={foreignerAnchorEl}
                        open={Boolean(foreignerAnchorEl)}
                        onClose={handleForeignerClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={() => handleForeignerClose(true)}>{t('addUserForm.yes')}</MenuItem>
                        <MenuItem onClick={() => handleForeignerClose(false)}>{t('addUserForm.no')}</MenuItem>
                    </Menu>
                </div>


                <div>
                    <Button
                        id="button"
                        aria-controls={roleAnchorEl ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        variant={"outlined"}
                        style={{width: '270px', marginLeft: '10px'}}
                        aria-expanded={roleAnchorEl ? 'true' : undefined}
                        onClick={handleRoleClick}
                    >
                        {t('addUserForm.role')}
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={roleAnchorEl}
                        open={Boolean(roleAnchorEl)}
                        onClose={handleRoleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={() => handleRoleClose('Student')}>{getRole('Student')}</MenuItem>
                        <MenuItem onClick={() => handleRoleClose('Accountant')}>{getRole('Accountant')}</MenuItem>
                        <MenuItem onClick={() => handleRoleClose('Administrator')}>{getRole('Administrator')}</MenuItem>
                    </Menu>
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

