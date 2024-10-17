import {createSlice} from '@reduxjs/toolkit';

const initState = {
    spaceCategories : [],
    filteredSpaceCategories: [],
    currentSpaceCategory: 1,
}

const spaceCategorySlicer = createSlice({
    name: 'spaceCategory',
    initialState: initState,
    reducers: {
        setSpaceCategories: (state, action) => {
            state.spaceCategories = action.payload;
        },
        setFilteredSpaceCategories: (state, action) => {
            state.filteredSpaceCategories = action.payload;
        },
        setCurSpaceCategory: (state, action) => {
            state.currentSpaceCategory = action.payload;
        },
        updateSpaceCategory: (state, action) => {
            state.spaceCategories = state.spaceCategories.map(spaceCategory => {
                if (spaceCategory.id === action.payload.id) {
                    return action.payload;
                }
                return spaceCategory;
            })
        },
    }
    
})




export const {setSpaceCategories, setFilteredSpaceCategories, setCurSpaceCategory} = spaceCategorySlicer.actions;

export default spaceCategorySlicer.reducer;