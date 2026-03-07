import { createSlice } from '@reduxjs/toolkit'

const wishListSlice = createSlice({
    name: 'favorite',
    initialState:null,
    reducers: {
        addFavorite: (state, action)=>{
            return action.payload;
        },
    }
});

export const { addFavorite } = wishListSlice.actions;
export default wishListSlice.reducer;