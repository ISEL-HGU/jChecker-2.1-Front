import { Backdrop, Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, FormGroup, Grid, makeStyles, TextField, Theme } from "@material-ui/core";
import axios from "axios";
import produce from "immer";

import React, {useEffect, useState} from "react";
import Typographic from './Typographic';
import { useTranslation } from "react-i18next";
import ClassDialog from "./update/app.component.policy.classes";
import MethodDialog from "./update/app.component.policy.methods";
import CompiledDialog from "./update/app.component.policy.compiled";
import CountDialog from "./update/app.component.policy.count";
import StructureDialog from "./update/app.component.policy.custom.ds";
import ExceptionDialog from "./update/app.component.policy.custom.except";
import EncapDialog from "./update/app.component.policy.encap";
import InterfaceDialog from "./update/app.component.policy.interface";
import OracleDialog from "./update/app.component.policy.oracle";
import JavadocDialog from "./update/app.component.policy.javadoc";
import OverloadingDialog from "./update/app.component.policy.ovl";
import OverridingDialog from "./update/app.component.policy.ovr";
import PackageDialog from "./update/app.component.policy.package";
import SuperclassDialog from "./update/app.component.policy.super";
import ThreadDialog from "./update/app.component.policy.thread";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns"
import { GradingPolicyProps } from "./classes";


interface PolicyProps {
    state: boolean,
    handleClose: () => void;
    className: string,
    instructor: string,
    token: string,
    itoken: string,
    isDirect: boolean,
    feedbackLevel: number,
    point: number,
    dueDate: string,
};

const useStyles = makeStyles((theme: Theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    edit: {
        backgroundColor: '#E1F5FE',
        marginTop: theme.spacing(1.6),
        maxHeight: 15,
        borderRadius: 30,
    },
}));


export default function SelectCond(props: PolicyProps) {

    const { t } = useTranslation();
    const classes = useStyles();

    const initial_state = {
        className: props.className,
        instructor: props.instructor,
        feedback: props.isDirect,
        feedbackLevel: props.feedbackLevel,
        token: props.token,
        itoken: props.itoken,
        createDate: "",
        count: false,
        compiled: false,
        oracle: false,
        classes: false,
        methods: false,
        packages: false,
        custexc: false,
        custstr: false,
        interfaces: false,
        superclass: false,
        overriding: false,
        overloading: false,
        thread: false,
        javadoc: false,
        encapsulation: false,
    };

    const initial_data ={
        className: props.className,
        instructor: props.instructor,
        feedback: props.isDirect,
        feedbackLevel: props.feedbackLevel,
        token: props.token,
        itoken: props.itoken,
        point: props.point,
        createDate: "",
        dueDate: props.dueDate,
        count: {
            state: false,
            methodCount: 0,
            fieldCount: 0,
            enForCount: 0,
            deductPoint: 0,
        },
        compiled: {
            state: false,
            buildTool: false,
            deductPoint: 0,
        },
        oracle: {
            state: false,
            input: [""],
            output: [""],
            checksum: [""],
            filePath: [""],
            deductPoint: 0,
            maxDeduct: 0,
        },
        classes: {
            state: false,
            required: [""],
            deductPoint: 0,
            maxDeduct: 0,
        },
        methods: {
            state: false,
            required: [""],
            count: [0],
            classes: [""],
            deductPoint: 0,
            maxDeduct: 0,
        },
        packages: {
            state: false,
            required: [""],
            deductPoint: 0,
            maxDeduct: 0,
        },
        customException: {
            state: false,
            required: [""],
            deductPoint: 0,
            maxDeduct: 0,
        },
        customStructure: {
            state: false,
            required: [""],
            deductPoint: 0,
            maxDeduct: 0,
        },
        inheritSuper: {
            state: false,
            origins: [""],
            inherit: [""],
            deductPoint: 0,
            maxDeduct: 0,
        },
        inheritInterface: {
            state: false,
            origins: [""],
            inherit: [""],
            deductPoint: 0,
            maxDeduct: 0,
        },
        overriding: {
            state: false,
            required: [""],
            deductPoint: 0,
            maxDeduct: 0,
        },
        overloading: {
            state: false,
            required: [""],
            deductPoint: 0,
            maxDeduct: 0,
        },
        javadoc: {
            state: false,
            deductPoint : 0,
        },
        thread: {
            state: false,
            deductPoint : 0,
        },
        encapsulation: {
            state: false,
            deductPoint : 0,
        },
    };

    const [open, setOpen] = useState(props.state);
    const [initial, setInitial] = useState(initial_data);
    const [policy, setPolicy] = useState(initial_data);
    const [state, setState] = useState(initial_state);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>();

    useEffect(() => {
        const currentPolicyState = async (): Promise<GradingPolicyProps[]> => {
            return await axios.get<GradingPolicyProps[]>('http://isel.lifove.net/api/token2.0/')
                .then((response) => {
                    return response.data
                });
        };

        currentPolicyState()
            .then(response => {
                setInitial(response.find(element => element.itoken === props.itoken) || initial_data);
                if (policy === initial_data) {
                    setPolicy(response.find(element => element.itoken === props.itoken) || initial_data);
                }
                if (response.find(element => element.itoken === props.itoken) === undefined) {
                    setOpen(false);
                    alert("채점 정책을 수정할 수 없습니다.😅");
                }

                setSelectedDate(new Date(initial.dueDate));
            })
    }, [initial]);


    const handleDialogClose = () => {
        props.handleClose();
        setOpen(false);
        // setState(initial_state);
    }


    const handleSubmittedClose = () => {
        props.handleClose();
        setSubmitted(false);
        setOpen(false);
    }


    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);

        if (date !== null) {
            let _YEAR = date?.getFullYear();
            let month = (1 + date?.getMonth());
            let _MONTH = month >= 10 ? month.toString() : '0' + month.toString();
            let day = date.getDate();
            let _DAY = day >= 10 ? day.toString() : '0' + day.toString();
            let hour = date.getHours();
            let _HOUR = hour >= 10 ? hour.toString() : '0' + hour.toString();
            let minute = date.getMinutes();
            let _MINUTE = minute >= 10 ? minute.toString() : '0' + minute.toString();
            let _SECOND = '59';

            let _DATE = _YEAR + '-' + _MONTH + '-' + _DAY + ' ' + _HOUR + ':' + _MINUTE + ':' + _SECOND;

            setPolicy(
                produce(draft => {
                    draft['dueDate'] = _DATE;
                })
            );
        }
    }


    const handleEdit = (types: string) => {
        setState(
            produce(draft => {
                draft[types] = true;
            })
        );
    }

    const handleCreate = (types: string, data : Object) => {
        setPolicy(
            produce(draft => {
                draft[types] = data;
            })
        );
    }

    const handleOnClose = (types: string) => {
        setState(
            produce(draft => {
                draft[types] = false;
            })
        );
    }

    const handleCountOnSubmit = (types: string, state: boolean, methods: number, fields: number, enFors: number, deductPoint: number) => {
        setPolicy(
            produce(draft => {
                draft[types].state = state;
                draft[types].methodCount = methods;
                draft[types].fieldCount = fields;
                draft[types].enForCount = enFors;
                draft[types].deductPoint = deductPoint;
            })
        );

        setState(
            produce(draft => {
                draft[types] = false;
            })
        );
    }

    const handleCompileOnSubmit = (types: string, state: boolean, buildTool: boolean, deductPoint: number) => {
        setPolicy(
            produce(draft => {
                draft[types].state = state;
                draft[types].buildTool = buildTool;
                draft[types].deductPoint = deductPoint;
            })
        );

        setState(
            produce(draft => {
                draft[types] = false;
            })
        );
    }

    const handleOracleOnSubmit = (types: string, state: boolean, input: string[], output: string[], checksum: string[], filePath: string[], deductPoint: number, maxDeduct: number) => {
        setPolicy(
            produce(draft => {
                draft[types].state = state;
                draft[types].input = input;
                draft[types].output = output;
                draft[types].checksum = checksum;
                draft[types].filePath = filePath;
                draft[types].deductPoint = deductPoint;
                draft[types].maxDeduct = maxDeduct;
            })
        );

        setState(
            produce(draft => {
                draft[types] = false;
            })
        );
    }

    const handleMethodOnSubmit = (types: string, state: boolean, required: string[], count: number[], classes: string[], deductPoint: number, maxDeduct: number) => {
        setPolicy(
            produce(draft => {
                draft[types].state = state;
                draft[types].required = required;
                draft[types].count = count;
                draft[types].classes = classes;
                draft[types].deductPoint = deductPoint;
                draft[types].maxDeduct = maxDeduct;
            })
        );

        setState(
            produce(draft => {
                draft[types] = false;
            })
        );
    }

    const handleUtilsOnSubmit = (types: string, state: boolean, required: [], deductPoint: number, maxDeduct: number) => {
        setPolicy(
            produce(draft => {
                draft[types].state = state;
                draft[types].required = required;
                draft[types].deductPoint = deductPoint;
                draft[types].maxDeduct = maxDeduct;
            })
        );

        setState(
            produce(draft => {
                draft[types] = false;
            })
        );
    }

    const handleInterfaceOrSuperClassOnSubmit =  (policy: string, types: string, state: boolean, origins: [], inherit: [], deductPoint: number, maxDeduct: number) => {
        setPolicy(
            produce(draft => {
                draft[policy].state = state;
                draft[policy].origins = origins;
                draft[policy].inherit = inherit;
                draft[policy].deductPoint = deductPoint;
                draft[policy].maxDeduct = maxDeduct;
            })
        );

        setState(
            produce(draft => {
                draft[types] = false;
            })
        );
    }

    const handleCustomOnSubmit = (policy: string, types: string, state: boolean, required: [], deductPoint: number, maxDeduct: number) => {
        setPolicy(
            produce(draft => {
                draft[policy].state = state;
                draft[policy].required = required;
                draft[policy].deductPoint = deductPoint;
                draft[policy].maxDeduct = maxDeduct;
            })
        );

        setState(
            produce(draft => {
                draft[types] = false;
            })
        );
    }

    const handleCheckOnSubmit = (types: string, state: boolean, deductPoint: number) => {
        setPolicy(
            produce(draft => {
                draft[types].state = state;
                draft[types].deductPoint = deductPoint;
            })
        );

        setState(
            produce(draft => {
                draft[types] = false;
            })
        );
    }


    const handleSubmit = async () => {
        setLoading(true);

        await axios.post("http://isel.lifove.net/api/token2.0/update", JSON.stringify(policy, null, 2), {
            headers: {"Content-Type": 'application/json'}
        }).then((res) => {
            setOpen(false);
            setSubmitted(true);
            setLoading(false);
        })

        console.log( JSON.stringify(policy, null, 2) );
    }


    return (
        <div>
            {open &&
                <Dialog
                    open={open}
                    onClose={handleDialogClose}
                    aria-labelledby="form-dialog-title"
                    disableBackdropClick={true}
                    disableEscapeKeyDown={true}
                    maxWidth="sm"
                    scroll='paper'
                >
                    <DialogTitle id="form-dialog-title">{initial.className}</DialogTitle>
                    <DialogContent dividers>
                        <DialogContentText>
                            {t('dialog.update.2')}
                            <br></br>
                            {t('dialog.update.3')}
                        </DialogContentText>
                        <Grid container spacing={2}>
                            <Grid item>
                                <TextField
                                    size="medium"
                                    type="number"
                                    margin="normal"
                                    defaultValue={initial.point}
                                    label={t('policy.point')}
                                    onChange={e => setPolicy({ ...policy, point: (parseFloat(e.target.value) || initial.point)})}
                                />
                            </Grid>
                            <Grid item>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DateTimePicker
                                        size="medium"
                                        margin="normal"
                                        format="yyyy/MM/dd hh:mm a"
                                        value={selectedDate}
                                        label={t('dialog.deadline')}
                                        onChange={handleDateChange}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                        </Grid>
                        <FormGroup>
                            <Grid container direction="row">
                                <Grid item>
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={policy.count.state}
                                                      name="count" />}
                                        label="Count"
                                    />
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="text"
                                        size="small"
                                        style={{ fontSize: "12px", width: "fit-content", textTransform: "none" }}
                                        onClick={() => handleEdit("count")}
                                        className={classes.edit}
                                    >
                                        ✏️ Edit
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid container direction="row">
                                <Grid item>
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={policy.compiled.state}
                                                      name="compiled" />}
                                        label="Compile"
                                    />
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="text"
                                        size="small"
                                        style={{ fontSize: "12px", width: "fit-content", textTransform: "none" }}
                                        onClick={() => handleEdit("compiled")}
                                        className={classes.edit}
                                    >
                                        ✏️ Edit
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid container direction="row">
                                <Grid item>
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={policy.oracle.state}
                                                      name="oracle" />}
                                        label="Oracle"
                                    />
                                </Grid>
                                <Button
                                    variant="text"
                                    size="small"
                                    style={{ fontSize: "12px", width: "fit-content", textTransform: "none" }}
                                    onClick={() => handleEdit("oracle")}
                                    className={classes.edit}
                                >
                                    ✏️ Edit
                                </Button>
                            </Grid>
                            <Grid container direction="row">
                                <Grid item>
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={policy.classes.state}
                                                      name="classes" />}
                                        label="Classes"
                                    />
                                </Grid>
                                <Button
                                    variant="text"
                                    size="small"
                                    style={{ fontSize: "12px", width: "fit-content", textTransform: "none" }}
                                    onClick={() => handleEdit("classes")}
                                    className={classes.edit}
                                >
                                    ✏️ Edit
                                </Button>
                            </Grid>
                            <Grid container direction="row">
                                <Grid item>
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={policy.methods.state}
                                                      name="methods" />}
                                        label="Methods"
                                    />
                                </Grid>
                                <Button
                                    variant="text"
                                    size="small"
                                    style={{ fontSize: "12px", width: "fit-content", textTransform: "none" }}
                                    onClick={() => handleEdit("methods")}
                                    className={classes.edit}
                                >
                                    ✏️ Edit
                                </Button>
                            </Grid>
                            <Grid container direction="row">
                                <Grid item>
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={policy.packages.state}
                                                      name="packages" />}
                                        label="Packages"
                                    />
                                </Grid>
                                <Button
                                    variant="text"
                                    size="small"
                                    style={{ fontSize: "12px", width: "fit-content", textTransform: "none" }}
                                    onClick={() => handleEdit("packages")}
                                    className={classes.edit}
                                >
                                    ✏️ Edit
                                </Button>
                            </Grid>
                            <Grid container direction="row">
                                <Grid item>
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={policy.inheritInterface.state}
                                                      name="interfaces" />}
                                        label="Interface"
                                    />
                                </Grid>
                                <Button
                                    variant="text"
                                    size="small"
                                    style={{ fontSize: "12px", width: "fit-content", textTransform: "none" }}
                                    onClick={() => handleEdit("interfaces")}
                                    className={classes.edit}
                                >
                                    ✏️ Edit
                                </Button>
                            </Grid>
                            <Grid container direction="row">
                                <Grid item>
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={policy.inheritSuper.state}
                                                      name="superclass" />}
                                        label="Superclass"
                                    />
                                </Grid>
                                <Button
                                    variant="text"
                                    size="small"
                                    style={{ fontSize: "12px", width: "fit-content", textTransform: "none" }}
                                    onClick={() => handleEdit("superclass")}
                                    className={classes.edit}
                                >
                                    ✏️ Edit
                                </Button>
                            </Grid>
                            <Grid container direction="row">
                                <Grid item>
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={policy.overriding.state}
                                                      name="overriding" />}
                                        label="Overriding"
                                    />
                                </Grid>
                                <Button
                                    variant="text"
                                    size="small"
                                    style={{ fontSize: "12px", width: "fit-content", textTransform: "none" }}
                                    onClick={() => handleEdit("overriding")}
                                    className={classes.edit}
                                >
                                    ✏️ Edit
                                </Button>
                            </Grid>
                            <Grid container direction="row">
                                <Grid item>
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={policy.overloading.state}
                                                      name="overloading" />}
                                        label="Overloading"
                                    />
                                </Grid>
                                <Button
                                    variant="text"
                                    size="small"
                                    style={{ fontSize: "12px", width: "fit-content", textTransform: "none" }}
                                    onClick={() => handleEdit("overloading")}
                                    className={classes.edit}
                                >
                                    ✏️ Edit
                                </Button>
                            </Grid>
                            <Grid container direction="row">
                                <Grid item>
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={policy.customException.state}
                                                      name="custexc" />}
                                        label="Custom Exception Class"
                                    />
                                </Grid>
                                <Button
                                    variant="text"
                                    size="small"
                                    style={{ fontSize: "12px", width: "fit-content", textTransform: "none" }}
                                    onClick={() => handleEdit("custexc")}
                                    className={classes.edit}
                                >
                                    ✏️ Edit
                                </Button>
                            </Grid>
                            <Grid container direction="row">
                                <Grid item>
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={policy.customStructure.state}
                                                      name="custstr" />}
                                        label="Custom Data Structure Class"
                                    />
                                </Grid>
                                <Button
                                    variant="text"
                                    size="small"
                                    style={{ fontSize: "12px", width: "fit-content", textTransform: "none" }}
                                    onClick={() => handleEdit("custstr")}
                                    className={classes.edit}
                                >
                                    ✏️ Edit
                                </Button>
                            </Grid>
                            <Grid container direction="row">
                                <Grid item>
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={policy.thread.state}
                                                      name="thread" />}
                                        label="Threads"
                                    />
                                </Grid>
                                <Button
                                    variant="text"
                                    size="small"
                                    style={{ fontSize: "12px", width: "fit-content", textTransform: "none" }}
                                    onClick={() => handleEdit("thread")}
                                    className={classes.edit}
                                >
                                    ✏️ Edit
                                </Button>
                            </Grid>
                            <Grid container direction="row">
                                <Grid item>
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={policy.javadoc.state}
                                                      name="javadoc" />}
                                        label="Javadoc"
                                    />
                                </Grid>
                                <Button
                                    variant="text"
                                    size="small"
                                    style={{ fontSize: "12px", width: "fit-content", textTransform: "none" }}
                                    onClick={() => handleEdit("javadoc")}
                                    className={classes.edit}
                                >
                                    ✏️ Edit
                                </Button>
                            </Grid>
                            <Grid container direction="row">
                                <Grid item>
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={policy.encapsulation.state}
                                                      name="encapsulation" />}
                                        label="Encapsulation"
                                    />
                                </Grid>
                                <Button
                                    variant="text"
                                    size="small"
                                    style={{ fontSize: "12px", width: "fit-content", textTransform: "none" }}
                                    onClick={() => handleEdit("encapsulation")}
                                    className={classes.edit}
                                >
                                    ✏️ Edit
                                </Button>
                            </Grid>
                        </FormGroup>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleDialogClose} color="primary">
                            {t('closed')}
                        </Button>
                        <Button onClick={handleSubmit} color="primary">
                            {t('submit')}
                        </Button>
                    </DialogActions>

                    {state.count &&
                        <CountDialog open={state.count} onCreate={handleCreate} onClose={handleOnClose} onSubmit={handleCountOnSubmit} initial={policy.count} keepMounted /> }

                    {state.compiled &&
                        <CompiledDialog open={state.compiled} onCreate={handleCreate} onClose={handleOnClose} onSubmit={handleCompileOnSubmit} initial={policy.compiled} keepMounted /> }

                    {state.oracle &&
                        <OracleDialog open={state.oracle} onCreate={handleCreate} onClose={handleOnClose} onSubmit={handleOracleOnSubmit} initial={policy.oracle} keepMounted /> }

                    {state.classes &&
                        <ClassDialog open={state.classes} onCreate={handleCreate} onClose={handleOnClose} onSubmit={handleUtilsOnSubmit} initial={policy.classes} keepMounted /> }

                    {state.methods &&
                        <MethodDialog open={state.methods} onCreate={handleCreate} onClose={handleOnClose} onSubmit={handleMethodOnSubmit} initial={policy.methods} keepMounted /> }

                    {state.packages &&
                        <PackageDialog open={state.packages} onCreate={handleCreate} onClose={handleOnClose} onSubmit={handleUtilsOnSubmit} initial={policy.packages} keepMounted /> }

                    {state.interfaces &&
                        <InterfaceDialog open={state.interfaces} onCreate={handleCreate} onClose={handleOnClose} onSubmit={handleInterfaceOrSuperClassOnSubmit} initial={policy.inheritInterface} keepMounted /> }

                    {state.superclass &&
                        <SuperclassDialog open={state.superclass} onCreate={handleCreate} onClose={handleOnClose} onSubmit={handleInterfaceOrSuperClassOnSubmit} initial={policy.inheritSuper} keepMounted /> }

                    {state.overriding &&
                        <OverridingDialog open={state.overriding} onCreate={handleCreate} onClose={handleOnClose} onSubmit={handleUtilsOnSubmit} initial={policy.overriding} keepMounted /> }

                    {state.overloading &&
                        <OverloadingDialog open={state.overloading} onCreate={handleCreate} onClose={handleOnClose} onSubmit={handleUtilsOnSubmit} initial={policy.overloading} keepMounted /> }

                    {state.custexc &&
                        <ExceptionDialog open={state.custexc} onCreate={handleCreate} onClose={handleOnClose} onSubmit={handleCustomOnSubmit} initial={policy.customException} keepMounted /> }

                    {state.custstr &&
                        <StructureDialog open={state.custstr} onCreate={handleCreate} onClose={handleOnClose} onSubmit={handleCustomOnSubmit} initial={policy.customStructure} keepMounted /> }

                    {state.thread &&
                        <ThreadDialog open={state.thread} onCreate={handleCreate} onClose={handleOnClose} onSubmit={handleCheckOnSubmit} initial={policy.thread} keepMounted /> }

                    {state.javadoc &&
                        <JavadocDialog open={state.javadoc} onCreate={handleCreate} onClose={handleOnClose} onSubmit={handleCheckOnSubmit} initial={policy.javadoc} keepMounted /> }

                    {state.encapsulation &&
                        <EncapDialog open={state.encapsulation} onCreate={handleCreate} onClose={handleOnClose} onSubmit={handleCheckOnSubmit} initial={policy.encapsulation} keepMounted /> }

                    {loading &&
                        <Backdrop open={loading} className={classes.backdrop}>
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    }

                </Dialog>
            }

            {submitted &&
                <Dialog
                    open={submitted}
                    onClose={handleSubmittedClose}
                    maxWidth="sm"
                    scroll='paper'
                >
                    <DialogTitle id="form-dialog-title">
                        {t('check.again.1')}
                    </DialogTitle>
                    <DialogContent dividers>
                        <DialogContentText>
                            {t('check.again.2')}
                            <Typographic variant="h3" color="inherit">
                                <Typographic variant="caption" color="inherit">
                                    {t('gtoken')} <br />
                                </Typographic>
                                {policy.token}
                                <br />
                                <Typographic variant="caption" color="inherit">
                                    {t('itoken')} <br />
                                </Typographic>
                                {policy.itoken}
                            </Typographic>
                        </DialogContentText>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleSubmittedClose} color="primary">
                            {t('closed')}
                        </Button>
                    </DialogActions>
                </Dialog>
            }

        </div>
    )
}