import { createSlice } from '@reduxjs/toolkit'

const cartItemsSlice = createSlice({
    name: 'cart',
    initialState:null,
    reducers: {
        addCart: (state, action)=>{
            return action.payload;
        },
    }
});

export const { addCart } = cartItemsSlice.actions;
export default cartItemsSlice.reducer;