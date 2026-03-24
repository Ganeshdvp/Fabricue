import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ProductData } from '../types';

const initialState = null as ProductData[] | null;

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addProduct: (_state, action: PayloadAction<ProductData[]>)=>{
            return action.payload;
        },
        removeProduct: ()=>{
            return null;
        }
    }
});

export const { addProduct , removeProduct} = productSlice.actions;
export default productSlice.reducer;