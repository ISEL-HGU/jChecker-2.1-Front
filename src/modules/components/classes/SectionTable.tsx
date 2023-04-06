import { TableContainer,
    Table,
    TableRow,
    TableBody,
    TableCell,
    Paper,
    TableHead,
    TablePagination,
    makeStyles,
    withStyles,
    Theme,
    createStyles,
    TableSortLabel} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ClassroomInstTokenProps, EnhancedTableProps, GradingResultProps, Order, ResultKeyProps } from ".";


const useStyles = makeStyles((theme: Theme) => ({
    root: {
        maxWidth: 500,
        [theme.breakpoints.up('md')]: {
            maxWidth: 1200,
        },
        [theme.breakpoints.up('xl')]: {
            maxWidth: 2000,
        },
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    container: {
        maxHeight: 440,
        [theme.breakpoints.up('md')]: {
            maxHeight: 680,
        }
    },
    hidden: {
        border: 0,
        clip: 'rect(0, 0, 0, 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    head: {
        color: theme.palette.common.white,
    }
}));


const StyledTableRow = withStyles((theme: Theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: '#00234B',
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 16,
        }
    }))(TableCell);



function clean (obj: GradingResultProps) {
    const c = {} as GradingResultProps;

    for (var keys in obj) {
        if (keys === 'id' || keys === 'isDirect' || keys === 'token' ||
            keys === 'itoken' || keys === 'instructor')
            continue;

        if (obj[keys] === null || obj[keys] === undefined) {
            continue;
        }

        c[keys] = obj[keys];
    }

    return c;
}



function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }

    if (b[orderBy] > a[orderBy]) {
        return 1;
    }

    return 0;
}


function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}


function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((element, index) => [element, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0)
            return order;

        return a[1] - b[1];
    });

    return stabilizedThis.map((element) => element[0]);
}


function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, onRequestSort, keyGroup } = props;

    const createSortHandler = (property: keyof ResultKeyProps) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };


    return (
        <TableHead>
            <TableRow>
                <StyledTableCell key="stn" align="right" sortDirection={order} >
                    <TableSortLabel
                        active={true}
                        direction={order}
                        onClick={createSortHandler('studentNum')}
                        style={{ color: "white" }}
                    >
                        Student Number
                    </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell key="total" align="right">
                    Total Score
                </StyledTableCell>
                <StyledTableCell key="res" align="right" sortDirection={order} >
                    <TableSortLabel
                        active={true}
                        direction={order}
                        onClick={createSortHandler('result')}
                        style={{ color: "white" }}
                    >
                        Student Score
                    </TableSortLabel>

                </StyledTableCell>
                <StyledTableCell key="time" align="right">
                    Grading Timestamp
                </StyledTableCell>
                <StyledTableCell key="cname" align="right">
                    Class name
                </StyledTableCell>
                <StyledTableCell key="cname" align="right">
                    Violated Oracle Cases
                </StyledTableCell>
                <StyledTableCell key="cname" align="right">
                    Violated Checksum Cases
                </StyledTableCell>
                {keyGroup
                    .filter((row) => row !== 'feedbackLevel')
                    .map((row, index) => (
                    <StyledTableCell key={index} align="right">
                        {row}
                    </StyledTableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}


export default function SectionTable(props: ClassroomInstTokenProps) {
    const classes = useStyles();
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof ResultKeyProps>('studentNum');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [keyGroup, setKeyGroup] = useState<string[]>( [] );
    const [dataGroup, setDataGroup] = useState<GradingResultProps[]>( [] );


    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };


    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    };


    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof ResultKeyProps) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    }

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, dataGroup.length - page * rowsPerPage);


    useEffect(() => {
        const getGradingData = async () : Promise<GradingResultProps[]> => {
            // return await axios.get<GradingResultProps[]>('http://isel.lifove.net/api/grade2.0/', {
            return await axios.get<GradingResultProps[]>('/api/grade2.0/', {
                params: {
                    itoken: props.itoken
                },
            }).then((response) => {
                return response.data;
            });
        }

        getGradingData()
            .then((response) => {
                var i = 0;
                for (; i < response.length; i++) {
                    const element = clean(response[i]) as GradingResultProps;

                    if (i === 0) {
                        setKeyGroup(Object.keys(element).filter(item =>
                            item !== 'studentNum' && item !== 'point' && item !== 'result' &&
                            item !== 'gradingDate' && item !== 'className'));
                    }

                    setDataGroup(old => [ ...old, element]);
                }
            })
    }, [props.itoken]);


    return (
        <Paper className={classes.root}>
            <TableContainer component={Paper} className={classes.container}>
                <Table stickyHeader>
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        keyGroup={keyGroup}
                    />
                    <TableBody>
                        {stableSort(dataGroup, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                return (
                                    <StyledTableRow key={index + `v`}>
                                        <TableCell key={index + `stn`} align="right">
                                            {row['studentNum']}
                                        </TableCell>
                                        <TableCell key={index + `total`} align="right">
                                            {row.point}
                                        </TableCell>
                                        <TableCell key={index + `res`} align="right">
                                            {row.result}
                                        </TableCell>
                                        <TableCell key={index + `time`} align="right">
                                            {row.gradingDate}
                                        </TableCell>
                                        <TableCell key={index + `cname`} align="right">
                                            {row.className}
                                        </TableCell>
                                        <TableCell>
                                            {row.oracle?.violationNumber.map((violation) => (
                                                violation + ", "
                                            ))}
                                        </TableCell>
                                        <TableCell>
                                            {row.oracle?.checksumNumber.map((violation) => (
                                                violation + ", "
                                            ))}
                                        </TableCell>
                                        {keyGroup
                                            .filter((detail) => detail !== 'feedbackLevel')
                                            .map((detail, idx) => (
                                            <TableCell key={idx + 'each'} align="right">
                                                {-row[detail].deductedPoint}
                                            </TableCell>
                                        ))}

                                    </StyledTableRow>
                                );
                            })
                        }
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows}}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}

                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={dataGroup.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}