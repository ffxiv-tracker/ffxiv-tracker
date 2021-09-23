import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import taskReducer from './slices/taskSlice'
import { authApi } from './services/auth'
import { trackerApi } from './services/tracker'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        task: taskReducer,
        [authApi.reducerPath]: authApi.reducer,
        [trackerApi.reducerPath]: trackerApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, trackerApi.middleware),
})
