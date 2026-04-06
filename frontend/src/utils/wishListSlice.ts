import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ProductData } from '../types';

const initialState = null as ProductData[] | null;

const wishListSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        addFavorite: (_state, action: PayloadAction<ProductData[]>)=>{
            return action.payload;
        },
        removeFavorite: ()=>{
            return null;
        }
    }
});

export const { addFavorite, removeFavorite } = wishListSlice.actions;
export default wishListSlice.reducer;