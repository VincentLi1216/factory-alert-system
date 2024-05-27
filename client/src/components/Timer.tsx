import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setSeconds, getSeconds, getIsStarted, setIsStarted } from '../features/dataFetching/DataSlice';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PhotoSizeSelectSmallIcon from '@mui/icons-material/PhotoSizeSelectSmall';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import Typography from '@mui/material/Typography';

const Timer = () => {
    const dispatch = useDispatch();
    const seconds = useSelector(getSeconds);
    const isStarted = useSelector(getIsStarted);

    const [tmpSeconds, setTmpSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isStarted) return;
            setTmpSeconds(seconds + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [isStarted, seconds]);

    useEffect(() => {
        dispatch(setSeconds(tmpSeconds));
    }, [tmpSeconds]);

    return (
        <>
        <Grid item xs={8} sx={{display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
            <Typography variant="h5" sx={{color: "#003C43"}}>Run time:</Typography>
        </Grid>
        <Grid item xs={4} sx={{display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
            <Typography variant="h5" sx={{color: "#003C43"}}>{seconds} seconds</Typography>
        </Grid>
        </>
    )
}

export default Timer
