import React, { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStreetView, faSliders, faWater, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { faClock, faNoteSticky } from "@fortawesome/free-regular-svg-icons";
import { SpaceController } from "../spaces/controllers";
import { useDispatch, useSelector } from "react-redux";
import {
    setSpaceControllerPanelShow,
    setSoundControllerPanelShow,
} from "../../redux/slicers/uiSlicer";
const Sidebar = () => {
    const dispatch = useDispatch();
    const spaceControllerPanelShow = useSelector((state) => state.ui.isSpaceControllerPanelShow);
    const soundControllerPanelShow = useSelector((state) => state.ui.isSoundControllerPanelShow);

    function handleClickShowSpaceControllerPanel() {
        dispatch(setSpaceControllerPanelShow(!spaceControllerPanelShow));
        dispatch(setSoundControllerPanelShow(false));
    }

    function handleClickShowSoundControllerPanel() {
        dispatch(setSoundControllerPanelShow(!soundControllerPanelShow));
        dispatch(setSpaceControllerPanelShow(false));
    }

    return (
        <>
            <div className="sidebar bg-color w-[50px] min-h-[200px] m-2  rounded-lg">
                <div className="w-full h-70px my-3 pt-2 text-gray-300">
                    <FontAwesomeIcon
                        id="spaceController"
                        icon={faStreetView}
                        size="lg"
                        className="text-gray-300"
                        onClick={() => {
                            dispatch(setSpaceControllerPanelShow(!spaceControllerPanelShow));
                            dispatch(setSoundControllerPanelShow(false));

                        }}
                    />
                </div>
                <div className="w-full h-50px my-3">
                    <FontAwesomeIcon
                        icon={faSliders}
                        size="lg"
                        className="text-gray-300"
                        onClick={() => {
                            dispatch(setSpaceControllerPanelShow(false));

                            dispatch(setSoundControllerPanelShow(!soundControllerPanelShow));

                        }}
                    />
                </div>
                <span className="break-line-light"></span>
                <div className="w-full h-50px my-3">
                    <FontAwesomeIcon icon={faClock} size="lg" className="text-gray-300" />
                </div>
                <div className="w-full h-50px my-3">
                    <FontAwesomeIcon icon={faNoteSticky} size="lg" className="text-gray-300" />
                </div>
                <div className="w-full h-50px my-3">
                    <FontAwesomeIcon icon={faWater} size="lg" className="text-gray-300" />
                </div>
                <div className="w-full h-50px my-3">
                    <FontAwesomeIcon icon={faEllipsis} size="lg" className="text-gray-300" />
                </div>
                {/* <div className="w-full h-50px my-3">
                    <FontAwesomeIcon icon={faSliders} size="lg" />
                </div> */}
            </div>
        </>
    );
};

export default Sidebar;
