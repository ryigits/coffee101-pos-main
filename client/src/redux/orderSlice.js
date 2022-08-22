import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
    name: "order",
    initialState: {
        items: [],
        total: 0,
    },
    reducers: {
        addBasket: (state, action) => {
            const checkBasket = state.items.find(
                (item) => item.id === action.payload.id
            );
            if (checkBasket) {
                checkBasket.amount += 1;
                state.total += checkBasket.price;
            } else {
                state.items = [...state.items, action.payload];
                state.total += action.payload.price;
            }
        },
        removeBasket: (state, action) => {
            const currentBasket = state.items.find(
                (item) => item.id === action.payload.id
            );
            const basketWithoutCurrent = state.items.filter(
                (item) => item.id !== action.payload.id
            );
            state.total -= action.payload.price;
            currentBasket.amount -= 1;
            if (currentBasket.amount === 0) {
                state.items = [...basketWithoutCurrent];
            } else {
                state.items = [...basketWithoutCurrent, currentBasket];
            }
        },
        resetBasket: (state) => {
            state.items = [];
            state.total = 0;
        },
    },
});

export const { addBasket, removeBasket,resetBasket } = orderSlice.actions;
export default orderSlice.reducer;
