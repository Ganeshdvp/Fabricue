import { createSlice } from '@reduxjs/toolkit'

const addressSlice = createSlice({
    name: 'address',
    initialState:null,
    reducers: {
        addAddress: (state, action)=>{
            return action.payload;
        },
    }
});

export const { addAddress} = addressSlice.actions;
export default addressSlice.reducer;