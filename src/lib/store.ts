import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage" // defaults to localStorage for web
import { productsApi } from "./api/productsApi"
import cartReducer from "./feature/cartSlice"

const persistConfig = {
    key: "root",
    storage, // Use localStorage to persist data
    whitelist: ["cart"], // persist only the cart slice
}

const rootReducer = combineReducers({
    cart: cartReducer,  
    [productsApi.reducerPath]: productsApi.reducer, // Handles product data from API
})

const persistedReducer = persistReducer(persistConfig, rootReducer) // rootReducer is your combined reducers

// This is like creating a big storage box for our entire app
export const store = configureStore({
    reducer: persistedReducer,
    // Middleware helps our APIs work properly (like helpers)
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(
            productsApi.middleware, // Helper for product API
        ),
})

export const persistor = persistStore(store)
// These types help TypeScript understand our store structure
export type RootState = ReturnType<typeof store.getState> // What our store looks like
export type AppDispatch = typeof store.dispatch // How we send actions to store