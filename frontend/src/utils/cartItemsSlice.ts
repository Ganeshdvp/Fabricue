import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { CartItem } from '../types';

const initialState = null as CartItem[] | null;

const cartItemsSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCart: (_state, action: PayloadAction<CartItem[]>)=>{
            return action.payload;
        },
        removeCart: ()=>{
            return null;
        }
    }
});

export const { addCart, removeCart } = cartItemsSlice.actions;
export default cartItemsSlice.reducer;