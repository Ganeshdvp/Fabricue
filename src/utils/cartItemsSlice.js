import { createSlice } from '@reduxjs/toolkit'

const cartItemsSlice = createSlice({
    name: 'cart',
    initialState:null,
    reducers: {
        addCart: (state, action)=>{
            return action.payload;
        },
        removeCart: ()=>{
            return null;
        }
    }
});

export const { addCart, removeCart } = cartItemsSlice.actions;
export default cartItemsSlice.reducer;