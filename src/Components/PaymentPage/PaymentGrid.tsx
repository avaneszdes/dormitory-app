import {getFullDate} from "../Global";
import Button from "@material-ui/core/Button";
import {Grid} from "@mui/material";
import React from "react";
import {usePageStyles} from "./PaymentStyles";
import {useTranslation} from "react-i18next";
import {IPaymentInterface} from "../../Interfaces";

interface Props{
    index: number
    item: IPaymentInterface
    studentId: number
    setProps(arg: any): void
    style: string
}

export default function PaymentGrid({index, item, setProps, studentId, style}: Props) {

    const classes = usePageStyles()
    const {t} = useTranslation();

    return <Grid item
                 key={index}
                 marginTop={2}
                 className={classes.paymentItem}
                 width={250}
    >
        <h3>{getFullDate(item.date)}</h3>
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <h3> {t('payments.status')}: </h3>
            <h3 className={style}>
                {item.status}
            </h3>
        </div>

        <h3> {t('payments.price')}: {item.amount} Br</h3>
        <div style={{display: 'flex', justifyContent: 'flex-end', marginRight: '6px'}}>
            <Button
                onClick={() => setProps({studentId: studentId, id: item.id, open: true})}
                variant="contained"
                color="primary"
            >
                {t('payments.viewDetails')}
            </Button>
        </div>

    </Grid>
}
