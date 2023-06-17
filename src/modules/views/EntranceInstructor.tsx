import { IconButton, 
    makeStyles, 
    TextField, 
    Theme, 
    Link as MLink, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    Checkbox, 
    FormControlLabel, 
    DialogActions, 
    Button, 
    DialogContentText, 
    FormControl,
    Grid} from "@material-ui/core";
import StarterMajorLayout from "./SectionLayout";
import Typographic from "../components/Typographic";
import { Link, RouteComponentProps } from "react-router-dom";
import React, { useState } from "react";
import SearchIcon from '@material-ui/icons/Search';
import AppBarView from './Appbar';
import WithRoot from '../root';
import PolicyDialog from "../components/PolicyDialog";
import Footer from "./Footer";
import { useTranslation } from "react-i18next";


const backgroundImage = 'https://images.unsplash.com/photo-1559163387-e46e8dcb27f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80';


interface InfoProps {
    className: string;
    instructor: string;
    token: string;
    itoken: string;
    direct: boolean;
}



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
    dialogText: {
        marginBottom: theme.spacing(1),
    },
    textField: {
        margin: 8, 
        borderColor: "white", 
        borderRadius: 4, 
        backgroundColor: "white", 
        width: 250,
        [theme.breakpoints.up('sm')]: {
            width: 350,
        },
        [theme.breakpoints.up('lg')]: {
            width: 500,
        },
    },
    resize: {
        fontSize: theme.typography.pxToRem(14),
        [theme.breakpoints.up('sm')]: {
            fontSize: theme.typography.pxToRem(16),
        },
        [theme.breakpoints.up('md')]: {
            fontSize: theme.typography.pxToRem(20),
        },
    },
}));



function EntranceInstructor (props: RouteComponentProps) {
    const classes = useStyles();

    const { t } = useTranslation();

    const [value, setValue] = useState("");
    const [open, setOpen] = useState(false);
    const [popen, setPopen] = useState(false);
    const [info, setInfo] = useState({
        className: "",
        instructor: "",
        token: "",
        itoken: "",
        direct: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    const handleInfoChange = (prop: keyof InfoProps) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setInfo({ ...info, [prop]: e.target.value });
    }

    const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInfo({ ...info, direct: !info.direct });
    }

    const handleGenerate = () => {
        let random =  Math.random().toString(36).substr(2, 11);
        let irandom = Math.random().toString(36).substr(2, 6);
        setInfo({ ...info, token: random, itoken: irandom });
    }



    const handleOpen = () => {
        setOpen(true);
    }

    const handlePOpen = () => {
        setOpen(false);
        setPopen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setPopen(false);
        setInfo({
            className: "",
            instructor: "",
            token: "",
            itoken: "",
            direct: false,
        });
    }


    return (
        <>
        <AppBarView />
        <StarterMajorLayout backgroundClassName={classes.background}>
            {}
            <img style={{ display : 'none' }} src={backgroundImage} alt="prioirty" />
            <Typographic color="inherit" align="center" variant="h2" marked="center" className={classes.h2}>
                {t('entrance.instructor title')}
            </Typographic>
            <Typographic color="inherit" align="center" variant="h5" className={classes.h5}>
                <MLink onClick={handleOpen} color="secondary">
                    <b>{t('entrance.instructor detail.1')}</b> 
                </MLink> {t('entrance.instructor detail.2')}<br /><br /><br />
                {t('entrance.instructor detail.3')}<br />
                {t('entrance.instructor detail.4')}
            </Typographic>
            <TextField 
                autoFocus={true}
                value={value || ""}
                onChange={handleChange}
                onKeyPress={e => {
                    if (e.key === 'Enter' && value.length > 0)
                        props.history.push({
                            pathname: `${props.match.url}/results`,
                            state: value
                        })
                    }}
                label={t('input.')}
                className={classes.textField}
                placeholder={t('input.token')} margin="normal" variant="outlined" InputProps={{
                    classes: {
                        input: classes.resize,
                    },
                    endAdornment: (
                        <IconButton
                            aria-label="token inputs"
                            edge="end"
                            onClick={e => {
                                if (value.length > 0)
                                    props.history.push({
                                        pathname: `${props.match.url}/results`,
                                        state: value
                                    })
                            }}
                        >
                            <SearchIcon />
                        </IconButton>
                    )
                }} />
        </StarterMajorLayout>
        
        {open &&
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="instructor-token-generator"
            aria-describedby="instructor-token-description"
            disableBackdropClick={true}
            disableEscapeKeyDown={true}
            maxWidth="sm"
            scroll='paper'
        >
            <DialogTitle id="instructor-token-title">{t('entrance.instructor.tdialog.1')}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {t('entrance.instructor.tdialog.e')} <b>{t('entrance.instructor.tdialog.2')}</b>{t('entrance.instructor.tdialog.3')}<br />
                    {t('entrance.instructor.tdialog.4')}
                </DialogContentText>
                <Grid container spacing={2}>
                    <Grid xs={12} item>
                        <FormControl margin="normal">
                            <TextField
                                value={info.className || ""}
                                variant="outlined"
                                label={t('class name')}
                                size="medium"
                                className={classes.dialogText}
                                onChange={handleInfoChange("className")}
                            />
                            <TextField
                                value={info.instructor || ""}
                                variant="outlined"
                                label={t('instructor name')}
                                size="medium"
                                className={classes.dialogText}
                                onChange={handleInfoChange("instructor")}
                            />
                        </FormControl>
                    </Grid>
                    <Grid xs={12} item>
                    <Button variant="contained" color="primary" onClick={handleGenerate} disabled={info.className.length < 3 || info.instructor.length < 3}>
                        {t('generate.token')}
                    </Button>
                    </Grid>
                </Grid>
                
                <Typographic variant="h3" color="inherit">
                    <Typographic variant="caption" color="inherit">
                        {t('gtoken')} <br />
                    </Typographic>
                    {info.token}
                    <br />
                    <Typographic variant="caption" color="inherit">
                        {t('itoken')} <br />
                    </Typographic>
                    {info.itoken}
                </Typographic>

                <FormControlLabel
                    control={
                        <Checkbox checked={info.direct}
                                onChange={handleChecked}
                                name="directFeedback"
                                color="primary" />}
                                label={t('entrance.instructor.tdialog.2')}
                        />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    {t('closed')}
                </Button>
                <Button onClick={handlePOpen} color="primary" disabled={info.token.length > 0 ? false : true}>
                    {t('next')}
                </Button>
            </DialogActions>
        </Dialog>
        }
        {popen &&
            <PolicyDialog 
                state={popen} 
                className={info.className} 
                instructor={info.instructor} 
                token={info.token}
                itoken={info.itoken}
                isDirect={info.direct}
            />
        }
            <Footer />
        </>
    );
}


export default WithRoot(EntranceInstructor);