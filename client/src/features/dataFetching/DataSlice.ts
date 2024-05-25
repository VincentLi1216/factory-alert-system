import { createSlice } from '@reduxjs/toolkit'
import { get } from 'http';


export interface DataInitialSlice {
  imageData: string,
  isSelectingROI: boolean,
  regionsNew: any
  historicalxLabels: any
  historicalData: any
  seconds: number
  isStarted: boolean
}

export const DataInitialSlice: DataInitialSlice = {
  imageData: '',
  isSelectingROI: false,
  regionsNew: [],
  historicalxLabels: [],
  historicalData: {
    cat: [],
    ball: [],
    person: [],
  },
  seconds: 0,
  isStarted: false
};

export const DataSlice = createSlice({
  name: 'data',
  initialState: DataInitialSlice,
  reducers: {
    setImageData: (state, action) => {
      state.imageData = action.payload;
    }, 
    setIsSelectingROI: (state, action) => {
      state.isSelectingROI = action.payload;
    },
    setRegionsNew: (state, action) => {
      state.regionsNew = action.payload;
    },
    setHistoricalData: (state, action) => {
      state.historicalData = action.payload;
    },
    setHistoricalxLabels: (state, action) => {
      state.historicalxLabels = action.payload;
    },
    setSeconds: (state, action) => {
      state.seconds = action.payload;
    },
    setIsStarted: (state, action) => {
      state.isStarted = action.payload;
    }
  },
  selectors: {
    getImageData: (state) => state.imageData,
    getIsSelectingROI: (state) => state.isSelectingROI,
    getRegionsNew: (state) => state.regionsNew,
    getHistoricalData: (state) => state.historicalData,
    getHistoricalxLabels: (state) => state.historicalxLabels,
    getSeconds: (state) => state.seconds,
    getIsStarted: (state) => state.isStarted
  }
})

export const { 
  setImageData,
  setIsSelectingROI,
  setRegionsNew,
  setHistoricalData,
  setHistoricalxLabels,
  setSeconds,
  setIsStarted
 } = DataSlice.actions


export const { 
  getImageData,
  getIsSelectingROI,
  getRegionsNew,
  getHistoricalData,
  getHistoricalxLabels,
  getSeconds,
  getIsStarted
} = DataSlice.selectors