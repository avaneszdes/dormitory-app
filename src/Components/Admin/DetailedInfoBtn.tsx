import * as React from 'react';
import {Button} from "@material-ui/core";
import {GridRenderCellParams} from "@mui/x-data-grid";
import {useDispatch} from "react-redux";
import {
    GET_DEBTS_BY_ID,
    GET_OCCUPANCY_DATA_BY_LOGIN,
    GET_REPRIMANDS_BY_USER_ID,
    GET_STUDENT_PROFILE_BY_ID
} from "../../Redux/constants";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {useTranslation} from "react-i18next";
import DetailedInfoDialog from "./DetailedInfoDialog";
import {useState} from "react";

const DetailedInfoBtn = (params: GridRenderCellParams<any, any, any>) => {

    const dispatch = useDispatch()
    const [props, setProps] = useState(false)
    const {t} = useTranslation()

    return <div style={{display: "flex"}}>
        <Button
            variant="outlined"
            color="primary"
            size="small"
            style={{marginLeft: 16}}
            onClick={() => {
                setProps(true)
                dispatch({type: GET_STUDENT_PROFILE_BY_ID, payload: +params.id})
                dispatch({type: GET_OCCUPANCY_DATA_BY_LOGIN, payload: params.row.login})
                dispatch({type: GET_REPRIMANDS_BY_USER_ID, payload: +params.id})
                dispatch({type: GET_DEBTS_BY_ID, payload: +params.id})
            }}
        >
            <VisibilityOutlinedIcon/> {t('admin.detailedInfo')}
        </Button>

        <DetailedInfoDialog  props={props} setProps={() => setProps(false)}/>
    </div>
}

export default DetailedInfoBtn
