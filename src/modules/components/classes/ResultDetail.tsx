import { AppBar, Link, makeStyles, Button, Grid } from "@material-ui/core";
import React, {useEffect, useState} from "react";
import WithRoot from '../../root';
import SectionLayout from "../../views/SectionLayout";
import Typographic from "../Typographic";
import Toolbar from '../Toolbar';
import AppFooter from "../../views/Footer";
import { useTranslation } from "react-i18next";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {GradingFeedbackProps, GradingResultProps, RouteParamsProps} from ".";
import { RouteComponentProps } from "react-router-dom";
import axios from "axios";

const backgroundImage = "https://images.unsplash.com/photo-1613104722989-b9a8b775251a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80";

const useStyles = makeStyles((theme) => ({
    background: {
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#5d5447',
        backgroundPosition: 'center',
    },
    button: {
        minWidth: 100,
    },
    h2: {
        fontFamily: 'ELAND_Choice_M',
        marginBottom: theme.spacing(4),
    },
    h5: {
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(4),
        [theme.breakpoints.up('sm')]: {
            marginTop: theme.spacing(10),
        },
        fontFamily: 'JSDongkang-Regular',
    },
    h6: {
        fontFamily: 'JSDongkang-Regular',
        textAlign: 'left',
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
    goback: {
        marginTop: theme.spacing(5),
        borderRadius: 15,
    },
    moreButton: {
        backgroundColor: '#B0C4DE',
        maxHeight: 23,
        borderRadius: 30,
    }
}));


const useStylesLayout = makeStyles((theme) => ({
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


function ResultDetail (props : RouteComponentProps<RouteParamsProps>) {
    const classesStyle = useStyles();
    const classesLayout = useStylesLayout();
    const { t } = useTranslation();

    const results = props.location.state as GradingResultProps;
    const initial = {
        token: "",
        studentNum: "",
        first: {
            line: "",
            suspicious: 0.0,
            lineNum: 0,
            file: ""
        },
        second: {
            line: "",
            suspicious: 0.0,
            lineNum: 0,
            file: ""
        },
        third: {
            line: "",
            suspicious: 0.0,
            lineNum: 0,
            file: ""
        }
    }

    const [FLResult, setFLResult] = useState(initial);

    useEffect(() => {
       if (FLResult === initial) {
           const FLResultState = async (): Promise<GradingFeedbackProps> => {
               return await axios.get<GradingFeedbackProps>('http://isel.lifove.net/api/feedback2.0/', {
                   params: {
                       studentNum: results.studentNum,
                       token: results.token
                   }
               })
                   .then((response) => {
                       return response.data
                   });
           };

           FLResultState()
               .then(response => {
                   setFLResult(response || initial);

                   if (response === undefined) {
                       props.history.push('/jchecker2.1');
                       alert("피드백을 확인할 수 없습니다.😅");
                   }
               })
       }
    }, [FLResult]);

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
                    {t('result.detail')}
                </Typographic>

                <Typographic color="inherit" align="left" variant="subtitle1" className={classesStyle.h6}>
                    <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
                        <Grid item alignItems="center">
                            <strong><em>{"☑️ "}&nbsp;&nbsp;&nbsp;{FLResult.first.line}</em></strong>
                            <br></br>
                            <u>{"▷ " + FLResult.first.file + ": " + FLResult.first.lineNum}</u>
                        </Grid>
                        <Grid item alignItems="center">
                            <strong><em>{"☑️ "}&nbsp;&nbsp;&nbsp;{FLResult.second.line}</em></strong>
                            <br></br>
                            <u>{"▷ " + FLResult.second.file + ": " + FLResult.second.lineNum}</u>
                        </Grid>
                        <Grid item alignItems="center">
                            <strong><em>{"☑️ "}&nbsp;&nbsp;&nbsp;{FLResult.third.line}</em></strong>
                            <br></br>
                            <u>{"▷ " + FLResult.third.file + ": " + FLResult.third.lineNum}</u>
                        </Grid>
                    </Grid>

                </Typographic>

                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    startIcon={<ArrowBackIosIcon />}
                    onClick={() => props.history.goBack()}
                    className={classesStyle.goback}
                >
                    Back
                </Button>

            </SectionLayout>
            <AppFooter />
        </>

    );
}


export default React.memo(WithRoot(ResultDetail));