import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoginPanelShow, setLogoutPanelShow, setRegisterPanelShow } from "../../redux/slicers/uiSlicer";

const UserMenu = () => {
    const isAuth = useSelector((state) => state.user.isAuthenticated);
    return <div>{isAuth ? <UserMenuAuth /> : <UserMenuNoAuth />}</div>;
};
const UserMenuAuth = () => {
    const dispatch = useDispatch();
    return (
        <div className="flex flex-col bg-color w-[110px] absolute rounded-md text-white">
            <div
                className="hover:cursor-pointer text-base py-1"
                onClick={() => {
                }}
            >
                <span>Tài khoản</span>
            </div>
            <div className="break-line-light"></div>
            <div
                className="hover:cursor-pointer text-base py-1"
                onClick={() => {
                }}
            >
                <span>Feedback</span>
            </div>
            <div className="break-line-light"></div>
            <div
                className="hover:cursor-pointer text-base py-1"
                onClick={() => {
                    dispatch(setLogoutPanelShow(true));
                }}
            >
                <span>Đăng xuất</span>
            </div>
        </div>
    );
};
const UserMenuNoAuth = () => {
    const dispatch = useDispatch();
    return (
        <>
            <div className="flex flex-col bg-color w-[110px] absolute rounded-md text-white">
                <div
                    className="hover:cursor-pointer text-base py-1"
                    onClick={() => {
                        dispatch(setLoginPanelShow(true));
                        dispatch(setRegisterPanelShow(false));
                    }}
                >
                    <span>Đăng nhập</span>
                </div>
                <div className="break-line-light"></div>
                <div
                    className="hover:cursor-pointer text-base py-1"
                    onClick={() => {
                        dispatch(setRegisterPanelShow(true));
                        dispatch(setLoginPanelShow(false));
                    }}
                >
                    <span>Đăng ký</span>
                </div>
            </div>
        </>
    );
};

export default UserMenu;
