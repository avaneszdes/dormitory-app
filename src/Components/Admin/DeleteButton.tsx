import * as React from 'react';
import {Button} from "@material-ui/core";
import {GridRenderCellParams} from "@mui/x-data-grid";
import {useDispatch} from "react-redux";
import {DELETE_STUDENT} from "../../Redux/constants";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {useTranslation} from "react-i18next";
import ActionDialog from "../Dialogs/ActionDialog";
import {useState} from "react";


const deleteDialogText: any = {
    text: 'Вы действительно ходите удалить',
    title: 'Удаление'
}

const DeleteButton = (params: GridRenderCellParams<any, any, any>) => {

    const dispatch = useDispatch()
    const {t} = useTranslation()
    const [deleteAction, setDeleteAction] = useState(false)


    const deleteStudentAction = (isOk: boolean) => {
        console.log(isOk)
        if (isOk) {
            dispatch({type: DELETE_STUDENT, payload: params.id})
            setDeleteAction(false)
        }

    }

    return <div style={{display: "flex"}}>

        <ActionDialog open={deleteAction} title={deleteDialogText.title} text={deleteDialogText.text} answer={deleteStudentAction}/>
        <Button
            variant="outlined"
            color="primary"
            size="small"
            style={{marginLeft: 16}}
            onClick={() => setDeleteAction(true)}
        >
            <DeleteOutlineIcon /> {t('admin.delete')}
        </Button>
    </div>


}

export default DeleteButton
