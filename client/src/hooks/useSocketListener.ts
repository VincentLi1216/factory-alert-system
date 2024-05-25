// useSocketListener.ts
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { setImageData, getImageData, setHistoricalData, setHistoricalxLabels } from '../features/dataFetching/DataSlice';
import { useAppSelector } from "../app/hooks";

const socket = io('http://localhost:5000');

export const useSocketListener = () => {
  const dispatch = useDispatch();
  const imageSrc = useAppSelector(getImageData);

  useEffect(() => {
    socket.on('connect', () => console.log('Connected to Socket.IO server'));
    socket.on('video_frame', (data: { image: string }) => {
      dispatch(setImageData(data.image));
    });
    socket.on('historical_data_update', (res: any) => {
      dispatch(setHistoricalData(res.data))
      dispatch(setHistoricalxLabels(res.timestamp))
    });

    return () => {
      socket.off('connect');
      socket.off('video_frame');
    };
  }, [dispatch]);
}