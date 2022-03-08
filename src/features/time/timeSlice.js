import { createSlice } from '@reduxjs/toolkit';

const initialState =

    [


        {
            startTime: 0,
            endTime: 0,
            isStarted: false,
            cost: 0,
            intervalId: null

        },
        {
            startTime: 0,
            endTime: 0,
            isStarted: false,
            cost: 0,
            intervalId: null

        },
        {
            startTime: 0,
            endTime: 0,
            isStarted: false,
            cost: 0,
            intervalId: null

        },
        {
            startTime: 0,
            endTime: 0,
            isStarted: false,
            cost: 0,
            intervalId: null

        },

    ]

export const timeSlice = createSlice({
    name: "time",
    initialState,
    reducers: {
        start: (state, { payload }) => {
            state[payload].startTime = new Date().getTime();
        },
        end: (state, { payload }) => {
            state[payload.deviceNumber].endTime = new Date(payload.time ?? new Date()).getTime();
        },
        started: (state, { payload }) => {
            state[payload.deviceNumber].isStarted = payload.deviceStarted;
        },
        reset: (state, { payload }) => {
            state[payload].endTime = initialState[payload].endTime
            state[payload].startTime = initialState[payload].startTime
            state[payload].isStarted = initialState[payload].isStarted
            state[payload].cost = initialState[payload].cost
            state[payload].intervalId = initialState[payload].intervalId
        },
        timeIntervalId: (state, { payload }) => {
            state[payload.deviceNumber].intervalId = payload.intervalId
        },
        timeSetter: (state, { payload }) => {
            state[payload.deviceNumber].time = payload.time
        },
        costSetter: (state, { payload }) => {
            state[payload.deviceNumber].cost = payload.cost
        }

    }
})

export const { start, end, started, timeIntervalId, reset, timeSetter, costSetter } = timeSlice.actions;


export default timeSlice.reducer;