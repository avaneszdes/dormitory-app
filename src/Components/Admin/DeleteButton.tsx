import * as React from 'react';
import {Button} from "@material-ui/core";
import {GridRenderCellParams} from "@mui/x-data-grid";
import {useDispatch} from "react-redux";
import {DELETE_STUDENT} from "../../Redux/constants";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {useTranslation} from "react-i18next";

const DeleteButton = (params: GridRenderCellParams<any, any, any>) => {

    const dispatch = useDispatch()
    const {t} = useTranslation()

    return <div style={{display: "flex"}}>
        <Button
            variant="outlined"
            color="primary"
            size="small"
            style={{marginLeft: 16}}
            onClick={() => {
                dispatch({type: DELETE_STUDENT, payload: params.id})
            }}
        >
            <DeleteOutlineIcon /> {t('admin.delete')}
        </Button>
    </div>


}

export default DeleteButton
