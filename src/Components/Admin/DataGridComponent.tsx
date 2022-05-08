import * as React from 'react';
import {useEffect} from 'react';
import {
    DataGrid,
    enUS,
    ruRU, zhCN,
} from '@mui/x-data-grid';
import {useDispatch, useSelector} from "react-redux";
import {LOG_OUT} from "../../Redux/constants";
import {IRootState} from "../../Redux/configureStore";
import AlertComponent from "../Alerts/SuccessAlert";
import CustomToolbar from "./CustomToolbar";
import DataGridColumns from "./DataGridColumns";
import {lng} from "../Global";

export default function DataGridComponent() {

    const dispatch = useDispatch()
    const auth = useSelector((authState: IRootState) => authState.auth)
    const students = useSelector((profile: IRootState) => profile.student.students)

    const tokenLife = auth.exp !== undefined ? auth.exp * 1000 : 0;
    const language = lng()
    const dataGridLocales = language === 'ru' ? ruRU.components.MuiDataGrid.defaultProps.localeText
        : language === 'en'
        ? enUS.components.MuiDataGrid.defaultProps.localeText
            : zhCN.components.MuiDataGrid.defaultProps.localeText

    useEffect(() => {
        if (Date.now() > tokenLife || tokenLife === 0) {
            localStorage.setItem('token', '')
            dispatch({type: LOG_OUT, payload: ''})
        }
    }, []);

    return (
        <div style={{width: '99%', marginLeft: '10px'}}>
            <AlertComponent/>
            <div style={{height: 750, maxWidth: '100%', marginTop: '20px'}}>
                <DataGrid
                    style={{border: '0.3px solid'}}
                    rows={students}
                    columns={DataGridColumns()}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    disableSelectionOnClick
                    components={{Toolbar: CustomToolbar}}
                    localeText={dataGridLocales}
                />
            </div>

        </div>
    );
}
