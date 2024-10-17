import { configureStore } from "@reduxjs/toolkit";
import spaceReducer from "../slicers/spaceSlicer";
import soundReducer from "../slicers/soundSlicer";
import spaceCategoryReducer from "../slicers/spaceCategorySlicer";
import uiControllerReducer from "../slicers/uiSlicer";
import clockReducer from "../slicers/clockSlicer";
import roomReducer from "../slicers/roomSlicer";
import userReducer from "../slicers/userSlicer";
import chatReducer from "../slicers/chatSlicer";
import { websocketMiddleware } from "../../middlewares/socketMiddleware";


const store = configureStore({
    reducer: {
        space: spaceReducer, // Thêm reducer vào store
        sound: soundReducer,
        spaceCategory: spaceCategoryReducer,
        ui: uiControllerReducer,
        clock: clockReducer,
        room: roomReducer,
        user: userReducer,
        chat: chatReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(websocketMiddleware),
});

export default store;
