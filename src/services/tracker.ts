import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiBaseUrl = process.env.REACT_APP_API_HOST;

// Define a service using a base URL and expected endpoints
export const trackerApi = createApi({
    reducerPath: 'trackerApi',
    baseQuery: fetchBaseQuery({
        baseUrl: apiBaseUrl,
        prepareHeaders: (headers) => {
            // By default, if we have a token in the store, let's use that for authenticated requests
            const token = localStorage.getItem("jwt")
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['Task'],
    endpoints: (builder) => ({
        exchange: builder.mutation({
            query: (body) =>{
                const codeObj = {
                    code: body
                }
                return {
                    url: 'exchange',
                    method: 'POST',
                    body: codeObj
                }
            },
        }),
        getMasterTasks: builder.query({
            query: () => `tasks`,
            providesTags: ['Task']
        }),
        getUserTasks: builder.query({
            query: () => `user/tasks`,
            providesTags: ['Task']

        }),
        saveNewTasks: builder.mutation({
            query: (body) =>{
                return {
                    url: 'user/tasks',
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: ['Task']
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
export const { useExchangeMutation, useGetMasterTasksQuery, useGetUserTasksQuery, useSaveNewTasksMutation, useUpdateUserTaskMutation} = trackerApi