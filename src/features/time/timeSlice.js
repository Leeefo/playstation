import { createSlice } from '@reduxjs/toolkit';


const setDailyId = (lastId, startTime) => {

    const newIdDate = "D" + new Date(startTime).toLocaleString().slice(0, -12).split('/').join('')
    if (lastId.slice(1) === newIdDate) {
        return (Number(lastId[0]) + 1) + newIdDate
    } else {
        return 1 + newIdDate
    }

}


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
        "0"

    ]

export const timeSlice = createSlice({
    name: "time",
    initialState,
    reducers: {
        start: (state, { payload }) => {
            state[payload].startTime = new Date().getTime();
            state[state.length - 1] = setDailyId(state[state.length - 1], state[payload].startTime);
            console.log(state[state.length - 1])
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
        },
        dailyIdSetter: (state, { payload }) => {
            state[state.length - 1] = payload
        }

    }
})

export const { dailyIdSetter, start, end, started, timeIntervalId, reset, timeSetter, costSetter } = timeSlice.actions;


export default timeSlice.reducer;