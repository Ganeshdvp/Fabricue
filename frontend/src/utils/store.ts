import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import wishListSlice from './wishListSlice';
import cartItemsSlice from './cartItemsSlice';
import cookieSlice from './cookieSlice';
import productSlice from './productSlice';
import addressSlice from './addressSlice';
import SideBarDashboardSlice from './SideBarDashboardSlice';


const store = configureStore({
    reducer:{
        user : userSlice,
        wishList : wishListSlice,
        cartItems : cartItemsSlice,
        cookieToggle : cookieSlice,
        product: productSlice,
        address: addressSlice,
        sidebarDashboard: SideBarDashboardSlice,
    }
})

export default store;