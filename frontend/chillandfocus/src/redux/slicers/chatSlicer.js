import { createSlice, current } from "@reduxjs/toolkit";

const initState = {
    myRoom: "",
    currentRoom: "",
    messages: [],
    participants: [],
    receivedInvitations : [
        // {
        //     sender: {},
        //     roomName : "",
        // }
    ],
    roomSocket: null,
};

const chatSlicer = createSlice({
    name: "chat",
    initialState: initState,
    reducers: {
        setMyRoom: (state, action) => {
            state.myRoom = action.payload;
        },
        setCurrentRoom: (state, action) => {
            state.currentRoom = action.payload;
        },
        addMessage: (state, action) => {
            console.log("payload", action.payload);
            state.messages.push(action.payload);
        },
        clearMessages: (state) => {
            state.messages = [];
        },
        setParticipants: (state, action) => {
            state.participants = action.payload;
        },
        addParticipants: (state, action) => {
            state.participants.push(action.payload);
        },
        setReceivedInvitations: (state, action) => {
            state.receivedInvitations = action.payload;
        },
        addrReceivedInvitations: (state, action) => {
            state.receivedInvitations.push(action.payload);
        },
        setRoomSocket: (state, action) => {
            state.roomSocket = action.payload;
        },
        clearRoom: (state) => {
            state.currentRoom = '';
            state.socket?.close(); // Close socket on room clear
            state.socket = null;
        },
        acceptInvitation: (state, action) => {
            state.receivedInvitations = state.receivedInvitations.filter(invitation => invitation.roomName !== action.payload.roomName);
            state.currentRoom = action.payload.roomName;
        }
    },
});

export const {
    setMyRoom,
    setCurrentRoom,
    addMessage,
    clearMessages,
    setParticipants,
    addParticipants,
    setReceivedInvitations,
    addrReceivedInvitations,
    setRoomSocket,
    clearRoom,
    acceptInvitation,
} = chatSlicer.actions;

export default chatSlicer.reducer;
