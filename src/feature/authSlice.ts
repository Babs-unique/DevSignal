import { api } from "@/api/api";


const authSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<{ accessToken: string }, { email: string; password: string , token: string }>({
            query: (credentials) => ({
                url: "/api/auth/login",
                method: "POST",
                body: credentials,
            }),
        }),
        register: builder.mutation<{ accessToken: string }, { email: string; password: string, confirmPassword: string , token: string}>({
            query: (credentials) => ({
                url: "/api/auth/register",
                method: "POST",
                body: credentials,
            }),
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: "/api/auth/logout",
                method: "POST",
            }),
        }),
    }),
});


export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authSlice;