import { api } from "@/api/api";

export interface User {
    id: string;
    email: string;
    name: string;
    githubId: string | null;
    googleId: string | null;
    avatarUrl: string | null;
    createdAt: string;
}
export interface MeResponse {
    status: 'success';
    data: {
        user: User;
    };
}

const authSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<{ accessToken: string }, { email: string; password: string; token: string }>({
            query: (credentials) => ({
                url: "/api/v1/auth/login",
                method: "POST",
                body: credentials,
            }),
            invalidatesTags: ["Auth"],
        }),
        register: builder.mutation<{ accessToken: string }, { email: string; password: string; confirmPassword: string; token: string }>({
            query: (credentials) => ({
                url: "/api/v1/auth/register",
                method: "POST",
                body: credentials,
            }),
            invalidatesTags: ["Auth"],
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: "/api/v1/auth/logout",
                method: "POST",
            }),
            invalidatesTags: ["Auth"],
        }),
        me: builder.query<User, void>({
            query: () => ({
                url: "/api/v1/auth/me",
                method: "GET",
            }),
            transformResponse: (response: MeResponse) => response.data.user,
            providesTags: ["Auth", "User"],
        }),
        deleteAccount: builder.mutation<void, void>({
            query: () => ({
                url: "/api/v1/auth/delete",
                method: "DELETE",
            }),
            invalidatesTags: ["Auth", "User"],
        }),
        forgotPassword: builder.mutation<void, { email: string }>({
            query: (body) => ({
                url: "/api/v1/auth/forgot-password",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Auth"],
        }),
        resetPassword: builder.mutation<void, { token: string; newPassword: string; confirmPassword: string }>( {
            query: (body) => ({
                url: `/api/v1/auth/reset-password`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Auth"],
        })
    })
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useMeQuery, useDeleteAccountMutation, useForgotPasswordMutation, useResetPasswordMutation } = authSlice;
