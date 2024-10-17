import React, { useCallback, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faClipboard,
    faChevronDown,
    faMagnifyingGlass,
    faVolumeHigh,
    faClipboardCheck,
    faArrowRightFromBracket,
    faXmark,
    faShare,
    faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { generateAlphabetString } from "../../utils/stringUtils";
import {
    setMyRoom,
    setCurrentRoom,
    addMessage,
    addrReceivedInvitations,
    setRoomSocket,
    acceptInvitation,
} from "../../redux/slicers/chatSlicer";
import { CHAT_API_URL, WS_ROOT_URL } from "../../constants/apis";
import { callAPIWithCredentials } from "../common/apis";
import { copyToClipboard } from "../../utils/clipBoard";
import { joinRoom } from "../../middlewares/roomThunk";
import store from "../../redux/store";
// import { RoomComponent, InviteComponent } from "../chat";
const ChatComponent = () => {
    return (
        <>
            <div className="flex flex-col">
                <div className="flex justify-start">
                    <span>Chat</span>
                </div>
                <div className="flex flex-row">
                    <div className="flex flex-row"></div>
                    <div className="break-col-light"></div>
                    <div className=""></div>
                </div>
            </div>
        </>
    );
};

export default ChatComponent;

const RoomComponent = () => {
    const dispatch = useDispatch();
    // const [chatSocket, setChatSocket] = React.useState(null);
    const [chatRoom, setChatRoom] = React.useState(null);
    const [inputMessage, setInputMessage] = React.useState("");
    const myRoom = useSelector((state) => state.chat.myRoom);
    const currentRoom = useSelector((state) => state.chat.currentRoom);
    const user = useSelector((state) => state.user.user);
    const participants = useSelector((state) => state.chat.participants);

    const deleteRoom = useCallback(
        async (roomName, successCallback = () => {}, errorCallback = () => {}) => {
            try {
                const chatUrl = CHAT_API_URL + "/delete-room";
                const data = { room_name: roomName };

                console.log(`Đang gửi yêu cầu xoá phòng: ${roomName}`);

                const response = await callAPIWithCredentials(chatUrl, "POST", data);

                if (response.status === 200 && response.data.success) {
                    console.log(`Phòng ${roomName} đã được xoá thành công.`);
                    successCallback(); // Gọi callback thành công
                } else {
                    console.error(`Không thể xoá phòng ${roomName}: ${response.data.message}`);
                    errorCallback(`Error: ${response.data.message}`); // Gọi callback lỗi
                }
            } catch (error) {
                console.error(`Lỗi khi gửi API xoá phòng ${roomName}:`, error);
                errorCallback(error); // Gọi callback lỗi
            }
        },
        [] // dependencies, có thể thêm nếu cần
    );

    // async function handleJoinRoom(roomName, type = "join-room") {
    //     const token = localStorage.getItem("accessToken");
    //     const socket = new WebSocket(`${WS_ROOT_URL}/chat/${roomName}/?token=${token}`);
    //     socket.onopen = async function (e) {
    //         const chatUrl = CHAT_API_URL + "/" + type;
    //         const data = {
    //             room_name: roomName,
    //         };
    //         // const response = await axios.post(
    //         //     chatUrl,
    //         //     data, // Đưa trực tiếp dữ liệu vào đây
    //         //     {
    //         //         headers: {
    //         //             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    //         //             "Content-Type": "application/json",
    //         //         },
    //         //         withCredentials: true, // Nếu cần truyền cookies
    //         //     }
    //         // );
    //         const response = await callAPIWithCredentials(chatUrl, "POST", data);
    //         dispatch(setCurrentRoom(roomName));
    //         if (response.status === 200) {
    //         } else if (response.status === 400) {
    //             dispatch(setCurrentRoom(""));
    //         }
    //     };

    //     socket.onerror = function () {
    //         console.log(`Room ${roomName} does not exist or there was an error connecting.`);
    //     };
    //     socket.onmessage = async function (e) {
    //         const data = JSON.parse(e.data);
    //         const apiUrl = CHAT_API_URL + "/send-message";
    //         const messageData = {
    //             room_name: roomName,
    //             message: data.message,
    //         };

    //         const response = await callAPIWithCredentials(apiUrl, "POST", messageData);
    //         if (response.status === 200) {
    //             var resData = response.data;
    //             dispatch(
    //                 addMessage({
    //                     "id": resData.data.id,
    //                     "sender": resData.data.sender.id,
    //                     "content": data.message,
    //                 })
    //             );
    //         }
    //         // setMessages((prevMessages) => [...prevMessages, data.message]);
    //     };

    //     socket.onclose = async function (e) {
    //         // Kiểm tra xem kết nối có bị đóng do người dùng thoát không
    //         deleteRoom(roomName);
    //         // Reset lại trạng thái phòng
    //         dispatch(setMyRoom(""));
    //         dispatch(setCurrentRoom(""));
    //     };
    //     setChatRoom(socket);
    // }
    // const handleJoinRoom = useCallback(
    //     async (roomName, type = "join-room") => {
    //         console.log("Vào phòng: ", roomName);

    //         // if (roomName === "") {
    //         //     return;
    //         // }
    //         // else if (roomName === currentRoom) {
    //         //     return;
    //         // }

    //         const token = localStorage.getItem("accessToken");

    //         const socket = new WebSocket(`${WS_ROOT_URL}/chat/${roomName}/?token=${token}`);

    //         socket.onopen = async function (e) {
    //             const chatUrl = CHAT_API_URL + "/" + type;
    //             const data = { room_name: roomName };

    //             const response = await callAPIWithCredentials(chatUrl, "POST", data);
    //             dispatch(setCurrentRoom(roomName));

    //             if (response.status === 200) {
    //                 // Handle success case
    //             } else if (response.status === 400) {
    //                 dispatch(setCurrentRoom(""));
    //             }
    //         };

    //         socket.onerror = function () {
    //             console.log(`Room ${roomName} does not exist or there was an error connecting.`);
    //         };

    //         socket.onmessage = async function (e) {
    //             const data = JSON.parse(e.data);
    //             const apiUrl = CHAT_API_URL + "/send-message";
    //             const messageData = { room_name: roomName, message: data.message };

    //             const response = await callAPIWithCredentials(apiUrl, "POST", messageData);
    //             if (response.status === 200) {
    //                 var resData = response.data;
    //                 dispatch(
    //                     addMessage({
    //                         id: resData.data.id,
    //                         sender: resData.data.sender.id,
    //                         content: data.message,
    //                     })
    //                 );
    //             }
    //         };

    //         socket.onclose = async function (e) {
    //             deleteRoom(roomName);
    //             dispatch(setMyRoom(""));
    //             dispatch(setCurrentRoom(""));
    //         };

    //         setChatRoom(socket);
    //         dispatch(setRoomSocket(socket));
    //     },
    //     [dispatch, setChatRoom, deleteRoom]
    // );
    const handleJoinRoom = useCallback((roomName, type) => {
        // dispatch(joinRoom(roomName, type));
        store.dispatch(joinRoom(roomName, type));
    }, []);
    // const deleteRoom = async (roomName) => {
    //     try {
    //         const chatUrl = CHAT_API_URL + "/delete-room";
    //         const data = {
    //             room_name: roomName,
    //         };
    //         const response = await callAPIWithCredentials(chatUrl, "POST", data);
    //         if (response.status === 200) {
    //             console.log(`Đã xoá phòng ${roomName}`);
    //         }
    //     } catch (error) {
    //         console.error("Lỗi khi gửi API xoá phòng:", error);
    //     }
    // };
    // useEffect(() => {
    // CreateRoom();

    // if (chatSocket) {
    //     chatSocket.close();
    // }

    //     return () => {
    //         if (chatSocket) {
    //             chatSocket.close();
    //         }
    //     };
    // }, [chatSocket, myRoom]);

    function sendMessage() {
        // chatRoom.close();

        // if (chatRoom && inputMessage.trim() !== "") {
        //     chatRoom.send(
        //         JSON.stringify({
        //             message: inputMessage,
        //             sender: user,
        //         })
        //     );
        //     setInputMessage("");
        // }
        // if (inputMessage.trim() !== "") {
        //     store.dispatch(
        //         "WS_SEND_MESSAGE",
        //         JSON.stringify({
        //             message: inputMessage,
        //             sender: user,
        //         })
        //     );
        // }

        if (inputMessage.trim() !== "") {
            store.dispatch(addMessage({ message: inputMessage, sender: user }));
        }
    }

    const handleCreateRoom = useCallback(() => {
        if (myRoom === "") {
            const roomName = generateAlphabetString(4);
            dispatch(setMyRoom(roomName));
            dispatch(setCurrentRoom(roomName));
            handleJoinRoom(roomName, "create-room");
        }
    }, [myRoom, dispatch, handleJoinRoom]); // useCallback với các dependencies

    function handleCopyToClipBoard(text) {
        copyToClipboard(text);
        setCopySuccess(true);
        setTimeout(() => {
            setCopySuccess(false);
        }, 1500);
    }
    useEffect(() => {
        handleCreateRoom();
    }, [handleCreateRoom]);

    function handleOutRoom() {}
    const [copySuccess, setCopySuccess] = React.useState(false);
    return (
        <div className="absolute w-[250px] top-10 left-2 bg-color rounded-md px-2">
            <div className="flex flex-col justify-start">
                <div className="flex justify-start">
                    <span className="text-xl mb-1">Phòng của tôi</span>
                </div>
                <div className="break-line-light full-width"></div>
                <div className="flex flex-row justify-between items-center mr-10 my-2">
                    <span>Mã phòng: {myRoom}</span>
                    {/* <span>
                        Mã phòng: <input onChange={(e) => handleJoinRoom(e.target.value)}></input>
                    </span> */}
                    <span>
                        {copySuccess ? (
                            <FontAwesomeIcon icon={faClipboardCheck} />
                        ) : (
                            <div className="flex flex-row justify-between items-center w-8">
                                <FontAwesomeIcon
                                    icon={faClipboard}
                                    onClick={() => handleCopyToClipBoard(myRoom)}
                                    className="cursor-pointer"
                                />
                                <FontAwesomeIcon
                                    icon={faArrowRightFromBracket}
                                    onClick={() => handleOutRoom()}
                                />
                            </div>
                        )}
                    </span>
                </div>
                <div className="break-line-light full-width"></div>
                <div className="flex flex-col overflow-auto">
                    {participants.map((participant, index) => (
                        <>
                            <div key={index} className="flex flex-row justify-between items-center">
                                <div className="flex flex-row items-center justify-between">
                                    <div className="rounded-full w-6 h-6 pr-1">
                                        <img src="" alt="" />
                                    </div>
                                    <span className="pr-3">{participant.username}</span>
                                    <FontAwesomeIcon
                                        icon={faVolumeHigh}
                                        className="cursor-pointer"
                                    />
                                </div>
                                <div>
                                    {true ? (
                                        <FontAwesomeIcon
                                            icon={faXmark}
                                            className="cursor-pointer"
                                        />
                                    ) : (
                                        <div className="flex flex-row justify-between items-center">
                                            <span>Kick?</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    ))}
                </div>
                <div className="flex flex-col">
                    {/* <div className="flex flex-row justify-between">
                        <span className="">Người tham gia ()</span>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </div>
                    <div className="flex justify-start items-center my-2 ">
                        <input
                            placeholder="Tìm"
                            className="mr-2 pl-1 rounded-md text-black"
                        ></input>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="cursor-pointer" />
                    </div> */}
                    {/* <div> */}
                    {/* participant */}
                    {/* <div key={1} className="flex flex-row justify-between items-center">
                            <div className="flex flex-row items-center justify-between">
                                <div className="rounded-full w-6 h-6 pr-1">
                                    <img src="" alt="" />
                                </div>
                                <span className="pr-3">Nguyễn Văn A</span>
                                <FontAwesomeIcon icon={faVolumeHigh} className="cursor-pointer" />
                            </div>
                            <div>
                                {true ? (
                                    <FontAwesomeIcon icon={faXmark} className="cursor-pointer" />
                                ) : (
                                    <div className="flex flex-row justify-between items-center">
                                        <span>Kich?</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div> */}

                    <div>
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Type a message..."
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InviteComponent = () => {
    const [inviteMode, setInviteMode] = React.useState(0);
    const [inviteSocket, setInviteSocket] = React.useState(null);
    const myRoom = useSelector((state) => state.chat.myRoom);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const [receiver, setReceiver] = React.useState([]);

    useEffect(() => {
        initSocket();
    }, []);

    function initSocket() {
        const token = localStorage.getItem("accessToken");

        store.dispatch({type: "chat/initInviteSocket", payload: {url: `${WS_ROOT_URL}/invite/${user.id}/?token=${token}`}});
        
        // const socket = new WebSocket(`${WS_ROOT_URL}/invite/${user.id}/?token=${token}`);
        // socket.onopen = async function (e) {
        //     console.log("Invite socket connected");
        // };

        // socket.onmessage = async function (e) {
        //     const data = JSON.parse(e.data);
        //     dispatch(addrReceivedInvitations({ roomName: data.room_name, sender: data.sender }));
        // };

        // socket.onclose = async function (e) {};

        // socket.onerror = function () {};

        // setInviteSocket(socket);
    }

    function handleSendInvite(receiver) {
        // if (inviteSocket) {
        //     inviteSocket.send(
        //         JSON.stringify({
        //             type: "invite",
        //             room_name: myRoom,
        //             sender: user,
        //             receiver: receiver,
        //         })
        //     );
        // }
        // store.dispatch({type: "chat/inviteUser", payload: JSON.stringify({roomName: myRoom, sender: user, receiver: receiver})});
        store.dispatch(JSON.stringify({type: "chat/inviteUser", payload: {roomName: myRoom}}));
        
    }

    function handleAcceptInvitation(sender, roomName) {
        // if (inviteSocket) {
        //     inviteSocket.send(
        //         JSON.stringify({
        //             type: "accept",
        //             room_name: roomName,
        //         })
        //     );
        // }
        store.dispatch(acceptInvitation({sender: sender, roomName: roomName}));
        
        dispatch(setCurrentRoom(roomName));
    }

    function handleDenyInvitation() {}
    const receivedInvitations = useSelector((state) => state.chat.receivedInvitations);
    return (
        <div className="absolute w-[250px] top-10 left-2 bg-color rounded-md px-2">
            <div className="flex flex-row justify-between items-center">
                <div>
                    <span className="text-lg mt-1 ml-2" onClick={() => setInviteMode(0)}>
                        Mời
                    </span>
                    <span className="text-lg mt-1 ml-2" onClick={() => setInviteMode(1)}>
                        Lời mời
                    </span>
                </div>
                <FontAwesomeIcon icon={faChevronDown} />
            </div>
            {inviteMode === 0 ? (
                <>
                    <div className="flex justify-start items-center my-2 ">
                        <input
                            placeholder="Tìm"
                            className="mr-2 pl-1 rounded-md text-black"
                            onChange={(e) => setReceiver(e.target.value)}
                            value={receiver}
                        ></input>
                        <FontAwesomeIcon
                            icon={faShare}
                            className="cursor-pointer"
                            onClick={() => handleSendInvite(receiver)}
                        />
                    </div>
                    <div>
                        {receivedInvitations.map((invitation, index) => (
                            <div key={index} className="flex flex-row justify-between items-center">
                                <div className="flex flex-row items-center justify-between">
                                    <div className="rounded-full w-6 h-6 pr-1">
                                        <img src="" alt="" />
                                    </div>
                                    <span className="pr-3">{invitation.sender.username}</span>
                                    <FontAwesomeIcon
                                        icon={faVolumeHigh}
                                        className="cursor-pointer"
                                    />
                                </div>
                                <div>
                                    {true ? (
                                        <div className="flex flex-row justify-between items-center">
                                            <span className="pr-2">
                                                <FontAwesomeIcon
                                                    icon={faCheck}
                                                    onClick={handleAcceptInvitation(
                                                        invitation.sender,
                                                        invitation.roomName
                                                    )}
                                                />
                                            </span>
                                            <span>
                                                <FontAwesomeIcon
                                                    icon={faXmark}
                                                    onClick={handleDenyInvitation(
                                                        invitation.roomName
                                                    )}
                                                />
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="flex flex-row justify-between items-center">
                                            <span>Loại?</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* // <div key={1} className="flex flex-row justify-between items-center">
                        //     <div className="flex flex-row items-center justify-between">
                        //         <div className="rounded-full w-6 h-6 pr-1">
                        //             <img src="" alt="" />
                        //         </div>
                        //         <span className="pr-3">Nguyễn Văn A</span>
                        //         <FontAwesomeIcon icon={faVolumeHigh} className="cursor-pointer" />
                        //     </div>
                        //     <div>
                        //         {true ? (
                        //             <FontAwesomeIcon icon={faXmark} className="cursor-pointer" />
                        //         ) : (
                        //             <div className="flex flex-row justify-between items-center">
                        //                 <span>Loại?</span>
                        //             </div>
                        //         )}
                        //     </div>
                        // </div> */}
                </>
            ) : (
                <>
                    <div>
                        <span onClick={handleSendInvite}>a</span>
                    </div>
                </>
            )}
        </div>
    );
};

export { RoomComponent, InviteComponent };
