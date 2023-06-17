import { Link, Theme, withStyles, WithStyles} from "@material-ui/core";
import SectionLayout from './SectionLayout';
import Typographic from '../components/Typographic';
import React from "react";
import { useTranslation } from "react-i18next/";

//const backgroundImage = 'https://images.unsplash.com/photo-1517512006864-7edc3b933137?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80';
const backgroundImage = 'https://images.unsplash.com/photo-1489875347897-49f64b51c1f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80';

interface Props extends WithStyles<typeof styles> {
    id?: string;
}


const styles = (theme: Theme) => ({
    background: {
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#1e1520',
        backgroundPosition: 'center',
    },
    h5: {
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(4),
        [theme.breakpoints.up('sm')]: {
            marginTop: theme.spacing(10),
        },
    },
    more: {
        marginTop: theme.spacing(2),
    },
});


function SectionBegin(props: Props) {
    const { classes } = props;
    const { t } = useTranslation();

    
    return (
        <SectionLayout backgroundClassName={classes.background}>
            <img style={{ display: 'none' }} src={backgroundImage} alt="priority" />
            <Typographic color="inherit" align="center" variant="h1" marked="center">
                {t('begin.getting start')}
            </Typographic>
            <Typographic color="inherit" align="center" variant="h5" className={classes.h5}>
                <Link href="/jchecker2.1/classes" color="secondary">
                    {t('begin.enter token')}
                </Link>
                    &nbsp;{t('begin.enter token rest')}<br /><br />
                {t('begin.enter generate contact')}
            </Typographic>
        </SectionLayout>
    )
}


export default React.memo(withStyles(styles)(SectionBegin));