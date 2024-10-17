import React, { useRef, useEffect, useState } from "react";
import ReactPlayer from "react-player";

const FullScreenVideo = () => {
    const radio = 16 / 9;
    const playerWrapperRef = useRef(null);
    const [videoSize, setVideoSize] = useState({ width: 0, height: 0 });

    const handleResize = () => {
        if (playerWrapperRef.current) {
            const { clientWidth, clientHeight } = playerWrapperRef.current;
            setVideoSize((prev) => {
                // if (prev.width === clientWidth && prev.height === clientHeight) {
                //     return prev;
                // }

                // if (prev.height === clientHeight) {
                // }
                return {
                    width: clientWidth,
                    height: clientWidth / radio,
                };
            });
        }
    };

    useEffect(() => {
        // Run the resize function initially to set the correct size on mount
        handleResize();

        // window.addEventListener("resize", handleResize);
        // return () => window.removeEventListener("resize", handleResize);
    }, []);


    return (
        <div
            ref={playerWrapperRef}
            style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden" }}
        >
            <div>
                <ReactPlayer
                    url={"https://www.youtube.com/watch?v=JdqL89ZZwFw"}
                    playing={true}
                    loop={true} 
                    width="100vw"
                    height={videoSize.height}
                    muted={true}
                    volume={0.5}
                    style={{ position: "absolute", top: 0, left: 0, objectFit: "cover" }}
                />
            </div>
        </div>
        // <div
        //     style={{
        //         position: "fixed",
        //         top: 0,
        //         left: 0,
        //         width: "100vw",
        //         height: "100vh",
        //         overflow: "hidden",
        //         zIndex: -1, // Đảm bảo video nằm phía sau các nội dung khác
        //     }}
        // >
        //     <ReactPlayer
        //         url="https://www.youtube.com/watch?v=JdqL89ZZwFw"
        //         playing={true}
        //         loop={true}
        //         width="100%"
        //         height="100%"
        //         muted={true}
        //         volume={0.5}
        //         style={{ objectFit: "cover" }}
        //     />
        // </div>
    );
};

function extractIdFromUrl(url) {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get("v");
}
// const VideoPlayer = ({ muted }) => {
//     const onSuccessHandler = (success) => {
//         success.ref.player().controlBar.hide();
//     };
//     const videoSound = useSelector((state) => state.sound.videoSoundVolume);
//     console.log("videoSound", videoSound);

//     function GetCurUrlOfSpace() {
//         const spaces = useSelector((state) => state.space);
//         var url = "";
//         spaces.spaces.map((space) => {
//             if (space.id === spaces.currentSpace) {
//                 url = space.urls;
//             }
//         });
//         return url;
//     }
//     console.log("A", GetCurUrlOfSpace());
//     return (
//         <div className="video-container">
//             <ReactPlayer
//                 url={"https://www.youtube.com/watch?v=pw4SHoTVR2s"}
//                 playing={true}
//                 loop={true}
//                 // width="100%"
//                 // height="100vh"
//                 muted={true}
//                 volume={videoSound / 100}
//             />
//         </div>
//     );
// };
export { FullScreenVideo, extractIdFromUrl };

