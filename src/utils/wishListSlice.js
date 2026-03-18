import { createSlice } from '@reduxjs/toolkit'

const wishListSlice = createSlice({
    name: 'favorite',
    initialState:null,
    reducers: {
        addFavorite: (state, action)=>{
            return action.payload;
        },
        removeFavorite: ()=>{
            return null;
        }
    }
});

export const { addFavorite, removeFavorite } = wishListSlice.actions;
export default wishListSlice.reducer;