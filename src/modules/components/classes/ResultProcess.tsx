import { AppBar, Link, makeStyles, Button, Grid } from "@material-ui/core";
import React from "react";
import WithRoot from '../../root';
import SectionLayout from "../../views/SectionLayout";
import Typographic from "../Typographic";
import Toolbar from '../Toolbar';
import AppFooter from "../../views/Footer";
import PlaylistAddCheckRoundedIcon from '@material-ui/icons/PlaylistAddCheckRounded';
import {useTranslation} from "react-i18next";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { GradingResultProps, RouteParamsProps } from ".";
import { RouteComponentProps } from "react-router-dom";

const backgroundImage = "https://images.unsplash.com/photo-1519744734972-9e5b11bdfeb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80";

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
        backgroundColor: 'rgba(129, 189, 244, 0.5)',
        maxHeight: 23,
        borderRadius: 30,
    },
    oopMore: {
        backgroundColor: '#81bdf4',
        borderRadius: 15,
        maxWidth: 125,
        marginTop: theme.spacing(5),
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


function ResultProcess(props: RouteComponentProps<RouteParamsProps>) {
    const classesStyle = useStyles();
    const classesLayout = useStylesLayout();
    const {t} = useTranslation();

    if (props.location.state === undefined) {
        props.history.push('/jchecker2.1/error');
        return null;
    } else {
        const results = props.location.state as GradingResultProps;

        const handleDiagram = () => {
            const baseUrl = 'https://app.diagrams.net/?lightbox=1&edit=_blank#Uhttp%3A%2F%2Fisel.lifove.net%2Fjchecker2.0%2Ffiles%2F';
            const className = results.className.replace(" ", "-");
            const studentNum = results.studentNum;

            const diagramUrl = baseUrl + className + '%2F' + studentNum + '%2Fdrawio.xml';
            window.open(diagramUrl, '_blank');
        }

        const handleDetail = () => {
            props.history.push({
                pathname: `${props.match.url}/details`,
                state: results,
            });
        }

        const existsInPolicy = {
            feedback: results.isDirect === 'true' ? true : false,
            count: results.count !== undefined ? (results.count.deductedPoint === 0 ? true : false) : undefined,
            delay: results.delay !== undefined ? (results.delay.deductedPoint === 0 ? true : false) : undefined,
            compiled: results.compile !== undefined ? (results.compile.deductedPoint === 0 ? true : false) : undefined,
            inputs: results.oracle !== undefined ? (results.oracle.deductedPoint === 0 ? true : false) : undefined,
            classes: results.classes !== undefined ? (results.classes.deductedPoint === 0 ? true : false) : undefined,
            methods: results.methods !== undefined ? (results.methods.deductedPoint === 0 ? true : false) : undefined,
            packages: results.packages !== undefined ? (results.packages.deductedPoint === 0 ? true : false) : undefined,
            custexc: results.customException !== undefined ? (results.customException.deductedPoint === 0 ? true : false) : undefined,
            custstr: results.customStructure !== undefined ? (results.customStructure.deductedPoint === 0 ? true : false) : undefined,
            interfaces: results.inheritInterface !== undefined ? (results.inheritInterface.deductedPoint === 0 ? true : false) : undefined,
            superclass: results.inheritSuper !== undefined ? (results.inheritSuper.deductedPoint === 0 ? true : false) : undefined,
            overriding: results.overriding !== undefined ? (results.overriding.deductedPoint === 0 ? true : false) : undefined,
            overloading: results.overloading !== undefined ? (results.overloading.deductedPoint === 0 ? true : false) : undefined,
            thread: results.thread !== undefined ? (results.thread.deductedPoint === 0 ? true : false) : undefined,
            javadoc: results.javadoc !== undefined ? (results.javadoc.deductedPoint === 0 ? true : false) : undefined,
            encapsulation: results.encapsulation !== undefined ? (results.encapsulation.deductedPoint === 0 ? true : false) : undefined,
        };

        if (results.feedbackLevel === 1) {
            return (
                <>
                    <AppBar position="fixed" style={{background: 'transparent', boxShadow: 'none'}}>
                        <Toolbar className={classesStyle.toolbar}>
                            <Link
                                variant="h3"
                                underline="none"
                                color="inherit"
                                className={classesStyle.title}
                                href="/jchecker2.1"
                            >
                                <img src="/assets/logo.png" alt="logo" className={classesStyle.logo}/>
                            </Link>
                        </Toolbar>
                    </AppBar>
                    <SectionLayout backgroundClassName={classesStyle.background} classes={classesLayout}>
                        {}
                        <img style={{display: 'none'}} src={backgroundImage} alt="prioirty"/>
                        <Typographic color="inherit" align="center" variant="h2" marked="center"
                                     className={classesStyle.h2}>
                            {results.studentNum} _ {t('result.score.success')}
                        </Typographic>

                        {existsInPolicy.feedback &&
                            <Typographic color="inherit" align="center" variant="h3">
                                {existsInPolicy.feedback}
                                {results.result} / {results.point}
                            </Typographic>
                        }


                        {existsInPolicy.feedback && existsInPolicy.delay === false &&
                            <Typographic color="inherit" align="left" variant="subtitle1" className={classesStyle.h6}>
                                <PlaylistAddCheckRoundedIcon color="error"/> &nbsp;
                                (-{results.delay!.deductedPoint}) {t('result.score.delay')}
                            </Typographic>
                        }


                        {existsInPolicy.feedback && existsInPolicy.count === false &&
                            <Typographic color="inherit" align="left" variant="subtitle1" className={classesStyle.h6}>
                                <PlaylistAddCheckRoundedIcon color="error"/> &nbsp;
                                (-{results.count!.deductedPoint}) {t('result.score.count')}
                            </Typographic>
                        }


                        {existsInPolicy.feedback && existsInPolicy.classes === false &&
                            <Typographic color="inherit" align="left" variant="subtitle1" className={classesStyle.h6}>
                                <PlaylistAddCheckRoundedIcon color="error"/> &nbsp;
                                (-{results.classes!.deductedPoint}) {t('result.score.class')}
                            </Typographic>
                        }


                        {existsInPolicy.feedback && existsInPolicy.methods === false &&
                            <Typographic color="inherit" align="left" variant="subtitle1" className={classesStyle.h6}>
                                <PlaylistAddCheckRoundedIcon color="error" /> &nbsp;
                                (-{results.methods!.deductedPoint}) {t('result.score.method')}
                            </Typographic>
                        }


                        {existsInPolicy.feedback && existsInPolicy.compiled === false &&
                            <Typographic color="inherit" align="left" variant="subtitle1" className={classesStyle.h6}>
                                <PlaylistAddCheckRoundedIcon color="error"/> &nbsp;
                                (-{results.compile!.deductedPoint}) {t('result.score.compile')}
                            </Typographic>
                        }

                        {existsInPolicy.feedback && existsInPolicy.inputs === false &&
                            <Typographic color="inherit" align="left" variant="subtitle1" className={classesStyle.h6}>
                                <PlaylistAddCheckRoundedIcon color="error"/> &nbsp;
                                (-{results.oracle!.deductedPoint}) {t('result.score.testcase')}
                                {results.oracle?.violationNumber.length !== 0 &&
                                    <Typographic color="inherit" align="center" variant="body1">
                                        {t('result.score.testcase.failed')} ▸ {results.oracle?.violationNumber.map((violation, index) => (
                                        violation + "   "
                                    ))}
                                    </Typographic>
                                }
                                {results.oracle?.checksumNumber.length !== 0 &&
                                    <Typographic color="inherit" align="center" variant="body1">
                                        {t('result.score.checksum.failed')} ▸ {results.oracle?.checksumNumber.map((violation, index) => (
                                        violation + "   "
                                    ))}
                                    </Typographic>
                                }
                            </Typographic>
                        }

                        {existsInPolicy.feedback && existsInPolicy.packages === false &&
                            <Typographic color="inherit" align="left" variant="subtitle1" className={classesStyle.h6}>
                                <PlaylistAddCheckRoundedIcon color="error"/> &nbsp;
                                (-{results.packages!.deductedPoint}) {t('result.score.package')}
                            </Typographic>
                        }

                        {existsInPolicy.feedback && existsInPolicy.custexc === false &&
                            <Typographic color="inherit" align="left" variant="subtitle1" className={classesStyle.h6}>
                                <PlaylistAddCheckRoundedIcon color="error"/> &nbsp;
                                (-{results.customException!.deductedPoint}) {t('result.score.customexc')}
                            </Typographic>
                        }

                        {existsInPolicy.feedback && existsInPolicy.custstr === false &&
                            <Typographic color="inherit" align="left" variant="subtitle1" className={classesStyle.h6}>
                                <PlaylistAddCheckRoundedIcon color="error"/> &nbsp;
                                (-{results.customStructure!.deductedPoint}) {t('result.score.customstr')}
                            </Typographic>
                        }

                        {existsInPolicy.feedback && existsInPolicy.interfaces === false &&
                            <Typographic color="inherit" align="left" variant="subtitle1" className={classesStyle.h6}>
                                <PlaylistAddCheckRoundedIcon color="error"/> &nbsp;
                                (-{results.inheritInterface!.deductedPoint}) {t('result.score.interface')}
                            </Typographic>
                        }

                        {existsInPolicy.feedback && existsInPolicy.superclass === false &&
                            <Typographic color="inherit" align="left" variant="subtitle1" className={classesStyle.h6}>
                                <PlaylistAddCheckRoundedIcon color="error"/> &nbsp;
                                (-{results.inheritSuper!.deductedPoint}) {t('result.score.superclass')}
                            </Typographic>
                        }

                        {existsInPolicy.feedback && existsInPolicy.overriding === false &&
                            <Typographic color="inherit" align="left" variant="subtitle1" className={classesStyle.h6}>
                                <PlaylistAddCheckRoundedIcon color="error"/> &nbsp;
                                (-{results.overriding!.deductedPoint}) {t('result.score.overriding')}
                            </Typographic>
                        }

                        {existsInPolicy.feedback && existsInPolicy.overloading === false &&
                            <Typographic color="inherit" align="left" variant="subtitle1" className={classesStyle.h6}>
                                <PlaylistAddCheckRoundedIcon color="error"/> &nbsp;
                                (-{results.overloading!.deductedPoint}) {t('result.score.overloading')}
                            </Typographic>
                        }


                        {existsInPolicy.feedback && existsInPolicy.thread === false &&
                            <Typographic color="inherit" align="left" variant="subtitle1" className={classesStyle.h6}>
                                <PlaylistAddCheckRoundedIcon color="error"/> &nbsp;
                                (-{results.thread!.deductedPoint}) {t('result.score.thread')}
                            </Typographic>
                        }


                        {existsInPolicy.feedback && existsInPolicy.javadoc === false &&
                            <Typographic color="inherit" align="left" variant="subtitle1" className={classesStyle.h6}>
                                <PlaylistAddCheckRoundedIcon color="error"/> &nbsp;
                                (-{results.javadoc!.deductedPoint}) {t('result.score.javadoc')}
                            </Typographic>
                        }


                        {existsInPolicy.feedback && existsInPolicy.encapsulation === false &&
                            <Typographic color="inherit" align="left" variant="subtitle1" className={classesStyle.h6}>
                                <PlaylistAddCheckRoundedIcon color="error"/> &nbsp;
                                (-{results.encapsulation!.deductedPoint}) {t('result.score.encap')}
                            </Typographic>
                        }

                        <Grid
                            container
                            spacing={6}
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                    startIcon={<ArrowBackIosIcon/>}
                                    onClick={() => props.history.goBack()}
                                    className={classesStyle.goback}
                                >
                                    Back
                                </Button>
                            </Grid>
                            {existsInPolicy.feedback &&
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        size="large"
                                        onClick={handleDiagram}
                                        className={classesStyle.oopMore}
                                    >
                                        OOP MORE
                                    </Button>
                                </Grid>
                            }
                        </Grid>

                    </SectionLayout>
                    <AppFooter/>
                </>

            )
        } else if (results.feedbackLevel >= 2) {
            return (
                <>
                    <AppBar position="fixed" style={{background: 'transparent', boxShadow: 'none'}}>
                        <Toolbar className={classesStyle.toolbar}>
                            <Link
                                variant="h3"
                                underline="none"
                                color="inherit"
                                className={classesStyle.title}
                                href="/jchecker2.1"
                            >
                                <img src="/assets/logo.png" alt="logo" className={classesStyle.logo}/>
                            </Link>
                        </Toolbar>
                    </AppBar>
                    <SectionLayout backgroundClassName={classesStyle.background} classes={classesLayout}>
                        {}
                        <img style={{display: 'none'}} src={backgroundImage} alt="prioirty"/>
                        <Typographic color="inherit" align="center" variant="h2" marked="center"
                                     className={classesStyle.h2}>
                            {results.studentNum} _ {t('result.score.success')}
                        </Typographic>

                        {existsInPolicy.feedback &&
                            <Typographic color="inherit" align="center" variant="h3">
                                {existsInPolicy.feedback}
                                {results.result} / {results.point}
                            </Typographic>
                        }


                        {existsInPolicy.feedback && existsInPolicy.delay === false &&
                            <Typographic color="inherit" align="left" variant="subtitle1" className={classesStyle.h6}>
                                <PlaylistAddCheckRoundedIcon color="error"/> &nbsp;
                                (-{results.delay!.deductedPoint}) {t('result.score.delay')}
                            </Typographic>
                        }


                        {existsInPolicy.feedback && existsInPolicy.count === false &&
                            <Typographic color="inherit" align="left" variant="subtitle1" className={classesStyle.h6}>
                                <PlaylistAddCheckRoundedIcon color="error"/> &nbsp;
                                (-{results.count!.deductedPoint}) {t('result.score.count')}
                            </Typographic>
                        }


                        {existsInPolicy.feedback && existsInPolicy.classes === false &&
                            <Typographic color="inherit" align="left" variant="subtitle1" className={classesStyle.h6}>
                                <PlaylistAddCheckRoundedIcon color="error"/> &nbsp;
                                (-{results.classes!.deductedPoint}) {t('result.score.class')}
                            </Typographic>
                        }


                        {existsInPolicy.feedback && existsInPolicy.methods === false &&
                            <Typographic color="inherit" align="left" variant="subtitle1" className={classesStyle.h6}>
                                <PlaylistAddCheckRoundedIcon color="error" /> &nbsp;
                                (-{results.methods!.deductedPoint}) {t('result.score.method')}
                            </Typographic>
                        }


                        {existsInPolicy.feedback && existsInPolicy.compiled === false &&
                            <Typographic color="inherit" align="left" variant="subtitle1" className={classesStyle.h6}>
                                <PlaylistAddCheckRoundedIcon color="error"/> &nbsp;
                                (-{results.compile!.deductedPoint}) {t('result.score.compile')}
                            </Typographic>
                        }

                        {existsInPolicy.feedback && existsInPolicy.inputs === false &&
                            <Typographic color="inherit" align="left" variant="subtitle1" className={classesStyle.h6}>
                                <PlaylistAddCheckRoundedIcon color="error"/> &nbsp;
                                (-{results.oracle!.deductedPoint}) {t('result.score.testcase')} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                    onClick={handleDetail}
                                    className={classesStyle.moreButton}
                                >
                                    MORE
                                </Button>
                                {results.oracle?.violationNumber.length !== 0 &&
                                    <Typographic color="inherit" align="center" variant="body1">
                                        {t('result.score.testcase.failed')} ▸ {results.oracle?.violationNumber.map((violation, index) => (
                                        violation + "   "
                                    ))}
                                    </Typographic>
                                }
                                {results.oracle?.checksumNumber.length !== 0 &&
                                    <Typographic color="inherit" align="center" variant="body1">
                                        {t('result.score.checksum.failed')} ▸ {results.oracle?.checksumNumber.map((violation, index) => (
                                        violation + "   "
                                    ))}
                                    </Typographic>
                                }
                            </Typographic>
                        }

                        {existsInPolicy.feedback && existsInPolicy.packages === false &&
                            <Typographic color="inherit" align="left" variant="subtitle1" className={classesStyle.h6}>
                                <PlaylistAddCheckRoundedIcon color="error"/> &nbsp;
                                (-{results.packages!.deductedPoint}) {t('result.score.package')}
                            </Typographic>
                        }

                        {existsInPolicy.feedback && existsInPolicy.custexc === false &&
                            <Typographic color="inherit" align="left" variant="subtitle1" className={classesStyle.h6}>
                                <PlaylistAddCheckRoundedIcon color="error"/> &nbsp;
                                (-{results.customException!.deductedPoint}) {t('result.score.customexc')}
                            </Typographic>
                        }

                        {existsInPolicy.feedback && existsInPolicy.custstr === false &&
                            <Typographic color="inherit" align="left" variant="subtitle1" className={classesStyle.h6}>
                                <PlaylistAddCheckRoundedIcon color="error"/> &nbsp;
                                (-{results.customStructure!.deductedPoint}) {t('result.score.customstr')}
                            </Typographic>
                        }

                        {existsInPolicy.feedback && existsInPolicy.interfaces === false &&
                            <Typographic color="inherit" align="left" variant="subtitle1" className={classesStyle.h6}>
                                <PlaylistAddCheckRoundedIcon color="error"/> &nbsp;
                                (-{results.inheritInterface!.deductedPoint}) {t('result.score.interface')}
                            </Typographic>
                        }

                        {existsInPolicy.feedback && existsInPolicy.superclass === false &&
                            <Typographic color="inherit" align="left" variant="subtitle1" className={classesStyle.h6}>
                                <PlaylistAddCheckRoundedIcon color="error"/> &nbsp;
                                (-{results.inheritSuper!.deductedPoint}) {t('result.score.superclass')}
                            </Typographic>
                        }

                        {existsInPolicy.feedback && existsInPolicy.overriding === false &&
                            <Typographic color="inherit" align="left" variant="subtitle1" className={classesStyle.h6}>
                                <PlaylistAddCheckRoundedIcon color="error"/> &nbsp;
                                (-{results.overriding!.deductedPoint}) {t('result.score.overriding')}
                            </Typographic>
                        }

                        {existsInPolicy.feedback && existsInPolicy.overloading === false &&
                            <Typographic color="inherit" align="left" variant="subtitle1" className={classesStyle.h6}>
                                <PlaylistAddCheckRoundedIcon color="error"/> &nbsp;
                                (-{results.overloading!.deductedPoint}) {t('result.score.overloading')}
                            </Typographic>
                        }


                        {existsInPolicy.feedback && existsInPolicy.thread === false &&
                            <Typographic color="inherit" align="left" variant="subtitle1" className={classesStyle.h6}>
                                <PlaylistAddCheckRoundedIcon color="error"/> &nbsp;
                                (-{results.thread!.deductedPoint}) {t('result.score.thread')}
                            </Typographic>
                        }


                        {existsInPolicy.feedback && existsInPolicy.javadoc === false &&
                            <Typographic color="inherit" align="left" variant="subtitle1" className={classesStyle.h6}>
                                <PlaylistAddCheckRoundedIcon color="error"/> &nbsp;
                                (-{results.javadoc!.deductedPoint}) {t('result.score.javadoc')}
                            </Typographic>
                        }


                        {existsInPolicy.feedback && existsInPolicy.encapsulation === false &&
                            <Typographic color="inherit" align="left" variant="subtitle1" className={classesStyle.h6}>
                                <PlaylistAddCheckRoundedIcon color="error"/> &nbsp;
                                (-{results.encapsulation!.deductedPoint}) {t('result.score.encap')}
                            </Typographic>
                        }

                        <Grid
                            container
                            spacing={6}
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                    startIcon={<ArrowBackIosIcon/>}
                                    onClick={() => props.history.goBack()}
                                    className={classesStyle.goback}
                                >
                                    Back
                                </Button>
                            </Grid>
                            {existsInPolicy.feedback &&
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        size="large"
                                        onClick={handleDiagram}
                                        className={classesStyle.oopMore}
                                    >
                                        OOP MORE
                                    </Button>
                                </Grid>
                            }
                        </Grid>
                    </SectionLayout>
                    <AppFooter/>
                </>

            )
        }
    };
}


export default React.memo(WithRoot(ResultProcess));