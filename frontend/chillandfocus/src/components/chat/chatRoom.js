import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faXmark } from "@fortawesome/free-solid-svg-icons";
const ChatRoom = () => {
    const messages = useSelector((state) => state.chat.messages);
    const participants = useSelector((state) => state.chat.participants);
    const user = useSelector((state) => state.user.user);
    function findUserById(id) {
        return participants.find((participant) => participant.id === id);
    }
    return (
        <div>
            <div className="flex flex-col absolute w-[250px] bg-color text-gray-300 m-2 rounded-lg h-[280px] overflow-auto">
                <div className="flex flex-row justify-between items-center p-2">
                    <span>Chat</span>
                    <FontAwesomeIcon icon={faXmark} />
                </div>
                <div className="break-line-light full-width"></div>
                <div className="overflow-auto">
                    <div className="flex flex-col my-2 ">
                        {messages.map((message, index) => {
                            if (message.sender === user.id) {
                                return <MySideChat key={index} message={message} />;
                            }
                            const participant = findUserById(message.sender);
                            return (
                                <OtherSideChat key={index} message={message} user={participant} />
                            );
                        })}
                    </div>
                </div>
                <div className = "flex flex-row justify-between items-end">
                    <input type="text" placeholder="Type a message" className="w-full p-2 bg-gray-300 text-black rounded-lg" />
                    <FontAwesomeIcon icon={faPaperPlane} />
                </div>
            </div>
        </div>
    );
};

export default ChatRoom;
const MySideChat = ({ message }) => {
    console.log("mesg", message);
    return (
        <div className="flex flex-row justify-end">
            <div className="bg-gray-300 text-black p-2 m-1 rounded-lg">{message.content}</div>
        </div>
    );
};

const OtherSideChat = ({ message, user }) => {
    return (
        <div className="flex flex-row justify-start">
            <div className="rounded-[50%]">
                {/* <img src={user.avatar} alt="" className="w-50 h-50"></img> */}
            </div>
            <div className="bg-gray-300 text-black p-2 m-1 rounded-lg">{message.content}</div>
        </div>
    );
};
