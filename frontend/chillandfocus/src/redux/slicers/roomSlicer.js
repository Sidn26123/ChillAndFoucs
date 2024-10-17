import { createSlice } from "@reduxjs/toolkit";

const initState = {
    roomName: "",
    socket: null,
    messages: [],
}


const roomSlicer = createSlice({
    name: "room",
    initialState: initState,
    reducers: {
        setRoomName: (state, action) => {
            state.roomName = action.payload;
        },
    }
});


export const { setRoomName } = roomSlicer.actions;

export default roomSlicer.reducer;