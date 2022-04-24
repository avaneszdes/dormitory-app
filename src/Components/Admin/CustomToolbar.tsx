import * as React from "react";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {GET_STUDENTS_BY_FILTER} from "../../Redux/constants";
import {
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarFilterButton
} from "@mui/x-data-grid";
import {Box, Button, Divider, Fade, IconButton, Popper, TextField} from "@mui/material";
import {Menu, MenuItem} from "@material-ui/core";
import {dormitories, faculties} from "./AdminConstants";
import CloseIcon from '@mui/icons-material/Close';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import DoneIcon from '@mui/icons-material/Done';
import './AdminStyles.css'
import {lng} from "../Global";


export default function CustomToolbar() {

    const [anchorElByFaculty, setAnchorElByFaculty] = React.useState<null | HTMLElement>(null)
    const [anchorElByDormitory, setAnchorElByDormitory] = React.useState<null | HTMLElement>(null)
    const [anchorElByGroup, setAnchorElByGroup] = React.useState<null | HTMLElement>(null)
    const [filter, setFilter] = useState({dormitory: '', faculty: '', group: '', foreign: false})
    const handleFacultyClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorElByFaculty(event.currentTarget)
    const handleDormitoryClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorElByDormitory(event.currentTarget)
    const handleGroupClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setFilter({...filter, group: ''})
        setAnchorElByGroup(anchorElByGroup === null ? event.currentTarget : null)
    }
    const dispatch = useDispatch()
    const {t} = useTranslation()

    const getStudentsByFaculty = (faculty: string): void => {
        if (typeof faculty === 'object') {
            setAnchorElByFaculty(null)
            return
        }

        setFilter({...filter, faculty: faculty})
        setAnchorElByFaculty(null)

    }

    const getStudentsByDormitory = (dormitory: string): void => {
        if (typeof dormitory === 'object') {
            setAnchorElByDormitory(null)
            return
        }
        setFilter({...filter, dormitory: dormitory})
        setAnchorElByDormitory(null)
    }

    const closeFilterByGroup = (): void => {
        setAnchorElByGroup(null)
    }

    const isForeignerText = (): string => {
        const lang = lng()
        if (!filter.foreign && lang === 'ru') return 'Все'
        else if (!filter.foreign && lang === 'en') return 'All'
        else if (filter.foreign && lang === 'en') return 'Yes'
        else if (filter.foreign && lang === 'ru') return 'Да'
        else return ''
    }

    const doFilter = () => {
        dispatch({
            type: GET_STUDENTS_BY_FILTER,
            payload: {
                faculty: filter.faculty,
                dormitory: filter.dormitory,
                group: filter.group,
                foreign: filter.foreign
            }
        })
        setFilter({faculty: '', dormitory: '', group: '', foreign: false})
    }

    return (
        <GridToolbarContainer>

            <div style={{display: 'flex', alignItems: 'center', height: '40px'}}>
                <div className={filter.faculty ? 'border' : ''}>
                    <Button aria-controls="simple-menu"
                            style={{height: '40px'}}
                            aria-haspopup="listbox"
                            onClick={handleFacultyClick}
                    >
                        <h4>{t('admin.byFaculty')}</h4>
                    </Button>
                    {filter.faculty &&
                    <IconButton color={'secondary'}
                                onClick={() => setFilter({...filter, faculty: ''})}
                    >
                        <CloseIcon fontSize={'small'}/>
                    </IconButton>}
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorElByFaculty}
                        keepMounted
                        open={Boolean(anchorElByFaculty)}
                        onClose={getStudentsByFaculty}
                    >
                        {faculties.map(x => {
                            return <MenuItem key={x.number}
                                             onClick={() => getStudentsByFaculty(x.number.toString())}
                            >
                                {x.name}
                            </MenuItem>
                        })}

                    </Menu>
                </div>

                <Divider style={{margin: '0px 3px 0 3px'}} variant={'fullWidth'} flexItem orientation={'vertical'}/>

                <div className={filter.dormitory ? 'border' : ''}>
                    <Button aria-controls="simple-menu"
                            style={{height: '20px'}}
                            aria-haspopup="listbox"
                            onClick={handleDormitoryClick}
                    >
                        <h4>{t('admin.byDormitory')}</h4>
                    </Button>
                    {filter.dormitory &&
                    <IconButton color={'secondary'}
                                onClick={() => setFilter({...filter, dormitory: ''})}
                    >
                        <CloseIcon fontSize={'small'}/>
                    </IconButton>}
                    <Menu
                        id="simple-menu" keepMounted
                        anchorEl={anchorElByDormitory}
                        open={Boolean(anchorElByDormitory)}
                        onClose={getStudentsByDormitory}
                    >
                        {dormitories.map(x => {
                            return <MenuItem key={x.number}
                                             onClick={() => getStudentsByDormitory(x.number.toString())}>{x.name} - {x.address}
                            </MenuItem>
                        })}
                    </Menu>
                </div>

                <Divider style={{margin: '0px 3px 0 3px'}} variant={'fullWidth'} flexItem orientation={'vertical'}/>

                <div className={filter.group ? 'border' : ''}>
                    <Button aria-controls="simple-menu"
                            style={{height: '20px'}}
                            aria-haspopup="listbox"
                            onClick={handleGroupClick}
                    >
                        <h4>{t('admin.byGroup')}</h4>
                    </Button>

                    {filter.group &&
                    <IconButton color={'secondary'} onClick={() => setFilter({...filter, group: ''})}>
                        <CloseIcon fontSize={'small'}/>
                    </IconButton>}

                    <Popper id={'popover'}
                            open={Boolean(anchorElByGroup)}
                            anchorEl={anchorElByGroup}
                            transition
                    >
                        {({TransitionProps}) => (
                            <Fade {...TransitionProps} timeout={350}>
                                <Box sx={{border: 1, p: 1, bgcolor: 'background.paper'}}>
                                    <div style={{display: 'flex'}}>
                                        <TextField onChange={(e) => setFilter({...filter, group: e.target.value})}/>
                                        <IconButton color={'success'} onClick={() => closeFilterByGroup()}>
                                            <DoneIcon fontSize={'small'}/>
                                        </IconButton>
                                        <IconButton color={'secondary'} onClick={handleGroupClick}>
                                            <CloseIcon fontSize={'small'}/>
                                        </IconButton>
                                    </div>
                                </Box>
                            </Fade>
                        )}
                    </Popper>
                </div>

                <Divider style={{margin: '0px 3px 0 3px'}} variant={'fullWidth'} flexItem orientation={'vertical'}/>
                <div className={filter.foreign ? 'border' : ''}>
                    <Button aria-controls="simple-menu"
                            style={{height: '20px'}}
                            aria-haspopup="listbox"
                            onClick={() => setFilter({...filter, foreign: !filter.foreign})}
                    >
                        <h4>{t('admin.isForeigner')}</h4> <h3
                        style={{color: 'green', marginLeft: '8px'}}>{isForeignerText()}</h3>
                    </Button>
                    {filter.foreign &&
                    <IconButton color={'secondary'} onClick={() => setFilter({...filter, foreign: false})}>
                        <CloseIcon fontSize={'small'}/>
                    </IconButton>}

                </div>

                <Divider style={{margin: '0px 3px 0 3px'}} variant={'fullWidth'} flexItem orientation={'vertical'}/>

                {Boolean(filter.dormitory || filter.faculty || filter.group || filter.foreign) &&
                <IconButton style={{backgroundColor: '#a4dca2', marginLeft: '6px', marginRight: '6px'}}
                            color={'warning'} onClick={doFilter}>
                    <FilterAltIcon fontSize={'small'}/>
                </IconButton>
                }
                <Divider style={{margin: '0px 3px 0 3px'}} variant={'fullWidth'} flexItem orientation={'vertical'}/>
            </div>

            <GridToolbarColumnsButton/>
            <GridToolbarFilterButton/>
            <GridToolbarDensitySelector/>
            <GridToolbarExport/>
        </GridToolbarContainer>
    );
}
