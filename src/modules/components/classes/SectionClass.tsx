import { AppBar, Link, makeStyles, TextField, Theme, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router"
import WithRoot from '../../root';
import SectionLayout from "../../views/SectionLayout";
import Typographic from "../Typographic";
import Toolbar from '../../components/Toolbar';
import AppFooter from "../../views/Footer";
import axios from "axios";
import FileTransfer from "../FileTransfer";
import { ClassroomProps, RouteParamsProps } from ".";
import { useTranslation } from "react-i18next";



const backgroundImages = [
    'https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80',
    'https://images.unsplash.com/photo-1593588332695-cd49488a8ec8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
    'https://images.unsplash.com/photo-1541018939203-36eeab6d5721?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1661732017082-a82ecf38af87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1670348060135-d4c6662b4138?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
];


const backgroundImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];


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
            marginTop: theme.spacing(10),
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
}));


const useStylesLayout = makeStyles((theme: Theme) => ({
    root: {
        height: '100vh',
        minHeight: 500,
        maxHeight: 800,
        [theme.breakpoints.up('sm')]: {
            height: '100vh',
            minHeight: 800,
            maxHeight: 1300,
        },
    },
}));


function SectionClass(props: RouteComponentProps<RouteParamsProps>) {
    const { t } = useTranslation();
    const classesStyle = useStyles();
    const classesLayout = useStylesLayout();

    const initial = {
        token: "",
        className: "",
        instructor: "",
        createDate: "",
        feedbackLevel: 0,
    };
    const [classroom, setClassroom] = useState(initial);
    const [studentID, setStudentID] = useState("");
    const [studentEmail, setStudentEmail] = useState("");
    const [valid, setValid] = useState(false);
    


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStudentID(e.target.value);
    }


    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStudentEmail(e.target.value);
    }

    
    const handleCreate = (status: boolean, grading: Object) => {
        if (!status)
            props.history.push('/jchecker2.1/error');

        else
            props.history.push({
                pathname: `${props.match.url }/success`,
                state: grading,
            });
    }


    useEffect(() => {
        if (classroom === initial) {
            const currentClassroomState = async (): Promise<ClassroomProps[]> => {
                return await axios.get<ClassroomProps[]>('http://isel.lifove.net/api/token2.0/')
                .then((response) => {
                    return response.data
                });
            };

            currentClassroomState()
            .then(response => {
                setClassroom(response.find(element => element.token === props.match.params.token) || initial);
                
                if (response.find(element => element.token === props.match.params.token) === undefined) {
                    props.history.push('/jchecker2.1');
                    alert("클래스가 없습니다.😅");
                } else {
                    setValid(true);
                }
            })
            .catch(response => {
                props.history.push('/jchecker2.1/error');
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[classroom]);

    
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
                {}
                <img style={{ display : 'none' }} src={backgroundImage} alt="prioirty" />
                <Typographic color="inherit" align="center" variant="h2" marked="center" className={classesStyle.h2}>
                    {classroom.className}
                </Typographic>
                <Typographic color="inherit" align="center" variant="h5" className={classesStyle.h5}>
                    opened by <b>{classroom.instructor}</b> on {classroom.createDate}
                </Typographic>

                {classroom.feedbackLevel === 3 &&
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item>
                            <TextField
                                value={studentID}
                                onChange={handleChange}
                                label={t('studentNum')}
                                variant="outlined"
                                style={{ margin: 8, borderColor: "white", borderRadius: 4, backgroundColor: "white"}}
                                placeholder={t('studentNum.placeholder')}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                value={studentEmail}
                                onChange={handleEmailChange}
                                label={t('studentEmail')}
                                variant="outlined"
                                style={{ width: 230, margin: 8, borderColor: "white", borderRadius: 4, backgroundColor: "white"}}
                                placeholder={t('studentEmail.placeholder')}
                                margin="normal"
                            />
                        </Grid>
                    </Grid>
                }

                {classroom.feedbackLevel !== 3 &&
                    <TextField
                        value={studentID}
                        onChange={handleChange}
                        label={t('studentNum')}
                        variant="outlined"
                        style={{ margin: 8, borderColor: "white", borderRadius: 4, backgroundColor: "white"}}
                        placeholder={t('studentNum.placeholder')}
                        margin="normal"
                    />
                }

                {valid &&
                    <FileTransfer name={classroom.token} feedbackLevel={classroom.feedbackLevel} id={studentID} email={studentEmail} onCreate={handleCreate} />
                }
            </SectionLayout>
            <AppFooter />
        </>
    
    );
}


export default React.memo(WithRoot(SectionClass));