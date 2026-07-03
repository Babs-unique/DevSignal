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
        }),
        register: builder.mutation<{ accessToken: string }, { email: string; password: string; confirmPassword: string; token: string }>({
            query: (credentials) => ({
                url: "/api/v1/auth/register",
                method: "POST",
                body: credentials,
            }),
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
        }),
        deleteAccount: builder.mutation<void, void>({
            query: () => ({
                url: "/api/v1/auth/delete",
                method: "DELETE",
            }),
            invalidatesTags: ["Auth", "User"],
        }),
    })
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useMeQuery, useDeleteAccountMutation } = authSlice;
