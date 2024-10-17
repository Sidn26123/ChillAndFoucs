import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import utils from "../../styles/utils/utils.css";
import Snaptik from "../../assets/spaces/Snaptik.app_7278893611893148930.mp4";
import Tiktokmate from "../../assets/spaces/Tikmate.online_7137250988204903706.mp4";
import ReactPlayer from "react-player";
import AudioPlayer from "../musics/controllers";
import axios from "axios";
import { setSpace, initSpace } from "../../redux/slicers/spaceSlicer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
// import { FullScreenVideo } from "../common/video";

const Spaces = () => {
    const curSpaceCategory = useSelector((state) => state.spaceCategory.currentSpaceCategory);
    const dispatch = useDispatch();
    useEffect(() => {
        document.body.classList.add("overflow-hidden"); // Loại bỏ cuộn trang
        FetchSpaces();
        
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, []);

    async function FetchSpaces() {
        const url = "http://127.0.0.1:8000/api/space/spaces/" + curSpaceCategory;
        try{
            const res = await axios.get(url);
            var spaces = [];
            res.data.spaces.forEach((element) => {
                var temp = {};
                temp.id = element.id;
                temp.name = element.name;
                temp.url = element.url;
                spaces.push(temp);
            })


            dispatch(initSpace(spaces));
            return res.data;
        }    
        catch (error) {
        }

    }


    const [isPlaying, setIsPlaying] = React.useState(true);
    return (
        <div className="fixed inset-0 w-full 100vh bg-slate-900">
            {/* <video controls>
                <source src="your-video-file.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video> */}
            {/* <VideoPlayer muted={isPlaying}/> */}
            {/* <div style={{ position: 'relative', paddingBottom: '56.25%', height: '0', overflow: 'hidden' }}>
            <iframe
                    // style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
                    src="https://www.youtube.com/watch?v=fLK6xd0xp8w&t=196s"
                    frameborder="0"
                    allow="autoplay; encrypted-media"
                    allowfullscreen
                    title="YouTube video player for relaxing"
                ></iframe>
            </div> */}

            <FullScreenVideo />
        </div>
    );
};


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

    function GetCurSpaceUrl() {
        var spaces = useSelector((state) => state.space.spaces);
        const curSpace = useSelector((state) => state.space.spaces.find((space) => space.id === state.space.currentSpace));
        if (curSpace === undefined) {
            return "https://www.youtube.com/watch?v=JdqL89ZZwFw";
        }

        return curSpace.url;
    }
    const volume = useSelector((state) => state.sound.videoSoundVolume);
    const isMute = useSelector((state) => state.sound.isMute);

    return (
        <div
            ref={playerWrapperRef}
            style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden" }}
        >
            <div>
                <ReactPlayer
                    // url={"https://www.youtube.com/watch?v=JdqL89ZZwFw"}
                    url={`${GetCurSpaceUrl()}?rel=0&controls=0&modestbranding=1&showinfo=0`}
                    playing={true}
                    loop={true} 
                    width="100vw"
                    height={videoSize.height}
                    muted={isMute}
                    volume={volume}
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

export default Spaces;
