import * as React from 'react';
import {GridRenderCellParams} from "@mui/x-data-grid";
import {Button} from "@material-ui/core";
import history from "../history";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {useTranslation} from "react-i18next";

const PaymentButton = (params: GridRenderCellParams<any, any, any>) => {
    const studentId = +params.id

    const {t} = useTranslation()
    return <div style={{display: "flex"}}>
        <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => {
                history.push({pathname: '/payment', search: '', state: studentId})
            }}
        >
            <VisibilityOutlinedIcon/> {t('admin.payments')}
        </Button>
    </div>

}

export default PaymentButton
