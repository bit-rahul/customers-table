import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Grid,
    Typography,
    TablePagination,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    table: {
        // minWidth: 650,
    },
    tableContainer: {
        borderRadius: 15,
        margin: "20px auto",
        maxWidth: "90%"
    },
    tableHeadCell: {
        fontWeight: 'bold',
        backgroundColor: "#BB86FC",
        color: theme.palette.getContrastText("#BB86FC")
    },
    tableBodyCell: {
        fontWeight: '400',
        backgroundColor: "#1E1E1E",
        color: theme.palette.getContrastText("#1E1E1E")
    },
    avatarClass: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light)
    },
    nameStyle: {
        fontWeight: '600',
        color: "#CF6679"
    },
    styleMember: {
        fontWeight: 'bold',
        fontSize: '0.8rem',
        color: 'white',
        backgroundColor: 'grey',
        padding: '2px 10px',
        display: 'inline-block',
        borderRadius: "6px"
    }
}));

function MTable() {
    const classes = useStyles();
    const [customerData, setCustomerData] = useState([]);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        fetch(
            `https://intense-tor-76305.herokuapp.com/merchants`,
            {
                method: "GET"
            }
        )
            .then(res => res.json())
            .then(response => {
                setCustomerData(response)
            })
            .catch(error => console.error(error))
    }, []);

    return (
        <>
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableHeadCell}>Customer name</TableCell>
                            <TableCell className={classes.tableHeadCell}>Email</TableCell>
                            <TableCell className={classes.tableHeadCell}>Phone</TableCell>
                            <TableCell className={classes.tableHeadCell}>Premium</TableCell>
                            <TableCell className={classes.tableHeadCell}>Max/Min bid</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customerData && customerData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => (
                            <TableRow key={i}>
                                <TableCell className={classes.tableBodyCell}>
                                    <Grid container>
                                        <Grid item lg={2}>
                                            <Avatar className={classes.avatarClass} alt={row.firstname + " " + row.lastname} src={row.avatarUrl} />
                                        </Grid>
                                        <Grid item lg={1}>&emsp;</Grid>
                                        <Grid item lg={9}>
                                            <Typography className={classes.nameStyle}>{row.firstname + " " + row.lastname}</Typography>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                                <TableCell className={classes.tableBodyCell}>
                                    <Typography color="primary" variant="subtitle2">
                                        {row.email}
                                    </Typography>
                                </TableCell>
                                <TableCell className={classes.tableBodyCell}>
                                    <Typography>
                                        {row.phone}
                                    </Typography>
                                </TableCell>
                                <TableCell className={classes.tableBodyCell}>
                                    <Typography className={classes.styleMember}
                                        style={{
                                            backgroundColor: row.hasPremium ? "green" : "orange"
                                        }}
                                    >
                                        {
                                            row.hasPremium
                                                ?
                                                "True"
                                                :
                                                "False"
                                        }
                                    </Typography></TableCell>
                                <TableCell className={classes.tableBodyCell}>{row.bids[0] ? row.bids[0].amount : null}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    style={{
                        backgroundColor: "#BB86FC",
                        color: "#181121"
                    }}
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={customerData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </TableContainer>
        </>
    )
}

export default MTable
