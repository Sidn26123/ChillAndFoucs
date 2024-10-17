import {createSlice} from '@reduxjs/toolkit';

const initState = {
    spaces : [],
    filteredSpaces: [],
    currentSpace: 1,
    isPlaying: true

}

const spaceSlicer = createSlice({
    name: 'space',
    initialState: initState,
    reducers: {
        setSpace: (state, action) => {
            state.spaces = action.payload;
        },
        setCurSpace: (state, action) => {
            state.currentSpace = action.payload;
        },
        initSpace: (state, action) => {
            state.spaces = action.payload;
            var tempArr = [];
            for (var i = 0; i < action.payload.length; i++) {
                tempArr.push(action.payload[i].id);
            }
            state.filteredSpaces = tempArr;
        },
        setPlaying: (state, action) => {
            state.isPlaying = action.payload;
        },
        setFilteredSpaces: (state, action) => {
            state.filteredSpaces = action.payload;
        }
    }
}) 

export const {initSpace, setSpace, setCurSpace, setFilteredSpaces, setPlaying} = spaceSlicer.actions;
export default spaceSlicer.reducer;