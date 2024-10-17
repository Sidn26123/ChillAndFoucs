import React, { useState, useRef, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faCircle, faRotateRight, faGear } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { AudioPlayer } from "../musics/controllers";
import {
    POMODORO,
    SHORT_BREAK,
    LONG_BREAK,
    MAX_COUNT,
    setContinuous,
} from "../../redux/slicers/clockSlicer";
import {
    toggleRunning,
    decrementCurTime,
    changeMode,
    setClockTime,
    resetCurClockTime,
    setRunning,
    setCount,
} from "../../redux/slicers/clockSlicer";
const mode = { "po": "pomodoro", "sb": "shortBreak", "lb": "longBreak" };

const PomodoroClock = () => {
    const clock = useSelector((state) => state.clock.pomodoroClock);
    const dispatch = useDispatch();
    const getCurClockTime = useCallback(() => {
        var curTime = 0;
        clock.time.forEach((element) => {
            if (element.name === clock.mode) {
                curTime = element.curTime;
            }
        });

        return curTime;
    }, [clock]);
    useEffect(() => {
        const interval = setInterval(() => {
            if (clock.isRunning && getCurClockTime() > 0) {
                dispatch(decrementCurTime());
            } else if (getCurClockTime() === 0) {
                dispatch(resetCurClockTime());
                if (clock.count === MAX_COUNT) {
                    dispatch(setCount(0));
                }
                if (clock.mode === SHORT_BREAK) {
                    dispatch(setCount(clock.count + 1));
                }

                dispatch(changeMode({ mode: getNextState() }));
                if (clock.continuous) {
                    dispatch(setRunning(true));
                } else {
                    dispatch(setRunning(false));
                }
            }
        }, 1000); // Mỗi giây giảm 1 đơn vị

        return () => clearInterval(interval); // Xóa interval khi component unmount
    }, [clock, dispatch, getCurClockTime]);

    const items = [];
    for (let i = 0; i <= MAX_COUNT; i++) {
        items.push(
            <div key={i}>
                <FontAwesomeIcon
                    icon={faCircle}
                    className={`text-xs mr-1 ${
                        clock.count >= i ? "text-green-300" : "text-gray-300"
                    }`}
                />
            </div>
        );
    }
    const [isDetailPanelShow, setIsDetailPanelShow] = useState(false);

    function getTimeString(time) {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    function getNextState() {
        var curMode = clock.mode;
        var nextState = "";
        if (curMode === POMODORO) {
            nextState = SHORT_BREAK;
        }
        if (curMode === SHORT_BREAK) {
            nextState = LONG_BREAK;
        }
        if (curMode === LONG_BREAK) {
            nextState = POMODORO;
        }
        return nextState;
    }

    function handleToggleRunning() {
        dispatch(toggleRunning());
    }

    function handleChangeTypeClock(type) {
        dispatch(changeMode({ mode: type }));
        dispatch(setRunning(false));
    }

    function getMinutes(time) {
        return Math.floor(time / 60);
    }

    function handleChangeClockTime(mode, value) {
        //convert to int

        value = parseInt(value) * 60;
        dispatch(setClockTime({ "mode": mode, "value": value }));
    }

    function getTypeTime(type) {
        return clock.time.filter((element) => element.name === type)[0].time;
    }

    return (
        <div className="flex flex-col pomodoro-clock w-[300px] bg-color rounded-lg">
            <div className="flex flex-row items-center justify-between mx-2">
                <div className="flex flex-row items-center">
                    Cá nhân <FontAwesomeIcon icon={faChevronDown} />
                    {items}
                </div>
                <div className="flex flex-row items-center mr-2">
                    <div className="w-4 h-[2px] bg-black rounded-full"></div>
                </div>
            </div>
            <div className="break-line-light"></div>
            <div className="mx-2">
                <div className="flex flex-row justify-between m-3 font-medium">
                    <div className=" text-white text-5xl">{getTimeString(getCurClockTime())}</div>
                    <div className="flex flex-row items-center min-w-28 justify-between">
                        <div
                            className=" border-white text-xl rounded-md border-1"
                            onClick={() => handleToggleRunning()}
                        >
                            {clock.isRunning ? "Dừng" : "Bắt đầu"}
                        </div>
                        <div>
                            <FontAwesomeIcon
                                icon={faRotateRight}
                                onClick={() => {
                                    dispatch(resetCurClockTime());
                                    dispatch(setRunning(false));
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-between items-center mx-1 text-white">
                <div
                    className={`${
                        clock.mode === POMODORO ? "text-lime-200" : " "
                    } cursor-pointer rounded-lg`}
                    onClick={() => handleChangeTypeClock(POMODORO)}
                >
                    <span className = "cursor-pointer">Pomodoro</span>
                </div>
                <div
                    className={`"" ${
                        clock.mode === SHORT_BREAK ? "text-lime-200" : " "
                    } cursor-pointer rounded-lg`}
                    onClick={() => handleChangeTypeClock(SHORT_BREAK)}
                >
                    <span>Short break</span>
                </div>
                <div
                    className={`"" ${
                        clock.mode === LONG_BREAK ? "text-lime-200" : " "
                    } cursor-pointer rounded-lg`}
                    onClick={() => handleChangeTypeClock(LONG_BREAK)}
                >
                    <span>Long break</span>
                </div>
                <FontAwesomeIcon
                    icon={faGear}
                    onClick={() => {
                        setIsDetailPanelShow(!isDetailPanelShow);
                    }}
                    className="cursor-pointer"
                />
            </div>
            {isDetailPanelShow && (
                <div className="flex flex-col text-white px-2">
                    <div className="break-line-light"></div>
                    <div className="flex flex-col py-2">
                        <div className="flex flex-row">
                            <input
                                type="checkbox"
                                defaultChecked={clock.continuous}
                                onChange={(e) => dispatch(setContinuous(e.target.checked))}
                            />
                            <span>Tự động tiếp tục</span>
                        </div>
                        <div className="flex flex-row">
                            <input type="checkbox" />
                            <span>Ẩn phần đếm</span>
                        </div>
                    </div>
                    <div className="break-line-light"></div>
                    <div className="flex flex-row justify-between w-100% items-center overflow-hidden m-1 mx-2">
                        <div className="flex flex-col w-[85px] justify-start">
                            <span className=" text-sm">Pomodoro</span>
                            <input
                                onChange={(e) => handleChangeClockTime(POMODORO, e.target.value)}
                                type="number"
                                class="rounded-lg text-start pl-2 text-gray-800"
                                value={getMinutes(getTypeTime(POMODORO))}
                            />
                        </div>

                        <div className="flex flex-col w-[85px] justify-between">
                            <span className=" text-sm">Short break</span>
                            <input
                                type="number"
                                class="rounded-lg text-start pl-2 text-gray-800"
                                value={getMinutes(getTypeTime(SHORT_BREAK))}
                                onChange={(e) => handleChangeClockTime(SHORT_BREAK, e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col w-[85px] justify-between">
                            <span className=" text-sm">Long break</span>
                            <input
                                type="number"
                                class="rounded-lg text-start pl-2 text-gray-800"
                                value={getMinutes(getTypeTime(LONG_BREAK))}
                                onChange={(e) => handleChangeClockTime(LONG_BREAK, e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="break-line-light">
                        <SoundClockChooser />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PomodoroClock;

const SoundClockChooser = () => {
    const [isSoundPanelShow, setIsSoundPanelShow] = useState(false);

    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-between items-center px-3">
                <span>Âm thanh</span>
                <div>
                    <input className="styled-input w-[100px]"></input>
                    <FontAwesomeIcon
                        icon={faChevronDown}
                        onClick={() => {
                            setIsSoundPanelShow(!isSoundPanelShow);
                        }}
                    />
                    {isSoundPanelShow && (
                        <div className="flex flex-col absolute w-[150px] bg-color shadow-md rounded-sm">
                            <span>Abc</span>
                            <span className="break-line-light"></span>
                        </div>
                    )}
                </div>
                {/* <AudioPlayer mainVolumeEffect = {true} /> */}
            </div>
        </div>
    );
};
