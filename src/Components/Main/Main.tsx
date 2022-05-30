import React, {useEffect, useState} from "react";
import Authorization from "../Authorization/Authorization"
import Home from "../Home/Home";
import {Route, Switch,} from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import {makeStyles} from "@material-ui/core/styles";
import history from "../history";
import {useTranslation} from "react-i18next";
import '../../i18next/i18n'
import {Menu, MenuItem} from "@material-ui/core";
import './main.css'
import {IRootState} from "../../Redux/configureStore";
import {useDispatch, useSelector} from "react-redux";
import {CLEAR_OCCUPANCY_SUCCEED, LOG_OUT,} from "../../Redux/constants";
import StudentProfileC from "../StudentProfile/StudentProfile";
import ChangePassword from "../ChangePassword/ChangePassword";
import AdminPage from "../Admin/AdminPage";
import logoBntu from '../../images/LogoBntu2.png'
import PaymentPage from "../PaymentPage/PaymentPage";
import ErrorPage from "../ErrorPage/ErrorPage";
import {Divider} from "@mui/material";

const useStyles = makeStyles((theme) => ({
    '@global': {
        body: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    appBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: '#d4d4d4',
        height: '60px',
        marginBottom: '-5px',
        position: 'fixed'
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    logo: {
        marginLeft: '10px',
        paddingLeft: '10px',
        cursor: "pointer",
    }
}));


export default function Main() {

    const classes = useStyles()
    const {t, i18n} = useTranslation();
    const auth = useSelector((profile: IRootState) => profile.auth)
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const dispatch = useDispatch()

    useEffect(() => {
        if (auth.exp !== undefined && Date.now() >= auth.exp * 1000) {
            localStorage.setItem('token', '')
            history.push("/")
        }
    }, []);

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const home = () => history.push('/')
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleLanguageClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)
    const handleLanguageClose = (lang: string) => {
        if (lang === 'ru' || lang === 'zh' || lang === 'en') {
            i18n?.changeLanguage(lang);
        }
        setAnchorEl(null)
    }

    const logIn = () => history.push('/authorization')

    function getWindowDimensions() {
        const {innerWidth: width, innerHeight: height} = window;
        return {
            width,
            height
        };
    }

    const logOut = () => {
        localStorage.removeItem('token');
        dispatch({type: LOG_OUT, payload: ''})
        dispatch({type: CLEAR_OCCUPANCY_SUCCEED, payload: null})
        history.push("/")
    }

    const toMyPayments = () => {
        history.push("/payment")
    }

    return (<div>
            <AppBar style={{height: `${windowDimensions.height > 1300 ? '80px' : '60px'}`,  position: 'fixed'}}
                    color="default" elevation={0} className={classes.appBar}>
                <div onClick={() => home()} className={classes.logo}>
                    <img alt={'img'} src={logoBntu} width={50} height={50}/>
                </div>

                <Toolbar>
                    {!auth.token && <Divider orientation="vertical" flexItem sx={{height: '20px', margin: '20px 0px 0px 10px'}} />}
                    {!auth.token &&
                        <div>
                            <h5 className="fromLeft" onClick={() => logIn()}>
                                {t('main.logIn')}
                            </h5>
                        </div>
                    }


                    {auth.token && auth.role === 'ROLE_STUDENT' && <Divider orientation="vertical" flexItem sx={{height: '20px', margin: '20px 0px 0px 10px'}} />}
                    {auth.token && auth.role === 'ROLE_STUDENT' &&
                    <h5 className="fromLeft" onClick={() => toMyPayments()}>
                        {t('main.myPayments')}
                    </h5>
                    }


                    {auth.token && <Divider orientation="vertical" flexItem sx={{height: '20px', margin: '20px 0px 0px 10px'}} />}
                    {auth.token &&
                    <h5 className="fromLeft" onClick={() => history.push('/profile')}>
                        {t('main.personalAccount')}
                    </h5>
                    }

                    {auth.token && auth.role === 'ROLE_ADMINISTRATOR' && <Divider orientation="vertical" flexItem sx={{height: '20px', margin: '20px 0px 0px 10px'}} />}
                    {auth.token && auth.role === 'ROLE_ADMINISTRATOR' &&
                    <h5 id={'logIn'} className="fromLeft" onClick={() => history.push('/adminPage')}>
                        {t('main.admin')}
                    </h5>
                    }

                    {auth.token && <Divider orientation="vertical" flexItem sx={{height: '20px', margin: '20px 0px 0px 10px'}} />}
                    {auth.token &&
                    <h5 className="fromLeft" onClick={() => logOut()}>
                        {t('main.logOut')}
                    </h5>
                    }



                    <Divider orientation="vertical" flexItem sx={{height: '20px', margin: '20px 0px 0px 10px'}} />
                    <div>
                        <Button aria-controls="simple-menu" style={{all: 'unset'}}
                                aria-haspopup="listbox" onClick={handleLanguageClick}>
                            <h5 className="fromLeft">{t('main.language')}</h5>
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleLanguageClose}
                        >
                            <MenuItem onClick={() => handleLanguageClose('en')}>{t('language.en')}</MenuItem>
                            <MenuItem onClick={() => handleLanguageClose('ru')}>{t('language.ru')}</MenuItem>
                            <MenuItem onClick={() => handleLanguageClose('zh')}>{t('language.zh')}</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/authorization" component={Authorization}/>
                <Route exact path="/profile" component={StudentProfileC}/>
                <Route exact path="/adminPage" component={AdminPage}/>
                <Route exact path="/payment" component={PaymentPage}/>
                <Route exact path="/error-page" component={ErrorPage}/>
                <Route path="/changePassword" component={ChangePassword}/>
            </Switch>
        </div>
    );
}
