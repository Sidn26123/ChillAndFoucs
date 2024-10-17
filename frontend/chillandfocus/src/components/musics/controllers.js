import React, { useEffect, useState } from "react";
import useSound from "use-sound";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
    setMainVolume,
    setSound,
    setSoundMute,
    setSoundVolume,
    setVideoSoundVolume,
    toggleMute,
} from "../../redux/slicers/soundSlicer";
import axios from "axios";
const AudioPlayer = ({ sound, mainVolumeEffect = false }) => {
    // const [volume, setVolume] = useState(1); // Giá trị mặc định là 1 (max)
    const mainVolume = useSelector((state) => state.sound.mainVolume);
    const [play, { pause, isPlaying }] = useSound(
        "http://127.0.0.1:8000" + sound.uri,
        {volume: sound.volume * (mainVolumeEffect ? mainVolume : 1),
            loop: true,
        }
    );
    const dispatch = useDispatch();
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handleVolumeChange = (value) => {
        if (typeof value === "string") {
            value = parseFloat(value);
        }
        dispatch(setSoundVolume({ "id": sound.id, "value": value }));
        // setSoundVolume(value);
    };
    useEffect(() => {
        if (sound.isMute) {
            pause();
        } else {
            play();
        }
    }, [play]);
    const handlePlayPause = () => {
        if (isButtonDisabled) return;

        setIsButtonDisabled(true);
        setTimeout(() => {
            setIsButtonDisabled(false);
        }, 300);


        if (isPlaying) {
            pause(); // Tạm dừng nếu đang phát
        } else if (!isPlaying) {
            play(); // Chỉ phát nếu chưa phát
        }
    };

    function checkSoundMute(src) {}

    return (
        <div className="flex flex-row">
            <button onClick={handlePlayPause}>Play</button>
            <div onClick={() => dispatch(setSoundMute({ "id": sound.id, "value": !sound.isMute }))}>
                {sound.isMute === true ? (
                    <FontAwesomeIcon icon={faVolumeXmark} />
                ) : (
                    <FontAwesomeIcon icon={faVolumeHigh} />
                )}
            </div>

            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={sound.volume}
                onChange={(e) => handleVolumeChange(e.target.value)}
                className="ml-2"
            />
        </div>
    );
}

const AudioController = () => {
    const videoVolume = useSelector((state) => state.sound.videoSoundVolume);
    const mainVolume = useSelector((state) => state.sound.mainVolume);
    const isMute = useSelector((state) => state.sound.isMute);
    const dispatch = useDispatch();
    const isSoundControllerPanelShow = useSelector((state) => state.ui.isSoundControllerPanelShow);
    const sounds = useSelector((state) => state.sound.sounds);
    useEffect(() => {
        getSounds();
    }, []);
    async function getSounds() {
        try {
            const response = await axios.get("http://localhost:8000/api/sound/get-sounds");
            console.log(response.data);
            var sounds = [];
            response.data.sounds.forEach((sound) => {
                var s = { id: sound.id, volume: 0, isMute: false, uri: sound.uri };
                response.data.paths.forEach((path) => {
                    if (path.id === sound.id) {
                        s.uri = path.path;
                    }
                });
                sounds.push(s);
            });
            dispatch(setSound(sounds));
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            {isSoundControllerPanelShow && (
                <div className="flex flex-col w-[300px] min-h-[100px] bg-color rounded-xl text-gray-300 justify-start">
                    <span className="flex justify-start text-lg p-1 pl-3">
                        Bảng điều khiển âm thanh
                    </span>
                    <div className="flex flex-col justify-start">
                        <div className="flex flex-row justify-start ml-3">
                            <div>Âm lượng chính</div>
                        </div>
                        <div className="flex flex-row mx-3">
                            <div onClick={() => dispatch(toggleMute())}>
                                {isMute === true ? (
                                    <FontAwesomeIcon icon={faVolumeXmark} />
                                ) : (
                                    <FontAwesomeIcon icon={faVolumeHigh} />
                                )}
                            </div>

                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={mainVolume}
                                onChange={(e) =>
                                    dispatch(setMainVolume(parseFloat(e.target.value)))
                                }
                                className="ml-2"
                            />
                        </div>
                        <div className="flex flex-row justify-start ml-3">
                            <div>Âm thanh</div>
                        </div>
                        <div>
                            {sounds.map((sound) => {
                                return (
                                    <div key={sound.id} className="flex flex-row ml-3">
                                        <AudioPlayer sound={sound} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export {AudioPlayer};
export default AudioController;
