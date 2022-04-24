import {GridColDef} from "@mui/x-data-grid";
import DeleteButton from "./DeleteButton";
import PaymentButton from "./PaymentButton";
import DetailedInfoBtn from "./DetailedInfoBtn";
import {useTranslation} from "react-i18next";
import {useColumnStyles} from "./AdminStyles";


export default function DataGridColumns(): GridColDef[]{

    const classes = useColumnStyles();
    const {t} = useTranslation()

    return [
        {
            field: 'name',
            headerName: t('admin.name'),
            cellClassName: classes.cell,
            headerClassName: classes.header,
            width: 150,
            headerAlign: 'center',
            editable: false,
            align: 'center',
        },
        {
            field: 'surname',
            headerName: t('admin.surname'),
            width: 150,
            headerAlign: 'center',
            editable: false,
            align: 'center',
            cellClassName: classes.cell,
            headerClassName: classes.header,
        },
        {
            field: 'patronymic',
            headerName: t('admin.patronymic'),
            width: 150,
            headerAlign: 'center',
            editable: false,
            align: 'center',
            cellClassName: classes.cell,
            headerClassName: classes.header,
        },
        {
            field: 'phone',
            headerName: t('admin.phone'),
            width: 140,
            editable: false,
            headerAlign: 'center',
            align: 'center',
            cellClassName: classes.cell,
            headerClassName: classes.header,
        },
        {
            field: 'mail',
            headerName: t('admin.mail'),
            width: 200,
            editable: false,
            headerAlign: 'center',
            align: 'center',
            cellClassName: classes.cell,
            headerClassName: classes.header,
        },
        {
            field: 'login',
            headerName: t('admin.login'),
            width: 120,
            editable: false,
            headerAlign: 'center',
            align: 'center',
            cellClassName: classes.cell,
            headerClassName: classes.header,
        },
        {
            field: 'deleteRow',
            headerName: t('admin.delete'),
            renderCell: DeleteButton,
            headerAlign: 'center',
            align: 'center',
            width: 130,
            disableColumnMenu: true,
            sortable: false

        },
        {
            field: 'payments',
            headerName: t('admin.payments'),
            width: 170,
            headerAlign: 'center',
            align: 'center',
            renderCell: PaymentButton,
            disableColumnMenu: true,
            sortable: false
        },
        {
            field: 'info',
            headerName: t('admin.detailedInfo'),
            width: 190,
            headerAlign: 'center',
            align: 'center',
            renderCell: DetailedInfoBtn,
            disableColumnMenu: true,
            sortable: false
        },
    ];
}
