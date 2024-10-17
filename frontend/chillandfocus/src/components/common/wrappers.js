import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
const CenterWrapper = ({ children }) => {
    return (
        <div className="w-full h-screen z-10 fixed top-0 left-0 flex items-center justify-center">
            {children}
        </div>
    );
};

const CloseWhenClickOutsideWrapper = ({ children, showState = false, setShowState = {} }) => {
    const ref = React.useRef();
    const [isShow, setIsShow] = React.useState(showState);
    React.useEffect(() => {
        function handleClickOutside(event) {
            event.stopPropagation();
            if (ref.current && !ref.current.contains(event.target)) {
                setIsShow(false);
                if (typeof setShowState === "function") {
                    setShowState(false);
                }
            }
        }
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
    return (
        <>
            {isShow && (
                <div ref={ref} className="w-[100px] h-[100px] bg-color">
                    {children}
                </div>
            )}
        </>
    );
};

const DraggableDiv = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - offset.x,
                y: e.clientY - offset.y,
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div
            className="w-32 h-32 bg-blue-500 text-white flex items-center justify-center cursor-move absolute"
            style={{ left: `${position.x}px`, top: `${position.y}px` }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            Kéo tôi
        </div>
    );
};

export default DraggableDiv;

const NeedLoginWrapper = ({ children }) => {
    const isAuth = useSelector((state) => state.user.isAuthenticated);
    const [isShow, setIsShow] = useState(true);
    return (
        <>
            {isAuth ? (
                <>{children}</>
            ) : isShow ? (
                <div className="w-full h-screen z-10 fixed top-0 left-0 flex items-center justify-center">
                    <div className="bg-color p-4 rounded-lg">
                        <p className="text-center">Bạn cần đăng nhập để sử dụng tính năng này</p>
                        <FontAwesomeIcon icon={faXmark} onClick = {() => setIsShow(false)}/>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export { CenterWrapper, CloseWhenClickOutsideWrapper, NeedLoginWrapper };
