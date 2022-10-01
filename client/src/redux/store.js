import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./orderSlice";
import userReducer from "./userSlice";

export default configureStore({
    reducer: {
        order: orderReducer,
        user:userReducer
    },
});
