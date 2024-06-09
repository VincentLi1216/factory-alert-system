import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AlarmIcon from '@mui/icons-material/Alarm';
import Avatar from '@mui/material/Avatar';

const Header = () => {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
        }, []);

    return (
        <>
        <Grid item xs={4} sx={{
            // border: "1px solid black", 
            display: "flex", alignItems: "center"}}>
            <Typography variant="h5" sx={{fontWeight: 600, color: "#003C43"}}>Project Nocturnal Hawkeye</Typography>
        </Grid>
        <Grid item xs={4} sx={{
        // border: "1px solid black", 
        display: "flex", justifyContent: "center", alignItems: "center", gap: 1, borderRadius: 3, background: "white"}}>
        <AlarmIcon /><Typography color={"#003C43"} variant="h5">{currentDateTime.toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })}</Typography>
        </Grid>
        <Grid item container xs={4} sx={{
            // border: "1px solid black", 
            display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
            <Avatar alt="Admin" src="/" sx={{marginX: 2}}/>
            <Typography variant="h6">Hello, Admin!</Typography>
        </Grid>
        </>
    )
}

export default Header
