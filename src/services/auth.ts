import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { store } from "../store";

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://hdnss8awo4.execute-api.us-west-2.amazonaws.com/',
        // prepareHeaders: (headers, { getState }) => {
        //     // By default, if we have a token in the store, let's use that for authenticated requests
        //     const token = store.getState;
        //     if (token) {
        //         headers.set("Authorization", `Bearer ${token}`);
        //     }
        //     return headers;
        // }
    }),
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
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useExchangeMutation } = authApi