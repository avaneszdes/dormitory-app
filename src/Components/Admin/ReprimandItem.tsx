import {useTranslation} from "react-i18next";
import {Grid} from "@mui/material";
import {getFullDate} from "../Global";
import Button from "@material-ui/core/Button";
import React from "react";
import { IReprimandInterface} from "../../Interfaces";
import {useReprimandStyles} from "./AdminStyles";
import {useDispatch} from "react-redux";
import {DELETE_REPRIMAND} from "../../Redux/constants";

interface Props{
    index: number
    item: IReprimandInterface
}


export default function ReprimandItem({index, item}: Props) {

    const classes = useReprimandStyles()
    const {t} = useTranslation();
    const dispatch = useDispatch()

    const deleteReprimand = (id: number): void => {

        dispatch({type: DELETE_REPRIMAND, payload: id})
    }

    return <Grid item
                 key={index}
                 marginTop={2}
                 marginBottom={2}
                 className={classes.reprimandItem}
                 width={350}
    >
        <h3 style={{display: 'flex', justifyContent: 'center'}}>{getFullDate(item.date)}</h3>
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <h3 style={{marginBottom: '0px', fontWeight: 100, marginTop: '4px'}}>{t('reprimandItem.author')}: </h3>
            <h3 style={{marginLeft: '7px', marginTop: '1px'}}>{item.author}</h3>
        </div>

        <div style={{display: 'flex', flexDirection: 'column'}}>
            <h3 style={{marginBottom: '0px', fontWeight: 100, marginTop: '4px'}}> {t('reprimandItem.comment')}: </h3>
            <h3 style={{marginLeft: '7px', marginTop: '1px', width: '300px',whiteSpace: 'pre'}}>{item.comment}</h3>
        </div>

        <div style={{display: 'flex', justifyContent: 'flex-end', marginRight: '6px'}}>
            <Button
                variant="contained"
                color="primary"
                onClick={() => deleteReprimand(item.id)}
            >
                {t('reprimandItem.delete')}
            </Button>
        </div>

    </Grid>
}
