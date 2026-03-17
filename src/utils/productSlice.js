import { createSlice } from '@reduxjs/toolkit'

const productSlice = createSlice({
    name: 'cart',
    initialState:null,
    reducers: {
        addProduct: (state, action)=>{
            return action.payload;
        },
        removeProduct: ()=>{
            return null;
        }
    }
});

export const { addProduct , removeProduct} = productSlice.actions;
export default productSlice.reducer;