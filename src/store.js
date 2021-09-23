import { configureStore } from '@reduxjs/toolkit'
import { trackerApi } from './services/tracker'

export const store = configureStore({
    reducer: {
        [trackerApi.reducerPath]: trackerApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(trackerApi.middleware),
})
