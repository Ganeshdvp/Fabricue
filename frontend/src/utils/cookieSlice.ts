import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const cookieSlice = createSlice({
    name: 'cookie',
    initialState:true,
    reducers: {
        toggleCookie: (_state, action: PayloadAction<boolean>)=>{
            return action.payload;
        },
    }
});

export const { toggleCookie } = cookieSlice.actions;
export default cookieSlice.reducer;