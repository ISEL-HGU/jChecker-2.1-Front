import { useState } from "react";
import Button from '@material-ui/core/Button';
import { CloudUpload } from '@material-ui/icons';
import axios from 'axios';
import { Backdrop, CircularProgress, makeStyles } from "@material-ui/core";
import { blue } from '@material-ui/core/colors';
import { useTranslation } from "react-i18next";



const useStyles = makeStyles((theme) => ({
    form: {
        margin: 'auto',
        alignItems: 'center',
        textAlign: 'center',
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonProgress: {
        color: blue[800],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -10,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));



function FileTransfer (props) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { t } = useTranslation();
    const classes = useStyles();
    const [file, setfile] = useState(null);
    const [disabled, setdisabled] = useState(true);
    const [loading, setloading] = useState(false);
    
    const fileUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        return await axios.post('http://isel.lifove.net/api/grade2.0/execute/details', formData, {
            params: {
                studentNum: props.id,
                studentEmail: props.email,
                token: props.name,
                feedbackLevel: props.feedbackLevel
            },
            
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })  
    };


    const upload = (e) => {
        e.preventDefault();
        setdisabled(true)
        fileUpload(file)
            .then((response) => {
                setloading(false)
                props.onCreate(true, response.data);
            })
            .catch((response) => {
                setloading(false);
                props.onCreate(false, null);
            })
    };


    const fileChange = (e) => {
        setfile(e.target.files[0])
        setdisabled(false)
    };


    const handleClick = () => {
        if (!disabled) {
            setloading(true);
        }
    }


    return (
        <div>
            <form onSubmit={upload} className={classes.form}>
                <input accept="application/zip" type="file" onChange={fileChange} name="file" aria-labelledby = {t('file transfer')} />      
                <div className={classes.wrapper}>
                    {props.feedbackLevel === 3 &&
                        <Button type="submit"
                                variant="contained"
                                color="secondary"
                                size="large"
                                startIcon={<CloudUpload />}
                                disabled={props.id.length !== 8 || !emailRegex.test(props.email) || disabled}
                                onClick={handleClick}
                        >
                            Upload
                        </Button>
                    }

                    {props.feedbackLevel !== 3 &&
                        <Button type="submit"
                                variant="contained"
                                color="secondary"
                                size="large"
                                startIcon={<CloudUpload />}
                                disabled={props.id.length !== 8 || disabled}
                                onClick={handleClick}
                        >
                            Upload
                        </Button>
                    }

                    {loading &&
                        <Backdrop className={classes.backdrop} open={loading}>
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    }
                </div>
            </form>
        </div>   
    )
}

export default FileTransfer;