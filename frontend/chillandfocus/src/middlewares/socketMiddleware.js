// // websocketMiddleware.js
// import { addReceivedInvitations } from "../redux/slicers/chatSlicer";
// import { Socket } from "../utils/Socket";

// const socketInstance = new Socket(); // Khởi tạo socket instance
// const inviteSocketInstance = new Socket(); // Khởi tạo socket instance
// export const websocketMiddleware = (store) => (next) => (action) => {
//     console.log("Middleware action", action);
//     switch (action.type) {
//         case "WS_CONNECT":
//             socketInstance.connect(action.payload.url);

//             // Lắng nghe sự kiện "open", "message", "close" từ WebSocket
//             socketInstance.on("open", () => {
//                 store.dispatch({ type: "WS_CONNECTED" });
//             });

//             socketInstance.on("message", (event) => {
//                 const message = JSON.parse(event.data);
//                 console.log("Message received", message);
//                 store.dispatch({ type: "WS_MESSAGE_RECEIVED", payload: message });
//             });

//             socketInstance.on("close", () => {
//                 store.dispatch({ type: "WS_DISCONNECTED" });
//             });
//             break;

//         case "chat/sendMessage":
//             socketInstance.send(action.payload);
//             console.log("A");
//             break;

//         case "WS_DISCONNECT":
//             socketInstance.disconnect();
//             store.dispatch({ type: "WS_DISCONNECTED" });
//             break;
//         case "chat/initInviteSocket":
//             inviteSocketInstance.connect(action.payload.url);
//             inviteSocketInstance.on("open", () => {
//                 store.dispatch({ type: "INVITE_S_CONNECTED" });
//             });

//             inviteSocketInstance.on("message", (event) => {
//                 const message = JSON.parse(event.data);
//                 message.roomName = message.room_name;



//                 store.dispatch(addReceivedInvitations(message));
//                 // store.dispatch({ type: "accept", payload: message });
//             });
//             inviteSocketInstance.on("close", () => {
//                 store.dispatch({ type: "INVITE_S_DISCONNECTED" });
//             });
//             break;
//         case "chat/inviteUser":
//             inviteSocketInstance.send(action.payload);
//             break;

//         case "INV_SOC_MESSAGE_RECEIVED":
//             inviteSocketInstance.send({ type: "invite", roomName: action.payload.roomName });
//             break;
//         default:
//             break;
//     }

//     return next(action);
// };
// websocketMiddleware.js
import { addReceivedInvitations } from "../redux/slicers/chatSlicer";
import { Socket } from "../utils/Socket";
const INIT_ROOM_SOCKET = "chat/initRoomSocket";
const SEND_MESSAGE = "chat/sendMessage";
const ROOM_DISCONNECTED = "chat/roomDisconnected";
const ROOM_CONNECTED = "chat/roomConnected";
const INIT_INVITE_SOCKET = "chat/initInviteSocket";
const INVITE_USER = "chat/inviteUser";
const INVITE_RECEIVED = "chat/inviteReceived";
const INVITE_DISCONNECTED = "chat/inviteDisconnected";

const socketMap = {
    room: new Socket(),
    invite: new Socket(),
};

const connectSocket = (socket, url, onOpen, onMessage, onClose) => {
    socket.connect(url);
    socket.on("open", onOpen);
    socket.on("message", onMessage);
    socket.on("close", onClose);
};

export const websocketMiddleware = (store) => (next) => (action) => {
    const { main, invite } = socketMap;

    switch (action.type) {
        case INIT_ROOM_SOCKET:
            connectSocket(
                main,
                action.payload.url,
                () => store.dispatch({ type: ROOM_CONNECTED }),
                (event) => {
                    const message = JSON.parse(event.data);
                    store.dispatch({ type: INVITE_RECEIVED, payload: message });
                },
                () => store.dispatch({ type: ROOM_DISCONNECTED })
            );
            break;

        case SEND_MESSAGE:
            if (main.isConnected()) {  // Kiểm tra kết nối trước khi gửi
                main.send(action.payload);
            } else {
                console.error("WebSocket chưa kết nối.");
            }
            break;

        case ROOM_DISCONNECTED:
            main.disconnect();
            // store.dispatch({ type: "WS_DISCONNECTED" });
            break;

        case INIT_INVITE_SOCKET:
            connectSocket(
                invite,
                action.payload.url,
                () => store.dispatch({ type: INVITE_RECEIVED }),
                (event) => {
                    const message = JSON.parse(event.data);
                    message.roomName = message.room_name;
                    store.dispatch(addReceivedInvitations(message));
                },
                () => store.dispatch({ type: INVITE_DISCONNECTED })
            );
            break;

        case INVITE_USER:
            if (invite.isConnected()) {
                invite.send(action.payload);
            } else {
                console.error("Invite WebSocket chưa kết nối.");
            }
            break;

        case INVITE_RECEIVED:
            if (invite.isConnected()) {
                invite.send({ type: "invite", roomName: action.payload.roomName });
            } else {
                console.error("Invite WebSocket chưa kết nối.");
            }
            break;

        default:
            break;
    }

    return next(action);
};
