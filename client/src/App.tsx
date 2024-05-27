import "./App.css"
import React, { useState, useEffect } from 'react';
import { useSocketListener } from './hooks/useSocketListener';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

import Header from "./components/Header"
import Frame from "./components/Frame"
import ROIButton from "./components/ROIButton";
import CurrentChart from "./components/CurrentChart";
import HistoricalChart from "./components/HistoricalChart";
import User from "./components/User";
import DetectList from "./components/DetectList";

const App = () => {

  const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
        }, []);

  useSocketListener()
  return (
    <Box sx={{ width: "100vw", height: "101vh", 
    // border: "1px solid black"
    }}>
      <Grid container direction={"column"} sx={{width: "100%", height: "100%"}}>
        <Grid item container xs={1} sx={{
              // border: "1px solid black", 
              paddingY: 1, paddingX: 4}}>
          <Header />
        </Grid>
        <Grid item container xs={11} direction={"row"} sx={{width: "100%", height: "100%"}}>
          <Grid item container xs={2} direction={"column"}>
            <Grid item sx={{paddingX: 2}}>
              <DetectList />
            </Grid>
          </Grid>
          <Grid item container xs={10} direction={"column"}>
            <Grid container item xs={7.5} direction="row">
              <Grid item container xs={7.5} direction="row" 
              // sx={{display: "flex", 
              // border: "1px solid black", 
              // alignItems: "center", justifyContent: "center"}}
              >
                <ROIButton />
                <Frame />
              </Grid>
              <CurrentChart />
            </Grid>
            <Grid item xs={4} direction="column" sx={{display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 1
            // border: "1px solid black"
            }} >
              <HistoricalChart />
            </Grid>
          </Grid>
        </Grid>
        </Grid>
    </Box>
  )
}

export default App
