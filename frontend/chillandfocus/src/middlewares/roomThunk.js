import React, { useCallback, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
    setMyRoom,
    setCurrentRoom,
    addMessage,
    addrReceivedInvitations,
    setRoomSocket,
    clearRoom,
} from "../redux/slicers/chatSlicer";
import { CHAT_API_URL, WS_ROOT_URL } from "../constants/apis";
import { callAPIWithCredentials } from "../components/common/apis";
import { Socket } from "../utils/Socket";

export const joinRoom = (roomName, type = "join-room") => async (dispatch, getState) => {
    try {
        const token = localStorage.getItem("accessToken");

        // const socket = new WebSocket(`${WS_ROOT_URL}/chat/${roomName}/?token=${token}`);

        // socket.onopen = async function () {
        //     const chatUrl = `${CHAT_API_URL}/${type}`;
        //     const data = { room_name: roomName };

        //     const response = await callAPIWithCredentials(chatUrl, 'POST', data);
        //     if (response.status === 200) {
        //         dispatch(setCurrentRoom(roomName));
        //     } else {
        //         dispatch(setCurrentRoom(''));
        //     }
        // };

        // socket.onerror = function () {
        //     console.log(`Room ${roomName} does not exist or there was an error connecting.`);
        // };

        // socket.onmessage = async function (e) {
        //     const data = JSON.parse(e.data);
        //     const apiUrl = `${CHAT_API_URL}/send-message`;
        //     const messageData = { room_name: roomName, message: data.message };

        //     const response = await callAPIWithCredentials(apiUrl, 'POST', messageData);
        //     if (response.status === 200) {
        //         dispatch(addMessage({
        //             id: response.data.id,
        //             sender: response.data.sender.id,
        //             content: data.message,
        //         }));
        //     }
        // };

        // socket.onclose = function () {
        //     dispatch(clearRoom());
        // };
        // console.log("Joining room:", roomName);
        // dispatch(setRoomSocket(socket));
        const socket = new Socket();
        socket.connect(`${WS_ROOT_URL}/chat/${roomName}/?token=${token}`);
        socket.on("open", async () => {
            const chatUrl = `${CHAT_API_URL}/${type}`;
            const data = { room_name: roomName };

            const response = await callAPIWithCredentials(chatUrl, "POST", data);
            if (response.status === 200) {
                dispatch(setCurrentRoom(roomName));
            } else {
                dispatch(setCurrentRoom(""));
            }
        });
        
        
        socket.on("message", async (e) => {
            const data = JSON.parse(e.data);
            const apiUrl = `${CHAT_API_URL}/send-message`;
            const messageData = { room_name: roomName, message: data.message };

            const response = await callAPIWithCredentials(apiUrl, "POST", messageData);
            if (response.status === 200) {
                dispatch(
                    addMessage({
                        id: response.data.id,
                        sender: response.data.sender.id,
                        content: data.message,
                    })
                );
            }
        })
        
    } catch (error) {
        console.error("Error joining room:", error);
    }
};
