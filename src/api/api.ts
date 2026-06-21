import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError, BaseQueryApi } from '@reduxjs/toolkit/query';
import { logout } from '../feature/apiSlice.js';

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://insighta-api.onrender.com',
    credentials: 'include',
    prepareHeaders: (headers) => {
        headers.set('x-api-version', "1")
        return headers;
    }
})

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args : string | FetchArgs, api : BaseQueryApi, extraOptions: Record<string, unknown>) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        const refreshResult = await baseQuery({
            url : '/api/auth/refresh',
            method: 'POST',
        }, 
            api, extraOptions);
        if (refreshResult.data) {
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout()); 
        }
        }
    return result;
}

export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes:['Auth' , 'Analysis' , 'Dashboard' , 'History' , 'Settings' , 'User'],
    endpoints: () => ({})
})