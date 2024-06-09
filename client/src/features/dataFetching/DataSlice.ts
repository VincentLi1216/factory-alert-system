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
  detectRecords: Object[]
  tableData: any[],
  chartData: Object[]
}

export const DataInitialSlice: DataInitialSlice = {
  imageData: '',
  isSelectingROI: false,
  regionsNew: [],
  historicalxLabels: [],
  historicalData: {
    block: [],
    ball: [],
    person: [],
  },
  seconds: 0,
  isStarted: false,
  detectRecords: [],
  tableData: [],
  chartData: []
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
    },
    updateDetectRecords: (state, action) => {
      state.detectRecords = [action.payload, ...state.detectRecords];
    },
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
    setChartData: (state, action) => {
      state.chartData = action.payload;
    }
  },
  selectors: {
    getImageData: (state) => state.imageData,
    getIsSelectingROI: (state) => state.isSelectingROI,
    getRegionsNew: (state) => state.regionsNew,
    getHistoricalData: (state) => state.historicalData,
    getHistoricalxLabels: (state) => state.historicalxLabels,
    getSeconds: (state) => state.seconds,
    getIsStarted: (state) => state.isStarted,
    getDetectRecords: (state) => state.detectRecords,
    getTableData: (state) => state.tableData,
    getChartData: (state) => state.chartData
  }
})

export const { 
  setImageData,
  setIsSelectingROI,
  setRegionsNew,
  setHistoricalData,
  setHistoricalxLabels,
  setSeconds,
  setIsStarted,
  updateDetectRecords,
  setTableData,
  setChartData
 } = DataSlice.actions


export const { 
  getImageData,
  getIsSelectingROI,
  getRegionsNew,
  getHistoricalData,
  getHistoricalxLabels,
  getSeconds,
  getIsStarted,
  getDetectRecords,
  getTableData,
  getChartData
} = DataSlice.selectors