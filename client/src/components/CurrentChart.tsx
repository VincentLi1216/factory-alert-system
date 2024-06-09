import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { BarChart } from '@mui/x-charts/BarChart';
import { useAppSelector } from '../app/hooks';
import { getTableData, getChartData } from '../features/dataFetching/DataSlice';

import Timer from './Timer';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const CurrentChart = () => {
  const tableData = useAppSelector(getTableData);
  const chartData = useAppSelector(getChartData);
  return (
    <Grid item container direction="column" xs={4.5} sx={{width: "90%", height: "100%", paddingRight: 2}}>
        <Grid item container xs={0.5} sx={{width: "100%", height: "100%",  display: "flex", alignItems: "center", paddingBottom: 0.5, paddingRight: 0.5}}>
          <Timer />
        </Grid>
        <Grid item xs={11} direction="column" sx={{width: "100%", height: "100%",  display: "flex", justifyContent: "center", alignItems: "center", background: "#CDE8E5", borderRadius: 5}}>
        <TableContainer component={Paper} sx={{boxShadow: "none", width: "80%", height: "45%", borderRadius: 3, margin: 0, background: "#CDE8E5", paddingTop: 1}}>
            <Table aria-label="simple table">
                <TableHead >
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell align="right">Blocks</TableCell>
                        <TableCell align="right">Balls</TableCell>
                        <TableCell align="right">Human</TableCell>
                        <TableCell align="right">Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody sx={{}}>
                    {tableData.map((row) => (
                        <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                        >
                        <TableCell sx={{fontSize: "13px", padding: 1.5}} component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell sx={{fontSize: "13px", padding: 1.5}} align="right">{row.calories}</TableCell>
                        <TableCell sx={{fontSize: "13px", padding: 1.5}} align="right">{row.fat}</TableCell>
                        <TableCell sx={{fontSize: "13px", padding: 1.5}} align="right">{row.carbs}</TableCell>
                        <TableCell sx={{fontSize: "13px", padding: 1.5}} align="right">{row.protein}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <BarChart
          xAxis={[{ scaleType: 'band', data: ['Current', 'Past 10 minutes', 'Past day'] }]}
          series={chartData}
          sx={{ width: "90%", height: "100%", margin: 0, borderRadius: 3, paddingY: 0}}
          width={450}
          height={200}
        />
    </Grid>
    </Grid>
  )
}

export default CurrentChart
