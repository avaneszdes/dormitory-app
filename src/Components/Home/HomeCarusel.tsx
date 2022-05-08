import Typography from "@material-ui/core/Typography";
import LeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import RightIcon from "@material-ui/icons/KeyboardArrowRight";
import React from "react";
import {useCarouselStyles} from './HomeStyles'
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../Redux/configureStore";
import {Paper} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import ProgressLine from "./ProgressLine";
import {IDormitoryState} from "../../Interfaces";
import Container from "@material-ui/core/Container";
import {GET_ALL_DORMITORIES} from "../../Redux/constants";
import {useTranslation} from "react-i18next";
import YandexMap from "../YandexMap/YandexMap";
import {Box} from "@mui/material";
import altImage from '../../images/LogoBntu2.png'

interface Props {
    setProps: (arg: any) => void
}

export default function HomeCarousel(props: Props) {

    const classes = useCarouselStyles();
    const [nextOrPrev, setNextOrPrev] = React.useState(2)
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const dormitories: IDormitoryState = useSelector((root: IRootState) => root.dormitories)

    const getAvailablePlacesOfDormitory = (id: number): string =>
        `${t('home.free')} ${getAvailablePlaces(id)} ${t('home.from')} ${allPlaces(id)} ${t('home.places')}`

    const getDormitories = (isNext: boolean) => {

        if (isNext  ) {
            if(nextOrPrev <= dormitories.total - 2){
                dispatch({type: GET_ALL_DORMITORIES, payload: {top: 2, skip: nextOrPrev}})
                setNextOrPrev(nextOrPrev + dormitories.dormitories.length)
            }else if(nextOrPrev <= dormitories.total - 1){
                dispatch({type: GET_ALL_DORMITORIES, payload: {top: 1, skip: nextOrPrev}})
                setNextOrPrev(nextOrPrev - 1 + dormitories.dormitories.length)
            }

        } else if (!isNext && nextOrPrev > dormitories.dormitories.length) {
            dispatch({type: GET_ALL_DORMITORIES, payload: {top: 2, skip: nextOrPrev - 4}})
            setNextOrPrev(nextOrPrev - dormitories.dormitories.length)
        }
    }

    const allPlaces = (id: number) => dormitories.dormitories.filter(x => x.id === id)[0].rooms
        .map(x => x.capacity).reduce(function (a, b) {
            return a + b;
        });


    const getAvailablePlaces = (id: number) => dormitories.dormitories.filter(x => x.id === id)[0].rooms.map(x =>
        x.capacity - x.caseload).reduce(function (a, b) {
        return a + b;
    });


    return <>
        {dormitories.dormitories &&
        <Container maxWidth="xl" component="main" style={{backgroundColor: '#ecebeb', margin: '0px'}}>
            <Typography variant="h4" color="textPrimary" style={{padding: '30px 0px 0px 22px'}}>
                {t('home.dormitories')}
            </Typography>
            <Grid container justifyContent="space-between">

                {dormitories.dormitories[0] !== undefined && dormitories.dormitories.map((dormitory, index) => (
                    <Paper style={{marginLeft: 'auto', marginRight: 'auto', display: 'block'}}
                           key={index}
                           className={classes.caruselBlock}
                           elevation={2}>

                        <Grid key={dormitory.id}>
                            <Typography variant="h6" color="textPrimary" style={{margin: '10px', textAlign: 'center'}}>
                                {t('home.dormitoryNumber') + dormitory.number}
                            </Typography>
                            <Box sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                p: 2,
                                m: 1,
                                borderRadius: 1
                            }}>
                                <img onClick={() => props.setProps({id: dormitory.id, open: true})}
                                     style={{marginLeft: 'auto', marginRight: 'auto', display: 'block'}}
                                     className={classes.dormitoryImage}
                                     alt={'img'} src={dormitory?.photo ?? altImage}
                                     width={410} height={402}
                                />
                                <div style={{
                                    width: '412px',
                                    height: '402px',
                                    border: 'solid 1px',
                                    borderRadius: '5px',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    display: 'block'
                                }}>
                                    <YandexMap withControls={false} location={dormitory.mapImage} isBig={false}/>
                                </div>
                            </Box>
                            <div style={{marginLeft: 'auto', marginRight: 'auto', display: 'block'}}>

                                {dormitory.address &&
                                <div className={classes.caruselBlockText}>

                                    <div style={{display: 'flex'}}>

                                        <Typography  variant="h6" color="textPrimary">
                                            {t('home.dormitoryAddress')}
                                        </Typography>

                                        <Typography style={{marginLeft: '8px'}} variant="h6" color="textPrimary">
                                            {dormitory.address.split(',')[0]},
                                        </Typography>
                                        <Typography style={{marginLeft: '4px'}} variant="h6" color="textPrimary">
                                            {dormitory.address.split(',')[1]}
                                        </Typography>
                                        <Typography style={{marginLeft: '4px'}} variant="h6" color="textPrimary">
                                            {dormitory.address.split(',')[2]}
                                        </Typography>
                                    </div>

                                    {Boolean(dormitory.rooms.length) &&
                                    <div style={{marginBottom: "30px"}}>

                                        <Box sx={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            marginBottom: '10px',
                                            justifyContent: "space-between",
                                        }}>
                                            <div style={{width: '300px'}}>
                                                <Typography variant="h6" color="textPrimary">
                                                    {getAvailablePlacesOfDormitory(dormitory.id)}
                                                </Typography>
                                            </div>

                                            <div>
                                                <ProgressLine
                                                    completed={Math.trunc( 410 * (   ((allPlaces(dormitory.id) /getAvailablePlaces(dormitory.id) * 100)- 100)) / 100  )}
                                                    text={`${Math.trunc(allPlaces(dormitory.id) /getAvailablePlaces(dormitory.id) * 100)- 100}%`}
                                                    height={10}
                                                    fontSize={'0.575rem'}
                                                    blockMaxWidth={410}
                                                    margin={0}
                                                />
                                            </div>
                                        </Box>
                                    </div>}
                                </div>}
                            </div>
                        </Grid>
                    </Paper>
                ))}
            </Grid>
            <div className={classes.caruselButtons}>
                <Typography variant="h6" color="textPrimary" gutterBottom>
                    {t('main.total')} {dormitories.total}
                </Typography>
                <div className={classes.caruselButtonsIn}>
                    <div className={classes.caruselButtonsIn} onClick={() => getDormitories(false)}>
                        <LeftIcon fontSize={'large'} className={classes.leftRightButton}/>
                    </div>
                    {dormitories.dormitories.length} / {nextOrPrev}
                    <div className={classes.caruselButtonsIn} onClick={() => getDormitories(true)}>
                        <RightIcon fontSize={'large'} className={classes.leftRightButton}/>
                    </div>
                </div>
            </div>
        </Container>
        }
    </>
}




