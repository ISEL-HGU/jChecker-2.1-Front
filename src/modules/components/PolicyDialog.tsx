import { Backdrop, Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, FormGroup, Grid, makeStyles, TextField, Theme } from "@material-ui/core";
import axios from "axios";
import produce from "immer";

import React, { useState } from "react";
import Typographic from './Typographic';
import { useTranslation } from "react-i18next";
import ClassDialog from "./policy/app.component.policy.classes";
import MethodDialog from "./policy/app.component.policy.methods";
import CompiledDialog from "./policy/app.component.policy.compiled";
import CountDialog from "./policy/app.component.policy.count";
import StructureDialog from "./policy/app.component.policy.custom.ds";
import ExceptionDialog from "./policy/app.component.policy.custom.except";
import EncapDialog from "./policy/app.component.policy.encap";
import InterfaceDialog from "./policy/app.component.policy.interface";
import OracleDialog from "./policy/app.component.policy.oracle";
import JavadocDialog from "./policy/app.component.policy.javadoc";
import OverloadingDialog from "./policy/app.component.policy.ovl";
import OverridingDialog from "./policy/app.component.policy.ovr";
import PackageDialog from "./policy/app.component.policy.package";
import SuperclassDialog from "./policy/app.component.policy.super";
import ThreadDialog from "./policy/app.component.policy.thread";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Typography from '@material-ui/core/Typography';
import DateFnsUtils from "@date-io/date-fns"


interface PolicyProps {
    state: boolean,
    className: string,
    instructor: string,
    token: string,
    itoken: string,
    isDirect: boolean,
};

const useStyles = makeStyles((theme: Theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
  }));


export default function SelectCond(props: PolicyProps) {

    const { t } = useTranslation();
    const classes = useStyles();

    const initial_state = {
        className: props.className,
        instructor: props.instructor,
        feedback: props.isDirect,
        feedbackLevel: 1,
        token: props.token,
        itoken: props.itoken,
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


    const initial_data = {
        className: props.className,
        instructor: props.instructor,
        feedback: props.isDirect,
        feedbackLevel: 1,
        token: props.token,
        itoken: props.itoken,
        point: 0,
        dueDate: new Date(),
        count: { state: false } as Object,
        compiled: { state: false } as Object,
        oracle: { state: false } as Object,
        classes : { state: false } as Object,

        methods: { state: false } as Object,

        packages: { state: false } as Object,
        customException: { state: false } as Object,
        customStructure: { state: false } as Object,
        inheritSuper: { state: false } as Object,
        inheritInterface: { state: false } as Object,
        overriding: { state: false } as Object,
        overloading: { state: false } as Object,
        javadoc: { state: false } as Object,
        thread: { state: false } as Object,
        encapsulation: { state: false } as Object,
    };

    const level_state = {
      selectList: [1, 2, 3],
      selectValue: 1
    };

    const [open, setOpen] = useState(props.state);
    const [policy, setPolicy] = useState(initial_data);
    const [state, setState] = useState(initial_state);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    const handleClose = () => {
        setOpen(false);
        setState(initial_state);
    }


    const handleSubmittedClose = () => {
        setSubmitted(false);
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


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'thread' || e.target.name === 'javadoc' || e.target.name === 'encapsulation') {
            setPolicy(
                produce(draft => {
                    draft[e.target.name] = e.target.checked;
                })
            )
        }

        setState(
            produce(draft => {
                draft[e.target.name] = e.target.checked;
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

    
    const handleSubmit = async () => {
        setLoading(true);

        await axios.post("http://isel.lifove.net/api/token2.0/save", JSON.stringify(policy, null, 2), {
            headers: {"Content-Type": 'application/json'}
        }).then((res) => {
            setOpen(false);
            setState(initial_state);
            setPolicy(initial_data);
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
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                    disableBackdropClick={true}
                    disableEscapeKeyDown={true}
                    maxWidth="sm"
                    scroll='paper'
                >
                <DialogTitle id="form-dialog-title">{t('dialog.1')}</DialogTitle>
                <DialogContent dividers>
                <DialogContentText>
                    {t('dialog.2')}
                </DialogContentText>
                    <Grid container spacing={2}>
                        <Grid item>
                            <TextField
                                size="medium"
                                type="number"
                                margin="normal"
                                value={policy.point}
                                label={t('policy.point')}
                                onChange={e => setPolicy({ ...policy, point: (parseFloat(e.target.value) || policy.point)})}
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
                        <Grid container direction="row">
                            <Typography style={{color: 'grey', fontSize: '11px'}}>&nbsp;&nbsp;&nbsp;{t('policy.level')}&nbsp;&nbsp;</Typography>
                            <Grid item spacing={1}>
                                {level_state.selectList.map((value, i) => (
                                    <React.Fragment key={i}>
                                        <input
                                            id={value.toString()}
                                            value={value}
                                            name="feedbackLevel"
                                            type="radio"
                                            checked={policy.feedbackLevel === value}
                                            onChange={e => setPolicy({ ...policy, feedbackLevel: (parseInt(e.target.value) || policy.feedbackLevel)})}
                                        />
                                        {value}
                                    </React.Fragment>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.count}
                                        onChange={handleChange}
                                        name="count" />}
                            label="Count"
                        />

                        <FormControlLabel
                            control={
                                <Checkbox checked={state.compiled}
                                        onChange={handleChange}
                                        name="compiled" />}
                            label="Compile"
                        />

                        <FormControlLabel
                            control={
                                <Checkbox checked={state.oracle}
                                        onChange={handleChange}
                                        name="oracle" />}
                            label="Oracle"
                        />
                        
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.classes}
                                        onChange={handleChange}
                                        name="classes" />}
                            label="Classes"
                        />

                        <FormControlLabel
                            control={
                                <Checkbox checked={state.methods}
                                          onChange={handleChange}
                                          name="methods" />}
                            label="Methods"
                        />
                        
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.packages}
                                        onChange={handleChange}
                                        name="packages" />}
                            label="Packages"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.interfaces}
                                        onChange={handleChange}
                                        name="interfaces" />}
                            label="Interface"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.superclass}
                                        onChange={handleChange}
                                        name="superclass" />}
                            label="Superclass"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.overriding}
                                        onChange={handleChange}
                                        name="overriding" />}
                            label="Overriding"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.overloading}
                                        onChange={handleChange}
                                        name="overloading" />}
                            label="Overloading"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.custexc}
                                        onChange={handleChange}
                                        name="custexc" />}
                            label="Custom Exception Class"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.custstr}
                                        onChange={handleChange}
                                        name="custstr" />}
                            label="Custom Data Structure Class"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.thread}
                                        onChange={handleChange}
                                        name="thread" />}
                            label="Threads"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.javadoc}
                                        onChange={handleChange}
                                        name="javadoc" />}
                            label="Javadoc"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.encapsulation}
                                        onChange={handleChange}
                                        name="encapsulation" />}
                            label="Encapsulation"
                        />
                    </FormGroup>
                    
                </DialogContent>
                
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        {t('closed')}
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        {t('submit')}
                    </Button>
                </DialogActions>
                
                {state.count && 
                    <CountDialog open={state.count} onCreate={handleCreate} keepMounted /> }

                {state.compiled && 
                    <CompiledDialog open={state.compiled} onCreate={handleCreate} keepMounted /> }

                {state.oracle && 
                    <OracleDialog open={state.oracle} onCreate={handleCreate} keepMounted /> }
                
                {state.classes &&
                    <ClassDialog open={state.classes} onCreate={handleCreate} keepMounted /> }

                {state.methods &&
                    <MethodDialog open={state.methods} onCreate={handleCreate} keepMounted /> }

                {state.packages &&
                    <PackageDialog open={state.packages} onCreate={handleCreate} keepMounted />}
                
                {state.interfaces &&
                    <InterfaceDialog open={state.interfaces} onCreate={handleCreate} keepMounted />}

                {state.superclass &&
                    <SuperclassDialog open={state.superclass} onCreate={handleCreate} keepMounted />}

                {state.overriding &&
                    <OverridingDialog open={state.overriding} onCreate={handleCreate} keepMounted />}

                {state.overloading &&
                    <OverloadingDialog open={state.overloading} onCreate={handleCreate} keepMounted />}

                {state.custexc &&
                    <ExceptionDialog open={state.custexc} onCreate={handleCreate} keepMounted />}

                {state.custstr &&
                    <StructureDialog open={state.custstr} onCreate={handleCreate} keepMounted />}

                {state.javadoc &&
                    <JavadocDialog open={state.javadoc} onCreate={handleCreate} keepMounted />}

                {state.thread &&
                    <ThreadDialog open={state.thread} onCreate={handleCreate} keepMounted />}

                {state.encapsulation &&
                    <EncapDialog open={state.encapsulation} onCreate={handleCreate} keepMounted />}

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