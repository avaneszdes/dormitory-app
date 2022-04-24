import React from "react";
import {TextField, Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";
import Button from "@material-ui/core/Button";

export default function EripForm() {

    const {t} = useTranslation()

    const onChange = (value: any) => {
            console.log(value)
    }

    return <div style={{
        border: '0.5px solid',
        borderRadius: '7px',
        display: 'flex',
        alignItems: 'center',
        height: '370px',
        marginTop: "10px",
        flexDirection: 'column'
    }}>

        <Typography variant="h6" component="h2">
            {t('eripForm.headerText')}
        </Typography>

        <div style={{width: '450px'}}>

            <div style={{display: 'flex', justifyContent: "space-between"}}>
                <div>
                    <TextField
                        placeholder= {t('eripForm.lastname')}
                        id='secondName'
                        label={t('eripForm.lastname')}
                        style={{width: '190px'}}

                    />
                    <TextField
                        placeholder= {t('eripForm.firstName')}
                        id='firstName'
                        label= {t('eripForm.firstName')}
                        style={{width: '190px'}}

                    />
                    <TextField
                        placeholder= {t('eripForm.patronymic')}
                        id='patronymic'
                        label= {t('eripForm.patronymic')}
                        style={{width: '190px'}}
                    />
                </div>

                <div>
                    <TextField
                        placeholder= {t('eripForm.city')}
                        id='city'
                        label= {t('eripForm.city')}
                        style={{width: '190px'}}

                    />
                    <TextField
                        placeholder={t('eripForm.operationCode')}
                        id='operationCode'
                        label={t('eripForm.operationCode')}
                        style={{width: '190px'}}

                    />
                    <TextField
                        placeholder={t('eripForm.payment')}
                        id='payment'
                        label={t('eripForm.payment')}
                        style={{width: '190px'}}
                    />
                </div>
            </div>
            <div style={{width: '420px',marginTop: '40px', display: "flex", justifyContent: "space-between"}}>
                <ReCAPTCHA
                    sitekey="Your client site key"
                    onChange={onChange}
                />

                <Button
                    variant="outlined"
                    color="primary"
                    style={{height: '30px', marginTop: '45px' }}
                >
                    {t('eripForm.payBtn')}
                </Button>
            </div>
        </div>
    </div>
}
