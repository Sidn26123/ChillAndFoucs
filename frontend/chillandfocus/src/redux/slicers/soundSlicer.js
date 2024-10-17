import { createSlice } from "@reduxjs/toolkit";

const initState = {
    sounds: [
        // {
        //     id: 1,
        //     name: "Sound 1",
        //     thumbnail: "videos\\sounds\\Snaptik.app_7278893611893148930.mp4",
        //     urls: "videos\\sounds\\Snaptik.app_7278893611893148930.mp4",
        //     volume: 0, // 0 -> 1, step 0.01
        //     isMute: false,
        // },
    ],

    videoSoundVolume: 0, // 0 -> 1, step 0.01
    mainVolume: 0, // 0 -> 1, step 0.01
    isMute: false,
};

const soundSlicer = createSlice({
    name: "sound",
    initialState: initState,
    reducers: {
        setSound: (state, action) => {
            state.sounds = action.payload;
        },
        setVideoSoundVolume: (state, action) => {
            console.log("action", action);
            state.videoSoundVolume = action.payload;
        },
        setMute: (state, action) => {
            state.isMute = action.payload;
        },
        setUnmute: (state, action) => {
            state.isMute = action.payload;
        },
        toggleMute: (state, action) => {
            state.isMute = !state.isMute;
        },
        setMainVolume: (state, action) => {
            state.mainVolume = action.payload;
        },
        setSoundVolume: (state, action) => {
            state.sounds = state.sounds.map((sound) => {
                if (sound.id === action.payload.id) {
                    return {
                        ...sound,
                        volume: action.payload.value,
                    };
                }
                return sound;
            });
        },
        setSoundMute: (state, action) => {
            state.sounds = state.sounds.map((sound) => {
                if (sound.id === action.payload.id) {
                    return {
                        ...sound,
                        isMute: action.payload.value,
                    };
                }
                return sound;
            });
        },
    },
});

export const {
    setSound,
    setVideoSoundVolume,
    setMute,
    setUnmute,
    toggleMute,
    setMainVolume,
    setSoundVolume,
    setSoundMute,
} = soundSlicer.actions;

export default soundSlicer.reducer;
