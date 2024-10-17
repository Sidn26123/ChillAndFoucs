import { useEffect, useState } from "react";
import axios from "axios";
import { logout } from "../../redux/slicers/userSlicer";
import { useDispatch } from "react-redux";
export const Logout = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        
        (async () => {
            try {
                const { data } = await axios.post(
                    "http://localhost:8000/api/auth/logout",
                    {
                        refresh_token: localStorage.getItem("refreshToken"),
                    },
                    { headers: { "Content-Type": "application/json" } },
                    { withCredentials: true }
                );
                localStorage.clear();
                axios.defaults.headers.common["Authorization"] = null;
                dispatch(logout());
            } catch (e) {
                console.log("Có lỗi xảy ra", e);
            }
            dispatch(logout());

        })();
    }, []);
    return <div></div>;
};
