import { createSlice } from "@reduxjs/toolkit";

const initState = {
    isSpaceControllerPanelShow: false,
    isSoundControllerPanelShow: false,
    isPomodoroClockShow: false,
    loginPanelShow: false,
    registerPanelShow: false,
    logoutPanelShow: false,
    userMenuDropDownShow: false,
};

const uiSlicer = createSlice({
    name: "ui",
    initialState: initState,
    reducers: {
        setSpaceControllerPanelShow: (state, action) => {
            state.isSpaceControllerPanelShow = action.payload;
        },
        setSoundControllerPanelShow: (state, action) => {
            state.isSoundControllerPanelShow = action.payload;
        },
        setPomodoroClockShow: (state, action) => {
            state.isPomodoroClockShow = action.payload;
        },
        setLoginPanelShow: (state, action) => {
            state.loginPanelShow = action.payload;
        },
        setRegisterPanelShow: (state, action) => {
            state.registerPanelShow = action.payload;
        },
        setUserMenuDropDownShow: (state, action) => {
            state.userMenuDropDownShow = action.payload;
        },
        setLogoutPanelShow: (state, action) => {
            state.logoutPanelShow = action.payload;
        }
    },
});

export const {
    setSpaceControllerPanelShow,
    setSoundControllerPanelShow,
    setPomodoroClockShow,
    setLoginPanelShow,
    setRegisterPanelShow,
    setUserMenuDropDownShow,
    setLogoutPanelShow,
} = uiSlicer.actions;

export default uiSlicer.reducer;
