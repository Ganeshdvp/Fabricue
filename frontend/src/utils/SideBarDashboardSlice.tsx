import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface SideBarDashboardState {
  content: string;
  toggle: boolean
}

const initialState: SideBarDashboardState = {
  content: "Overview",
  toggle: true
};

const SideBarDashboardSlice = createSlice({
    name: "sidebar-dashboard",
    initialState,
    reducers: {
        setContent: (state, action: PayloadAction<string>)=>{
            state.content = action.payload;
        },
        setToggle: (state, action: PayloadAction<boolean>)=>{
          state.toggle = action.payload;
        }
    }
});

export const {setContent, setToggle} = SideBarDashboardSlice.actions;
export default SideBarDashboardSlice.reducer;