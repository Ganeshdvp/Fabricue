import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../types';

const initialState = null as RootState | null;

const wishListSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        addFavorite: (_state, action: PayloadAction<RootState>)=>{
            return action.payload;
        },
        removeFavorite: ()=>{
            return null;
        }
    }
});

export const { addFavorite, removeFavorite } = wishListSlice.actions;
export default wishListSlice.reducer;