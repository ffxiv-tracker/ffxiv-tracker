import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const trackerApi = createApi({
    reducerPath: 'trackerApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://hdnss8awo4.execute-api.us-west-2.amazonaws.com/' }),
    endpoints: (builder) => ({
        getMasterTasks: builder.query({
            query: () => `tasks`,
        }),
        getUserTasks: builder.query({
            query: () => `user/tasks`,
        }),
        saveNewTasks: builder.mutation({
            query: (body) =>{
                return {
                    url: 'user/tasks',
                    method: 'POST',
                    body,
                }
            }
        }),
        updateUserTask: builder.mutation({
            query: (body) =>{
                return {
                    url: 'user/tasks/current',
                    method: 'POST',
                    body,
                }
            }
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetMasterTasksQuery, useGetUserTasksQuery, useSaveNewTasksMutation, useUpdateUserTaskMutation} = trackerApi