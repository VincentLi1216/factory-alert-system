import React, { useEffect } from 'react'
import { LineChart } from '@mui/x-charts/LineChart';
import { useSelector } from 'react-redux';
import { getHistoricalData, getHistoricalxLabels } from '../features/dataFetching/DataSlice';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
let pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
];

const HistoricalChart = () => {
    const historicalData = useSelector(getHistoricalData)
    const historicalxLabels = useSelector(getHistoricalxLabels)

    return (
        <LineChart
            sx={{width: "100%", height: "100%"}}
            series={[
                { curve: "linear", data: historicalData.block, label: 'Block' },
                { curve: "linear", data: historicalData.ball, label: 'Ball' },
                { curve: "linear", data: historicalData.person, label: 'Person' },
            ]}
            xAxis={[{ scaleType: 'point', data: historicalxLabels }]}
        />
    )
}

export default HistoricalChart
