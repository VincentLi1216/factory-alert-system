import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PhotoSizeSelectSmallIcon from '@mui/icons-material/PhotoSizeSelectSmall';
import toast, { Toaster } from 'react-hot-toast';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getIsSelectingROI, setIsSelectingROI, setRegionsNew, getRegionsNew, getIsStarted, setIsStarted, setSeconds } from '../features/dataFetching/DataSlice';
import { useRoiMutation } from '../api/ControlUpdateSlice';

const notify = () => toast('Abnormality detected', {
    icon: '🍑',
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
      fontSize: '20px',
      padding: '10px 20px'
    },
  });;
  

const ROIButton = () => {
    const dispatch = useAppDispatch()
    const regionsNew = useAppSelector(getRegionsNew)
    const isSelectROI = useAppSelector(getIsSelectingROI)
    const isStarted = useAppSelector(getIsStarted)
    const [updateRoi, {isLoading, isSuccess, error}] = useRoiMutation()

    const handleRoiSubmit = async (isEmpty: boolean) => {
        try {
            if (isEmpty) await updateRoi([]).unwrap();
            if (!isEmpty) await updateRoi(regionsNew).unwrap();
            
        } catch (SearchError) {
            console.log(SearchError)
        }
      }

    return (
        <Grid item container xs={1} direction="column" sx={{width: "100%", height: "100%", display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
            <Toaster position="top-right"/>
                {!isStarted ? 
            <Button aria-label="start" variant="contained" onClick={()=>{
                dispatch(setIsStarted(true))
                handleRoiSubmit(true)
                }} size="large" sx={{background: "#1976d2", width: 60, height: 60, borderRadius: 5}}>
                <RadioButtonCheckedIcon fontSize="large" sx={{color: "white"}} />
            </Button> : !isSelectROI ? 
                <Stack spacing={2}>
                <Button aria-label="roi" variant="contained" size="large" onClick={()=>{
                    dispatch(setIsSelectingROI(true))
                }} sx={{background: "#1976d2", width: 60, height: 60, borderRadius: 5}}>
                    <PhotoSizeSelectSmallIcon fontSize="large" sx={{color: "white"}} />
                </Button>
                <Button aria-label="reset" variant="outlined" size="large" onClick={() => {
                    dispatch(setRegionsNew([]))
                    dispatch(setSeconds(0))
                    handleRoiSubmit(true)
                    }}
                    sx={{background: "white", border: "1px solid black", width: 60, height: 60, borderRadius: 5}}>
                    <RestartAltIcon fontSize="large" sx={{color: "black"}}/>
                </Button>
                </Stack> : 
                <Stack spacing={2}>
                <Button aria-label="roi" variant="contained" size="large" onClick={()=>{
                    dispatch(setIsSelectingROI(false))
                    dispatch(setSeconds(0))
                    handleRoiSubmit(false)
                }} sx={{background: "black", width: 60, height: 60, borderRadius: 5}}>
                    <CheckIcon fontSize="large" sx={{color: "white"}} />
                </Button>
                <Button aria-label="roi" variant="contained" size="large" onClick={()=>{
                    dispatch(setRegionsNew([]))
                    }} sx={{background: "black", width: 60, height: 60, borderRadius: 5}}>
                <CloseIcon fontSize="large" sx={{color: "white"}} />
                </Button>
                </Stack>}
        </Grid>
    )
}

export default ROIButton
