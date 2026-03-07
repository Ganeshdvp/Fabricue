import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import wishListSlice from './wishListSlice';
import cartItemsSlice from './cartItemsSlice';


const store = configureStore({
    reducer:{
        user : userSlice,
        wishList : wishListSlice,
        cartItems : cartItemsSlice
    }
})

export default store;