import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleDown,
    faHeadphones,
    faUpRightFromSquare,
    faArrowUpRightFromSquare,
    faEllipsis,
    faVideo,
    faXmark,
    faClipboard,
    faChevronDown,
    faMagnifyingGlass,
    faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";
import { faBell, faUser } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { generateAlphabetString } from "../../utils/stringUtils";
import { setRoomName } from "../../redux/slicers/roomSlicer";
import { setUserMenuDropDownShow } from "../../redux/slicers/uiSlicer";
import UserMenu from "../users/appearances";
import { CenterWrapper, NeedLoginWrapper } from "../common/wrappers";
import Login from "../users/login";
import LoginComponent from "../users/login";
import { RegisterComponent } from "../users";
import { logout } from "../../redux/slicers/userSlicer";
import { Logout } from "../users/logout";
import { WS_ROOT_URL } from "../../constants/apis";
import { RoomComponent, InviteComponent } from "../chat/chat";
const Navbar = () => {
    const dispatch = useDispatch();
    const [isModePanelShow, setIsModePanelShow] = React.useState(false);
    const [roomUI, setRoomUI] = React.useState({
        isRoomPanelShow: false,
        isParticipatePanelShow: false,
    });
    const [isChatPanelShow, setIsChatPanelShow] = React.useState(false);
    const [inviteUI, setInviteUI] = React.useState({
        isInvitePanelShow: false,
        detailInvitedPeopleShow: false,
    });
    const userMenuDropDownShow = useSelector((state) => state.ui.userMenuDropDownShow);
    const loginPanelShow = useSelector((state) => state.ui.loginPanelShow);
    const registerPanelShow = useSelector((state) => state.ui.registerPanelShow);
    const logoutPanelShow = useSelector((state) => state.ui.logoutPanelShow);
    const modePanel = useRef(null);
    React.useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    function handleClickOutside(event) {
        event.stopPropagation();
        if (
            modePanel.current &&
            !modePanel.current.contains(event.target) &&
            event.target.id !== "modePanel"
        ) {
            event.preventDefault();
            setIsModePanelShow(false);
        }
    }

    function handleClickShowModePanel() {
        setIsModePanelShow(!isModePanelShow);
    }
    function handleToggleRoomPanel() {
        setRoomUI({ ...roomUI, isRoomPanelShow: !roomUI.isRoomPanelShow });
    }

    function handleToggleInvitePanel() {
        setInviteUI({ ...inviteUI, isInvitePanelShow: !inviteUI.isInvitePanelShow });
    }
    return (
        <>
            <div className="navbar w-full h-12 flex justify-between items-center px-1 font-size-small">
                <div className="flex flex-row justify-between  rounded-lg p-1 text-gray-300">
                    <div className="flex items-center flex-row justify-between w-[120px] bg-color rounded-lg p-2 px-2 mr-2">
                        <FontAwesomeIcon icon={faHeadphones} className="pl-1" /> Thư giãn{" "}
                        <FontAwesomeIcon
                            icon={faAngleDown}
                            onClick={() => handleClickShowModePanel()}
                            id="modePanel"
                        />
                    </div>
                    <div className="flex items-center flex-row justify-between w-[100px] bg-color rounded-lg p-1 px-2 ">
                        <span className="pl-2">Upgrade</span>
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    </div>
                </div>
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row min-w-[200px] items-center bg-color justify-between rounded-lg text-gray-300 mx-2 px-2 py-2">
                        <FontAwesomeIcon icon={faVideo} />
                        <div className="break-col-light"></div>

                        <div>
                            <span onClick={() => handleToggleRoomPanel()}>
                                Phòng của tôi <FontAwesomeIcon icon={faAngleDown} />
                            </span>
                            {roomUI.isRoomPanelShow && (
                                <div className="relative -left-20">
                                    <NeedLoginWrapper>
                                        <RoomComponent />
                                    </NeedLoginWrapper>
                                </div>
                            )}
                            {inviteUI.isInvitePanelShow && (
                                <div className="relative -left-20">
                                    <InviteComponent />
                                </div>
                            )}
                        </div>
                        <div className="break-col-light"></div>
                        <div onClick={() => handleToggleInvitePanel()}>Mời</div>
                    </div>
                    <div className="flex flex-row min-w-[70px] items-center bg-color justify-between rounded-lg text-gray-300 mx-2 px-2 py-1">
                        <FontAwesomeIcon icon={faBell} className="pl-1" />
                        <FontAwesomeIcon
                            icon={faUser}
                            onClick={() => dispatch(setUserMenuDropDownShow(!userMenuDropDownShow))}
                        />
                    </div>
                    {userMenuDropDownShow && (
                        <div className="relative top-10 right-[115px]">
                            <div className="absolute">
                                <UserMenu />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {isModePanelShow && (
                <div
                    ref={modePanel}
                    className="absolute w-[100px] h-[70px] top-10 left-2 bg-color"
                ></div>
            )}
            {loginPanelShow && (
                <div className="absolute top-10 left-1/2 -translate-x-1/2">
                    <LoginComponent />
                </div>
            )}
            {registerPanelShow && (
                <div className="absolute top-10 left-1/2 -translate-x-1/2">
                    <RegisterComponent />
                </div>
            )}

            {logoutPanelShow && (
                <div>
                    <Logout />
                </div>
            )}
            {/* {roomUI.isRoomPanelShow && (
                <div>
                    <div className="absolute w-[100px] h-[70px] top-10 left-2 bg-color">

                    </div>
                </div>
            )} */}
        </>
    );
};

export default Navbar;
