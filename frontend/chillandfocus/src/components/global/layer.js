import React from "react";
import Spaces from "../spaces/index";
import { SpaceController } from "../spaces/controllers";
// import AudioPlayer from "./components/musics/controllers";
import Sidebar from "../global/sidebar";
import Navbar from "../global/navbar";
import Footbar from "../global/footbar";
import { CloseWhenClickOutsideWrapper } from "../common/wrappers";
import { useDispatch, useSelector } from "react-redux";
import { setSpaceControllerPanelShow } from "../../redux/slicers/uiSlicer";
import AudioController from "../musics/controllers";
import PomodoroClock from "../common/clock";
import ChatRoom from "../chat/chatRoom";
const Layer = () => {
    const isSpaceControllerPanelShow = useSelector((state) => state.ui.isSpaceControllerPanelShow);
    const isSoundControllerPanelShow = useSelector((state) => state.ui.isSoundControllerPanelShow);
    const isPomodoroClockShow = useSelector((state) => state.ui.isPomodoroClockShow);
    const dispatch = useDispatch();
    // function setSpaceControllerPanelShow(value) {
    //     dispatch(setSpaceControllerPanelShow(value));
    // }

    return (
        <>
            <div className="flex content z-10 justify-start">
                <div className="absolute top-16 left-[75px]">
                    {isSpaceControllerPanelShow && <SpaceController />}
                    {/* <SpaceController /> */}

                    {/* <AudioController /> */}
                    {isSoundControllerPanelShow && <AudioController />}
                </div>
                <div className="w-full">
                    <Navbar />
                    <Sidebar />
                </div>
                <div className="absolute top-12 left-20">
                    {isPomodoroClockShow && <PomodoroClock />}
                    {/* <ChatRoom  roomName={"abcd"}/> */}
                </div>
                <div className="absolute bottom-1 right-0">
                    <Footbar />
                </div>
                {/* <SpaceController /> */}
                {/* <AudioPlayer /> */}
            </div>

            <div className="video-overlay video-container">
                <Spaces />
                {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/3TsMc8vkyew?autoplay=1&mute=0&controls=0&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>            </div> */}
            </div>
        </>
    );
};

export default Layer;
