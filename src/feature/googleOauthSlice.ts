import { api } from '../api/api.ts';

const authSlice = api.injectEndpoints({
    endpoints: (build) => ({
        getGoogleAuthUrl: build.query<{ authUrl: string }, void>({
            query: () => ({
                url: '/api/v1/auth/google?json=true',
                method: 'GET',
            }),
        })
    })
});

export const {
    useGetGoogleAuthUrlQuery,
} = authSlice;
