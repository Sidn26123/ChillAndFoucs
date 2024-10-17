import React, { useEffect } from "react";
import { setSpace, setCurSpace } from "../../redux/slicers/spaceSlicer";
import { useDispatch, useSelector } from "react-redux";
import { setVideoSoundVolume, toggleMute } from "../../redux/slicers/soundSlicer";
import { CloseWhenClickOutsideWrapper } from "../common/wrappers";
import { extractIdFromUrl } from "../common/video";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faVolumeXmark, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {
    setCurSpaceCategory,
    setFilteredSpaceCategories,
    setSpaceCategories,
} from "../../redux/slicers/spaceCategorySlicer";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { setSpaceControllerPanelShow } from "../../redux/slicers/uiSlicer";

const spaceCategoryUrl = "http://127.0.0.1:8000/api/space/get-space-category";
const SpaceController = () => {
    const dispatch = useDispatch();
    const sound = useSelector((state) => state.sound);
    const volume = useSelector((state) => state.sound.videoSoundVolume);
    const isMuted = useSelector((state) => state.sound.isMuted);
    const isControllerPanelShow = useSelector((state) => state.ui.isSpaceControllerPanelShow);
    const spaceCategories = useSelector((state) => state.spaceCategory.spaceCategories);
    const spaces = useSelector((state) => state.space.spaces);
    const filteredSpacesId = useSelector((state) => state.space.filteredSpaces);
    const filteredSpaces = spaces.filter((space) => filteredSpacesId.includes(space.id));
    const spaceControllerRef = React.useRef(null);
    
    useEffect(() => {
        getSpaces();
    }, []);
    function onChangeSpace(id) {
        dispatch(setCurSpace(id));
    }
    React.useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    function handleClickOutside(event) {
        event.stopPropagation();
        if (spaceControllerRef.current && !spaceControllerRef.current.contains(event.target) && event.target.id !== "spaceController") {
            event.preventDefault();
            dispatch(setSpaceControllerPanelShow(false));
        }
    }
    
    // function handleChangeSoundVolume(value) {
    //     setVolume(value);
    //     dispatch(setVideoSoundVolume(value));
    //     console.log("volume", sound);
    // }

    async function getSpaces() {
        try {
            const res = await axios.get(spaceCategoryUrl);
            const category = [];

            res.data.categories.forEach((element) => {
                const temp = {
                    id: element.id,
                    name: element.name,
                };

                // Tìm thumbnail tương ứng với category hiện tại
                const thumbnail = res.data.thumbnail.find((x) => x.id === element.id);

                // Kiểm tra nếu thumbnail tồn tại
                // if (thumbnail && thumbnail.content) {
                //     // Tạo URL từ blob nếu content là blob
                //     const imgUrl = URL.createObjectURL(thumbnail.content);
                //     console.log('Image URL:', imgUrl);
                //     temp.thumbnail = imgUrl; // Gán URL của ảnh vào thuộc tính thumbnail
                // }
                temp.thumbnail = "http://127.0.0.1:8000" + thumbnail.content;
                category.push(temp);
            });
            dispatch(setSpaceCategories(category));
        } catch (error) {
            console.log(error);
        }
    }

    function GetFilteredItemDetail(id) {
        return spaces.find((element) => element.id === id) || {};
    }
    // getSpaces();
    const chatSocket = new WebSocket(
        'ws://'
        + window.location.host
        + '/ws/chat/'
        + 'test'
        + '/'
    );

    chatSocket.onmessage = function(e) {

        const data = JSON.parse(e.data);
        console.log(data);
    }

    chatSocket.onclose = function(e) {
        console.error('Chat socket closed unexpectedly');
    }

    chatSocket.onopen = function(e) {

        chatSocket.send(JSON.stringify({
            'message': 'Hello'
        }));
    }
    function testChat() {



    }
    return (
        <>
            {isControllerPanelShow && (
                <div >

                    {/* <CloseWhenClickOutsideWrapper showState = {show}> */}
                    <div className="w-[350px] min-h-[100px] bg-color rounded-xl text-gray-300 ">
                        {/* Title */}

                        <div className="flex flex-row justify-start font-medium-light pt-1 overflow-visible">
                            <div className="ml-2 underline-div">Không gian</div>
                            <div className="mx-3">Yêu thích</div>
                            <div className="" onClick = {() => testChat()}>Mẫu</div>
                        </div>
                        {/* Search */}

                        <div className="flex justify-start ml-2 my-[6px]">
                            <div className="flex justify-start items-center pl-1 border border-gray-500 w-[320px] rounded-md">
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                                <input placeholder="Tìm kiếm" className="styled-input"></input>
                            </div>
                        </div>
                        {/* Catagory */}
                        <div className="resize-none outline-none scrollbar-thin scrollbar-webkit overflow-x-auto">
                            <div className="flex flex-row ml-2">
                                {spaceCategories.map(
                                    (spaceCategory) => {
                                        return (
                                            <div
                                                key={spaceCategory.id}
                                                className="flex flex-col items-center border border-gray-500 rounded-xl mr-1 mb-1 p-1"
                                            >
                                                <div className=" bg-color rounded-xl mr-1 mb-1">
                                                    <img
                                                        src={spaceCategory.thumbnail}
                                                        alt="Space Thumbnail"
                                                        style={{
                                                            cursor: "pointer",
                                                            width: "30px",
                                                        }}
                                                        onClick={() =>
                                                            dispatch(
                                                                setCurSpaceCategory(
                                                                    spaceCategory.id
                                                                )
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        </div>

                        <div className="break-line-light"></div>
                        {/* Spaces */}
                        <div className="flex flex-row flex-wrap">
                            {/* <Thumbnail url="https://www.youtube.com/watch?v=82kOXz-vRj0" /> */}
                            {filteredSpaces.map((space) => {
                                const spaceDetails = GetFilteredItemDetail(space.id);
                                return (
                                    <div
                                        key={space.id}
                                        className="flex flex-col justify-start w-[150px] rounded-xl mr-3"
                                        onClick={() => onChangeSpace(space.id)}
                                    >
                                        <Thumbnail url={spaceDetails.url} />
                                        <span className="ml-4 cursor-pointer flex justify-start">
                                            {space.name}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="break-line-light"></div>

                        {/* Detail space */}
                        <div>
                            <div className="flex flex-col">
                                <div></div>
                                <div className="flex flex-row ml-3 p-1">
                                    <div onClick={() => dispatch(toggleMute())} className="mr-3">
                                        {!isMuted ? (
                                            <FontAwesomeIcon icon={faVolumeHigh} />
                                        ) : (
                                            <FontAwesomeIcon icon={faVolumeXmark} />
                                        )}
                                    </div>

                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={volume}
                                        onChange={(e) =>
                                            dispatch(setVideoSoundVolume(e.target.value))
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* </CloseWhenClickOutsideWrapper> */}
                </div>
            )}
        </>
    );
};

export { SpaceController };

const Thumbnail = ({ url }) => {
    try {
        const thumbnailUrl = `https://img.youtube.com/vi/${extractIdFromUrl(url)}/mqdefault.jpg`;
        return (
            <div className="w-[150px] h-[85px] bg-color ml-3">
                <div>
                    <img
                        src={thumbnailUrl}
                        alt="Video Thumbnail"
                        style={{ cursor: "pointer", width: "100%" }}
                        className="rounded-xl"
                    />
                    <div className="relative -top-[83px] left-[60px]">
                        <FontAwesomeIcon icon={faHeartRegular} />
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.log(error);
    }
};
