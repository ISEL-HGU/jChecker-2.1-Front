import { AppBar, Link, makeStyles, Theme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router"
import WithRoot from '../../root';
import SectionLayout from "../../views/SectionLayout";
import Typographic from "../Typographic";
import Toolbar from '../Toolbar';
import AppFooter from "../../views/Footer";
import axios from "axios";
import { RouteParamsProps, ClassroomOracle } from ".";
import TestCaseTable from "./TestCaseTable";



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
    table: {
        width: '100%',
    }
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


function ClassTestCaseForInst (props: RouteComponentProps<RouteParamsProps>) {
    const classesStyle = useStyles();
    const classesLayout = useStylesLayout();

    const initial = {
        itoken: "",
        className: "",
        instructor: "",
        createDate: "",
        dueDate: "",
        point: 0,
        oracle: {
            deductPoint: 0,
            input: "",
        },
    };


    const [classroom, setClassroom] = useState(initial);


    useEffect(() => {
        if (classroom === initial) {
            const currentClassroomState = async (): Promise<ClassroomOracle[]> => {
                return await axios.get<ClassroomOracle[]>('http://isel.lifove.net/api/token2.0/')
                    .then((response) => {
                        return response.data
                    });
            };


            currentClassroomState()
                .then(response => {
                    // @ts-ignore
                    setClassroom(response.find(element => element.itoken === props.match.params.token) || initial);
                    if (response.find(element => element.itoken === props.match.params.token) === undefined) {
                        props.history.push('/jchecker2.1');
                        alert("클래스가 없습니다.😅");
                    }
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[classroom]);

    // @ts-ignore
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

                <TestCaseTable  history={props.history} location={props.location} match={props.match}/>

                <Typographic color="inherit" align="center" variant="h5" className={classesStyle.h5}>
                    opened by <b>{classroom.instructor}</b> on {classroom.createDate}<br /><br />
                    Deadline: <b>{classroom.dueDate}</b> / <u><b>{classroom.oracle?.deductPoint}</b></u> points each
                </Typographic>

            </SectionLayout>
            <AppFooter />
        </>

    );
}


export default React.memo(WithRoot(ClassTestCaseForInst));