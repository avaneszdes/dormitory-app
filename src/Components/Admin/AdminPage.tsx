import { Button } from '@mui/material';
import * as React from 'react';
import {useEffect, useState} from 'react';
import AddDormitoryDialog from './AddDormitoryDialog';
import DataGridComponent from "./DataGridComponent";
import {useTranslation} from "react-i18next";
import DeleteDormitoryDialog from "./DeleteDormitory";
import UpdateDormitoryDialog from "./UpdateDormitory";
import history from "../history";
import {useSelector} from "react-redux";
import {IRootState} from "../../Redux/configureStore";
import AddUserDialog from "./AddUserDialog";
import {lng} from "../Global";


export default function AdminPage() {

    const [showAddDormitory, setShowAddDormitory] = useState(false)
    const [showDeleteDormitory, setShowDeleteDormitory] = useState(false)
    const [showUpdateDormitory, setShowUpdateDormitory] = useState(false)
    const [showAddUser, setShowAddUser] = useState(false)
    const auth = useSelector((profile: IRootState) => profile.auth)
    const {t} = useTranslation()

    useEffect(() => {
        if (auth.exp !== undefined && Date.now() >= auth.exp * 1000) {
            localStorage.setItem('token', '')
            history.push("/authorization")
        }
    }, []);


    const width = lng() === 'en' ? '34%' : lng() === 'ru'? '46%' : '20%'

    return <div>

        <div style={{margin: '70px 0px 0px 10px', width: `${width}`, display: 'flex', justifyContent: 'space-between'}}>
            <Button variant="outlined" onClick={() => setShowAddDormitory(!showAddDormitory)}>{t('admin.addDormitory')}</Button>
            <Button variant="outlined" onClick={() => setShowDeleteDormitory(!showDeleteDormitory)}>{t('admin.deleteDormitory')}</Button>
            <Button variant="outlined" onClick={() => setShowUpdateDormitory(!showUpdateDormitory)}>{t('admin.updateDormitory')}</Button>
            <Button variant="outlined" onClick={() => setShowAddUser(!showAddUser)}>{t('addUserForm.addBtn')}</Button>
        </div>

        <AddDormitoryDialog setShowAddDormitory={setShowAddDormitory} open={showAddDormitory}/>
        <DeleteDormitoryDialog setShowDeleteDormitory={setShowDeleteDormitory} open={showDeleteDormitory}/>
        <UpdateDormitoryDialog setShowUpdateDormitory={setShowUpdateDormitory} open={showUpdateDormitory}/>
        <AddUserDialog open={showAddUser} setShowAddUser={setShowAddUser}/>
        <DataGridComponent/>
    </div>
}
