import { configureStore } from '@reduxjs/toolkit'
import taskReducer from './slices/taskSlice'
import { trackerApi } from './services/tracker'

export const store = configureStore({
    reducer: {
        task: taskReducer,
        [trackerApi.reducerPath]: trackerApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(trackerApi.middleware),
})