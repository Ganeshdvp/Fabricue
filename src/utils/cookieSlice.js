import { createSlice } from '@reduxjs/toolkit'

const cookieSlice = createSlice({
    name: 'cookie',
    initialState:true,
    reducers: {
        toggleCookie: (state, action)=>{
            return action.payload;
        },
    }
});

export const { toggleCookie } = cookieSlice.actions;
export default cookieSlice.reducer;