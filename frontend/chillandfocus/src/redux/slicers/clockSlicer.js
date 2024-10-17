import { createSlice } from "@reduxjs/toolkit";
const POMODORO = "pomodoro";
const SHORT_BREAK = "shortBreak";
const LONG_BREAK = "longBreak";
const MAX_COUNT = 3;
// const mode = { "po": "pomodoro", "sb": "shortBreak", "lb": "longBreak" };

const initState = {
    pomodoroClock: {
        time: [
            { "id": 1, "name": "pomodoro", "time": 1500, "curTime": 1500 },
            { "id": 2, "name": "shortBreak", "time": 300, "curTime": 300 },
            { "id": 3, "name": "longBreak", "time": 900, "curTime": 900 },
        ],
        isRunning: false,
        isBreak: false,
        continuous: true,
        maxCount: MAX_COUNT,
        count: 0,
        timeSoundURI: "",
        volume: 1,
        mode: POMODORO,
    },
};

const clockSlicer = createSlice({
    name: "clock",
    initialState: initState,
    reducers: {
        setTime: (state, action) => {
            state.pomodoroClock.time = action.payload;
        },
        setCurTime: (state, action) => {
            state.pomodoroClock.time = {
                ...state.pomodoroClock.time,
                [action.payload.mode]: action.payload.time,
            };
        },
        decrementCurTime: (state, action) => {
            // console.log("isRunning", state.pomodoroClock.isRunning);
            // if (state.pomodoroClock.isRunning === false) {
            //     return;
            // }
            // console.log("decrementCurTime", state.pomodoroClock.mode);
            // if (state.pomodoroClock.mode === POMODORO) {
            //     if (state.pomodoroClock.time.curPo <= 0) {
            //         state.pomodoroClock.time.curPo = 0;
            //         return;
            //     } else {
            //         state.pomodoroClock.time.curPo -= 1;
            //     }
            // } else if (state.pomodoroClock.mode === SHORT_BREAK) {
            //     if (state.pomodoroClock.time.curSB <= 0) {
            //         state.pomodoroClock.time.curSB = 0;
            //         return;
            //     } else {
            //         state.pomodoroClock.time.curSB -= 1;
            //     }
            // } else if (state.pomodoroClock.mode === LONG_BREAK) {
            //     if (state.pomodoroClock.time.curLB <= 0) {
            //         state.pomodoroClock.time.curLB = 0;
            //         return;
            //     } else {
            //         state.pomodoroClock.time.curLB -= 1;
            //     }
            // }\
            state.pomodoroClock.time.forEach((element) => {
                if (element.name === state.pomodoroClock.mode){
                    if (element.curTime <= 0) {
                        element.curTime = 0;
                        return;
                    } else {
                        element.curTime -= 1;
                    }
                }
            })
        },
        setRunning: (state, action) => {
            state.pomodoroClock.isRunning = action.payload;
        },
        toggleRunning: (state) => {
            state.pomodoroClock.isRunning = !state.pomodoroClock.isRunning;
        },
        setBreak: (state, action) => {
            state.pomodoroClock.isBreak = action.payload;
        },
        setCount: (state, action) => {
            state.pomodoroClock.count = action.payload;
        },
        setVolume: (state, action) => {
            state.pomodoroClock.volume = action.payload;
        },
        setTimeSoundURI: (state, action) => {
            state.pomodoroClock.timeSoundURI = action.payload;
        },
        changeMode: (state, action) => {
            if (action.payload.mode !== state.pomodoroClock.mode) {
                state.pomodoroClock.mode = action.payload.mode;
            }
        },
        setClockTime: (state, action) => {
            // if (state.pomodoroClock.mode === POMODORO) {
            //     state.pomodoroClock.time.pomodoro = action.payload;
            //     state.pomodoroClock.time.curPo = action.payload;
            // } else if (state.pomodoroClock.mode === SHORT_BREAK) {
            //     state.pomodoroClock.time.shortBreak = action.payload;
            //     state.pomodoroClock.time.curSB = action.payload;
            // } else if (state.pomodoroClock.mode === LONG_BREAK) {
            //     state.pomodoroClock.time.longBreak = action.payload;
            //     state.pomodoroClock.time.curLB = action.payload;
            // }
            state.pomodoroClock.time.forEach((element) => {
                if (element.name === action.payload.mode) {
                    element.time = action.payload.value;
                    element.curTime = action.payload.value;
                }
            });
            
        },
        resetCurClockTime: (state) => {
            state.pomodoroClock.time.forEach((element) => {
                if (element.name === state.pomodoroClock.mode) {
                    element.curTime = element.time;
                }
            });
        },
        setContinuous: (state, action) => {
            state.pomodoroClock.continuous = action.payload;
        }
    },
});

export const {
    setTime,
    changeMode,
    setClockTime,
    setCurTime,
    setRunning,
    toggleRunning,
    decrementCurTime,
    setBreak,
    setCount,
    setVolume,
    setTimeSoundURI,
    resetCurClockTime,
    setContinuous,
} = clockSlicer.actions;

export  {
    POMODORO,
    SHORT_BREAK,
    LONG_BREAK,
    MAX_COUNT,

}
export default clockSlicer.reducer;
