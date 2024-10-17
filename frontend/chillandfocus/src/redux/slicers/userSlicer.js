import { createSlice } from '@reduxjs/toolkit';
// import { USER_ROLE } from "../../constants/constants";

const initialState = {
    user: {},
    isAuthenticated: false,
    fetching: false,
    errorMsg: "",
    accessToken: "",
    refreshToken: "",
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetchUser: (state) => {
            state.fetching = true;
        },
        fetchUserSuccess: (state) => {
            state.fetching = false;
        },
        fetchUserFailure: (state, action) => {
            state.fetching = false;
            state.errorMsg = action.payload;
        },
        login: (state, action) => {
            state.user = action.payload.user;
            state.fetching = false;
            state.isAuthenticated = true;
            state.accessToken = action.payload.access;
            state.refreshToken = action.payload.refresh;
        },
        logout: (state) => {
            state.user = {};
            state.isAuthenticated = false;
        },
        setErrorMsg: (state, action) => {
            state.errorMsg = action.payload;
        }
    },
});

// Export actions
export const {
    fetchUser,
    fetchUserSuccess,
    fetchUserFailure,
    login,
    logout,setErrorMsg
    
} = userSlice.actions;

// Export reducer
export default userSlice.reducer;
