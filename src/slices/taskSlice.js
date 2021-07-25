import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false,
}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        toggle: (state) => {
            state.value = !state.value
        },
    },
})

// Action creators are generated for each case reducer function
export const { toggle } = taskSlice.actions

export default taskSlice.reducer