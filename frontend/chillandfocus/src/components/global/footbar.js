import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-regular-svg-icons";
import ChatRoom from "../chat/chatRoom";

const Footbar = () => {
    const [chatRoomShow, setChatRoomShow] = useState(false);

    
    return (
        <>
            <div className="flex justify-between w-1/12">
                <div></div>
                <div className="bg-color w-[50px] rounded-xl p-2 mr-2">
                    <FontAwesomeIcon icon={faCommentDots} size = "2x" className = "text-gray-300" onClick = {() => setChatRoomShow(!chatRoomShow)}/>
                </div>
                
                {chatRoomShow && (
                    <div className = "relative  -left-[280px] -top-[300px]">
                        <ChatRoom />
                    </div>
                )}
            </div>
        </>
    );
};

export default Footbar;
