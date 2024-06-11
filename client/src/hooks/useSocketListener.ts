// useSocketListener.ts
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { setImageData, getImageData, setHistoricalData, setHistoricalxLabels, updateDetectRecords, setChartData, setTableData } from '../features/dataFetching/DataSlice';
import { useAppSelector } from "../app/hooks";

const socket = io('http://localhost:4999');

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

export const useSocketListener = () => {
  const dispatch = useDispatch();
  const imageSrc = useAppSelector(getImageData);

  useEffect(() => {
    socket.on('connect', () => console.log('Connected to Socket.IO server'));
    socket.on('video_frame', (data: { image: string, processedImage: string | boolean, imageType: string }) => {
      dispatch(setImageData(data.image));
      console.log("data", data)
      if (data.processedImage) {
        dispatch(updateDetectRecords({
          detect: data.imageType[0].toUpperCase() + data.imageType.slice(1),
          time: new Date().toLocaleString(),
          image: data.processedImage
        }))
      }
    });
    socket.on('historical_data_update', (res: any) => {
      dispatch(setHistoricalData(res.data))
      dispatch(setHistoricalxLabels(res.timestamp))
      console.log("res.chartData", res.tableData.pastTen)
      const rows = [
        createData('Current', res.tableData.current.block, res.tableData.current.ball, res.tableData.current.person, res.tableData.current.total),
        createData('Past 10 minutes', res.tableData.pastTen.block, res.tableData.pastTen.ball, res.tableData.pastTen.person, res.tableData.pastTen.total),
        createData('Past day', res.tableData.pastDay.block, res.tableData.pastDay.ball, res.tableData.pastDay.person, res.tableData.pastDay.total),
      ]
      dispatch(setTableData(rows))
      const chartData = [
        { data: [res.tableData.current.block, res.tableData.pastTen.block, res.tableData.pastDay.block], label: 'Blocks' }, 
        { data: [res.tableData.current.ball, res.tableData.pastTen.ball, res.tableData.pastDay.ball], label: 'Balls' }, 
        { data: [res.tableData.current.person, res.tableData.pastTen.person, res.tableData.pastDay.person], label: 'Person'}
      ]
      dispatch(setChartData(chartData))
    });

    return () => {
      socket.off('connect');
      socket.off('video_frame');
    };
  }, [dispatch]);
}