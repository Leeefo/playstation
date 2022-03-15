import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import playStateServices from '../../services/playState.services';

export const fetchData = createAsyncThunk(
    'time/fetchData',
    async () => {
        const response = await playStateServices.getState();
        return response.data().state

    }
)

const setDailyId = (lastId, startTime) => {
    console.log(lastId)
    const newIdDate = "D" + new Date(startTime).toLocaleString().slice(0, -12).split('/').join('')
    if (lastId.slice(1) === newIdDate) {
        return (Number(lastId[0]) + 1).toString() + newIdDate
    } else {
        return 1 + newIdDate
    }

}


const initialState =

    [


        {
            startTime: 0,
            endTime: 0,
            time: "0",
            isStarted: false,
            cost: 0,
            intervalId: null,
            isOpen: "default"

        },
        {
            startTime: 0,
            endTime: 0,
            time: "0",
            isStarted: false,
            cost: 0,
            intervalId: null,
            isOpen: "default"

        },
        {
            startTime: 0,
            endTime: 0,
            time: "0",
            isStarted: false,
            cost: 0,
            intervalId: null,
            isOpen: "default"

        },
        {
            startTime: 0,
            endTime: 0,
            time: "0",
            isStarted: false,
            cost: 0,
            intervalId: null,
            isOpen: "default"

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
            console.log(state[state.length - 1]);
            playStateServices.updateState({ state });
        },
        end: (state, { payload }) => {
            state[payload.deviceNumber].endTime = new Date(payload.time ?? new Date()).getTime();
            playStateServices.updateState({ state });
        },
        started: (state, { payload }) => {
            state[payload.deviceNumber].isStarted = payload.deviceStarted;
            console.log(payload.deviceStarted, "from dispatch started")
            playStateServices.updateState({ state });
        },
        reset: (state, { payload }) => {
            state[payload].endTime = initialState[payload].endTime
            state[payload].startTime = initialState[payload].startTime
            state[payload].isStarted = initialState[payload].isStarted
            state[payload].time = initialState[payload].time
            state[payload].cost = initialState[payload].cost
            state[payload].intervalId = initialState[payload].intervalId
            playStateServices.updateState({ state });
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
        },
        stateSetter: (state, { payload }) => {
            for (let i = 0; i < state.length - 1; i++) {
                state[i] = { ...payload[i] }
            }


            console.log(payload)
            console.log(state)
        },
        openSwitchSetter: (state, { payload }) => {
            state[payload.deviceNumber].isOpen = payload.openSwitch
            console.log(payload.openSwitch, "from dispatch")
        }

    },
    extraReducers: {
        [fetchData.pending]: () => {
            console.log("pending");
        },
        [fetchData.fulfilled]: (state, { payload }) => {
            console.log("Data fetched Successfully");
            for (let i = 0; i < state.length - 1; i++) {
                state[i] = { ...payload[i] }
            }
            console.log(payload)
            console.log(state)
        },
        [fetchData.rejected]: () => {
            console.log("Rejected")
        }
    }
})

export const { openSwitchSetter, stateSetter, dailyIdSetter, start, end, started, timeIntervalId, reset, timeSetter, costSetter } = timeSlice.actions;


export default timeSlice.reducer;