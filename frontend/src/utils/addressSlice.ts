import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Address } from '../types';


const initialState = null as Address | null;

const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        addAddress: (_state, action: PayloadAction<Address>) =>{
            return action.payload;
        },
        removeAddress: ()=>{
            return null;
        }
    }
});

export const { addAddress, removeAddress} = addressSlice.actions;
export default addressSlice.reducer;