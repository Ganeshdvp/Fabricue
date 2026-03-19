import { createSlice } from '@reduxjs/toolkit'

const addressSlice = createSlice({
    name: 'address',
    initialState:null,
    reducers: {
        addAddress: (state, action)=>{
            return action.payload;
        },
        removeAddress: ()=>{
            return null;
        }
    }
});

export const { addAddress, removeAddress} = addressSlice.actions;
export default addressSlice.reducer;