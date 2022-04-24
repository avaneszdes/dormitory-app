import React, {useEffect, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import bntuRu from '../../images/bntu-ru.png'
import bntuEn from '../../images/bntu-en.png'
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../Redux/configureStore";
import {GET_ALL_DORMITORIES, GET_ALL_OCCUPANCIES, LOG_OUT} from "../../Redux/constants";
import Loading from "../Loading/Loading";
import HomeFooter from "./HomeFooter";
import YandexMap from "../YandexMap/YandexMap";
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import {useTranslation} from "react-i18next";
import DormitoryFloorsModal from "./DormitoryFloorsModal";
import {IDormitoryState} from "../../Interfaces";
import HomeCarousel from "./HomeCarusel";
import {useHomePageStyles} from "./HomeStyles";
import {lng} from "../Global";


export default function Home() {

    const classes = useHomePageStyles()
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const [props, setProps] = React.useState({id: 0, open: false})
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const dormitory: IDormitoryState = useSelector((root: IRootState) => root.dormitories)
    const loading: boolean = useSelector((state: IRootState) => state.alert.loading)
    const auth = useSelector((profile: IRootState) => profile.auth)

    useEffect(() => {
        dispatch({type: GET_ALL_DORMITORIES, payload: {top: 2, skip: 0}})
        dispatch({type: GET_ALL_OCCUPANCIES, payload: ''})
        if (auth.exp !== undefined && Date.now() >= auth.exp * 1000) {
            localStorage.setItem('token', '')
            dispatch({type: LOG_OUT, payload: ''})
        }
    }, []);

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }

    const bntuImage = lng() === 'ru' ? bntuRu : bntuEn


    return (
        <React.Fragment>
            {dormitory?.dormitories &&
            <div>
                <CssBaseline/>
                <Loading hidden={loading}/>
                <img style={{
                    width: '100%',
                    marginTop: `${windowDimensions.height > 1300 ? '78px' : '58px'}`,
                    height: `${windowDimensions.height > 1300 ? '400px' : '550px'}`
                }}
                     alt={'img'}
                     src={bntuImage}/>
                {dormitory?.dormitories.length > 0 && <HomeCarousel setProps={setProps}/>}
            </div>}

            <iframe
                style={{borderRadius: '50px', marginTop: '80px', marginLeft: 'auto', marginRight: 'auto', display: 'block', width: "60vw", marginBottom: "80px"}}
                 height="545"
                src="https://www.youtube-nocookie.com/embed/aQoKw05bhpo"
                title={"BNTU Video"}
                frameBorder="0"
            >
            </iframe>
            <div className={classes.mapBlock}>
                <YandexMap isBig={true} withControls={true} location={''}/>
                <div className={classes.about}>
                    <Typography variant="h4" color="textPrimary" gutterBottom>
                        {t('home.contacts')}
                    </Typography>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '200px',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <CallIcon/>
                        <a href="tel:+375172921011">
                            <Typography variant="h6" color="textPrimary" gutterBottom>
                                8 (017) 292-10-11
                            </Typography>
                        </a>
                    </div>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '165px',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <EmailIcon/>
                        <a href={'https://bntu.by/'}>
                            <Typography variant="h6" color="textPrimary" gutterBottom>
                                bntu@bntu.by
                            </Typography>
                        </a>
                    </div>
                    <Typography style={{
                        width: '350px'
                    }} variant="h6" color="textPrimary" gutterBottom>
                        {t('home.address')}
                    </Typography>
                </div>
            </div>
            <HomeFooter/>
            <DormitoryFloorsModal props={props} setProps={() => setProps({id: 0, open: false})}/>
        </React.Fragment>
    )
}
