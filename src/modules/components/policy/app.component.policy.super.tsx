import { Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    Grid,
    IconButton,
    makeStyles,
    TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react"
import AddIcon from '@material-ui/icons/Add';
import { DialogRawProp } from ".";
import { useTranslation } from "react-i18next";
import { DeleteOutline } from "@material-ui/icons";


const style = makeStyles({
    buttonRight: {
        float: 'right',
        position: 'relative',
    }
});



export default function SuperclassDialog(props: DialogRawProp) {
    const { t } = useTranslation();
    const classes = style();
    const { open: isOpen } = props;

    const [open, setOpen] = useState(isOpen);
    const [fields, setFields] = useState(["spc-0"]);
    const [originClass, setOriginClass] = useState([""]);
    const [superclass, setSuperclass] = useState([""]);
    const [deduct, setDeduct] = useState(0);
    const [max_deduct, setMax_deduct] = useState(0);
    const [resSpc, setResSpc] = useState({
        state: false,
        origins: [] as string[],
        inherit: [] as string[],
        deductPoint : 0,
        maxDeduct: 0
    });


    const appendFields = () => {
        let element = `spc-${fields.length}`;
        setFields(fields => fields.concat([element]));
    }


    const deleteFields = (index : number) => {
        const _fields = [...fields];
        const _origin = [...originClass];
        const _superclass = [...superclass];

        _fields.splice(index, 1);
        _origin.splice(index, 1);
        _superclass.splice(index, 1);

        setFields(_fields);
        setOriginClass(_origin);
        setSuperclass(_superclass);
    }


    const handleOpen = () => {
        setOpen(true);
    }


    useEffect(() => {
        if (isOpen)
            handleOpen();

    }, [isOpen]);


    useEffect(() => {
        props.onCreate("inheritSuper", resSpc);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[resSpc]);


    const handleOriginChange = (index : number) => (e : React.ChangeEvent<HTMLInputElement>) => {
        let newArr = [...originClass];
        newArr[index] = e.target.value;
        setOriginClass(newArr);
    }

    const handleSuperChange = (index : number) => (e : React.ChangeEvent<HTMLInputElement>) => {
        let newArr = [...superclass];
        newArr[index] = e.target.value;
        setSuperclass(newArr);
    }



    const handleClose = () => {
        setResSpc({
            state: false,
            origins: [],
            inherit: [],
            deductPoint : 0,
            maxDeduct: 0
        });
        setOpen(false);
    }


    const handleResIO = () => {
        setResSpc({
            state: true,
            origins: originClass,
            inherit: superclass,
            deductPoint : deduct,
            maxDeduct: max_deduct
        });
        setOpen(false);
    }


    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-spc"
            maxWidth="md"
            fullWidth={true}
            scroll='paper'
            disableEscapeKeyDown
        >
            <DialogTitle id="form-dialog-spc">
                {t('policy.super.1')}
            </DialogTitle>
            <DialogContent dividers>
                <DialogContentText>
                    {t('policy.super.2')}
                    <Button variant="outlined" onClick={() => appendFields()} startIcon={<AddIcon />} className={classes.buttonRight}>
                        {t('add')}
                    </Button>
                </DialogContentText>

                <Grid container spacing={2}>
                    <Grid item>
                        <TextField
                            type="number"
                            value={deduct}
                            label={t('policy.basic.deduct')}
                            size="small"
                            margin="dense"
                            onChange={e => setDeduct(parseFloat(e.target.value) || deduct)}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            type="number"
                            value={max_deduct}
                            label={t('policy.basic.max')}
                            size="small"
                            margin="dense"
                            onChange={e => setMax_deduct(parseFloat(e.target.value) || max_deduct)}
                        />
                    </Grid>
                </Grid>

                {fields.map((input, index) => (
                    <Grid container spacing={1} key={index} alignItems="center" justify="center">
                        <Grid xs item>
                            <FormControl fullWidth margin="normal">
                                <TextField
                                    value={originClass[index] || ""}
                                    variant="outlined"
                                    id={"sorg-" + index}
                                    label={t('Inherited class name')}
                                    name={"sorg-" + index}
                                    size="medium"
                                    className="sorg"
                                    onChange={handleOriginChange(index)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid xs item>
                            <FormControl fullWidth margin="normal">
                                <TextField
                                    value={superclass[index] || ""}
                                    variant="outlined"
                                    id={"spc-" + index}
                                    label={t('super class name')}
                                    name={"spc-" + index}
                                    size="medium"
                                    className="spc"
                                    onChange={handleSuperChange(index)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid xs={1} item>
                            <IconButton size="medium" onClick={() => deleteFields(index)}>
                                <DeleteOutline />
                            </IconButton>
                        </Grid>
                    </Grid>
                ))}
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    {t('closed')}
                </Button>
                <Button onClick={handleResIO} color="primary">
                    {t('submit')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}