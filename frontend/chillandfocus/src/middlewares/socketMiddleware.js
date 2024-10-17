// websocketMiddleware.js
import { Socket } from "../utils/Socket";

const socketInstance = new Socket(); // Khởi tạo socket instance
const inviteSocketInstance = new Socket(); // Khởi tạo socket instance
export const websocketMiddleware = (store) => (next) => (action) => {
    console.log("Middleware action", action);
    switch (action.type) {
        case "WS_CONNECT":
            socketInstance.connect(action.payload.url);

            // Lắng nghe sự kiện "open", "message", "close" từ WebSocket
            socketInstance.on("open", () => {
                store.dispatch({ type: "WS_CONNECTED" });
            });

            socketInstance.on("message", (event) => {
                const message = JSON.parse(event.data);
                store.dispatch({ type: "WS_MESSAGE_RECEIVED", payload: message });
            });

            socketInstance.on("close", () => {
                store.dispatch({ type: "WS_DISCONNECTED" });
            });
            break;

        case "chat/addMessage":
            socketInstance.send(action.payload);
            break;

        case "WS_DISCONNECT":
            socketInstance.disconnect();
            store.dispatch({ type: "WS_DISCONNECTED" });
            break;
        case "chat/initInviteSocket":
            inviteSocketInstance.connect(action.payload.url);
            inviteSocketInstance.on("open", () => {
                store.dispatch({ type: "INVITE_S_CONNECTED" });
            });

            inviteSocketInstance.on("message", (event) => {
                const message = JSON.parse(event.data);
                store.dispatch({ type: "INV_SOC_MESSAGE_RECEIVED", payload: message });
            });

            inviteSocketInstance.on("close", () => {
                store.dispatch({ type: "INVITE_S_DISCONNECTED" });
            });
            break;
        case "chat/inviteUser":
            inviteSocketInstance.send(action.payload);
            break;
        default:
            break;
    }

    return next(action);
};
