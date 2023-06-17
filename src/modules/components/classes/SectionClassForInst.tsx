import {AppBar, Button, Grid, Link as MLink, Link, makeStyles, Theme} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import WithRoot from '../../root';
import SectionLayout from "../../views/SectionLayout";
import Typographic from "../Typographic";
import Toolbar from '../Toolbar';
import AppFooter from "../../views/Footer";
import axios from "axios";
import { ClassroomInstProps, RouteParamsProps } from ".";
import SectionTable from "./SectionTable";
import PolicyUpdateDialog from "../PolicyUpdateDialog";
import Typography from "@material-ui/core/Typography";



const backgroundImages = "https://images.unsplash.com/photo-1605142806579-f51ce5ecfb73?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";


const backgroundImage = backgroundImages;


const useStyles = makeStyles((theme: Theme) => ({
    background: {
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#5d5447',
        backgroundPosition: 'center',
    },
    button: {
        minWidth: 125,
    },
    h2: {
        fontFamily: 'ELAND_Choice_M',
    },
    h5: {
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(4),
        [theme.breakpoints.up('sm')]: {
            marginTop: theme.spacing(5),
        },
        fontFamily: 'JSDongkang-Regular',
    },
    more: {
        marginTop: theme.spacing(2),
    },
    title: {
        fontSize: 42,
        letterSpacing: 7,
    },
    toolbar: {
        justifyContent: 'space-between',
    },
    logo: {
        marginTop: theme.spacing(1),
        maxWidth: 200,
        [theme.breakpoints.up('sm')]: {
            maxWidth: 250,
        },
        [theme.breakpoints.up('xl')]: {
            maxWidth: 300,
        },
    },
    table: {
        width: '100%',
    },
    save: {
        maxHeight: 18,
        borderRadius: 30,
    },
}));


const useStylesLayout = makeStyles((theme: Theme) => ({
    root: {
        height: '120vh',
        // minHeight: 500,
        // maxHeight: 800,
        [theme.breakpoints.up('sm')]: {
            height: '150vh',
            // minHeight: 800,
            // maxHeight: 1300,
        },
    },
}));


function ClassForInst (props: RouteComponentProps<RouteParamsProps>) {
    const classesStyle = useStyles();
    const classesLayout = useStylesLayout();

    const initial = {
        itoken: "",
        token: "",
        className: "",
        instructor: "",
        feedback: false,
        createDate: "",
        dueDate: "",
        feedbackLevel: 1,
        point: 0,
    };

    const initial_feedbackLevel = 1;
    const [level, setLevel] = useState(initial_feedbackLevel);
    const [classroom, setClassroom] = useState(initial);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (classroom === initial) {
            const currentClassroomState = async (): Promise<ClassroomInstProps[]> => {
                return await axios.get<ClassroomInstProps[]>('http://isel.lifove.net/api/token2.0/')
                .then((response) => {
                    return response.data
                });
            };


            currentClassroomState()
            .then(response => {
                setClassroom(response.find(element => element.itoken === props.location.state) || initial);
                setLevel(response.find(element => element.itoken === props.location.state)?.feedbackLevel || initial_feedbackLevel);
                if (response.find(element => element.itoken === props.location.state) === undefined) {
                    props.history.push('/jchecker2.1');
                    alert("클래스가 없습니다.😅");
                }
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[classroom]);

    const level_state = {
        selectList: [1, 2, 3],
        selectValue: classroom.feedbackLevel,
    };

    const handleSave = async () => {
        const updatedFields = {
            feedbackLevel: level,
        };

        axios.post ("http://isel.lifove.net/api/token2.0/update/level", updatedFields, {
            params: {
                token: classroom.token
            },
            headers: {'Content-Type': 'application/json'}
        });

        alert("저장되었습니다.🙂");
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            <AppBar position="fixed" style={{ background: 'transparent', boxShadow: 'none' }} >
                <Toolbar className={classesStyle.toolbar}> 
                    <Link
                        variant="h3"
                        underline="none"
                        color="inherit"
                        className={classesStyle.title}
                        href="/jchecker2.1"
                    >
                        <img src="/assets/logo.png" alt="logo" className={classesStyle.logo} />
                    </Link>
                </Toolbar>
            </AppBar>
            <SectionLayout backgroundClassName={classesStyle.background} classes={classesLayout}>
                <img style={{ display : 'none' }} src={backgroundImage} alt="prioirty" />
                <Typographic color="inherit" align="center" variant="h2" marked="center" className={classesStyle.h2}>
                    {classroom.className}
                </Typographic>
                
                <SectionTable itoken={classroom.itoken} />

                <Grid
                    container
                    spacing={6}
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item>
                        <Typographic color="inherit" align="center" variant="h5" className={classesStyle.h5}>
                            opened by <b>{classroom.instructor}</b> on {classroom.createDate}
                        </Typographic>
                    </Grid>
                    <Grid item>
                        <MLink color="inherit" variant="h6" onClick={handleOpen} >
                            <b>✏️&nbsp;&nbsp;Update Total Policy</b>
                        </MLink>
                    </Grid>
                </Grid>
                <br></br>
                <Grid container direction="row" justify="center">
                    <Typography style={{color: 'white', fontSize: '15px', fontWeight: 'bold'}}>Level of feedback &nbsp;&nbsp;&nbsp;</Typography>
                    <Grid item>
                        {level_state.selectList.map((value, i) => (
                            <React.Fragment key={i}>
                                <input
                                    id={value.toString()}
                                    value={value}
                                    name="feedbackLevel"
                                    type="radio"
                                    checked={level === value}
                                    onChange={e => setLevel( parseInt(e.target.value) || level)}
                                />
                                {value}&nbsp;&nbsp;
                            </React.Fragment>
                        ))}
                    </Grid>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Grid item>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            onClick={handleSave}
                            className={classesStyle.save}
                        >
                            SAVE
                        </Button>
                    </Grid>
                </Grid>
                {open &&
                    <PolicyUpdateDialog
                        state={open}
                        handleClose={handleClose}
                        className={classroom.className}
                        instructor={classroom.instructor}
                        token={classroom.token}
                        itoken={classroom.itoken}
                        isDirect={classroom.feedback}
                        feedbackLevel={classroom.feedbackLevel}
                        point={classroom.point}
                        dueDate={classroom.dueDate}
                     />
                }
            </SectionLayout>
            <AppFooter />
        </>
    
    );
}


export default React.memo(WithRoot(ClassForInst));