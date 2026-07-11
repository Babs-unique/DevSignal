import { api } from '../api/api.ts';

const authSlice = api.injectEndpoints({
    endpoints: (build) => ({
        getGithubAuthUrl: build.query<{ authUrl: string }, void>({
            query: () => ({
                url: '/api/v1/auth/github?json=true',
                method: 'GET',
            }),
            providesTags: ['GithubAuthUrl'],
        })
    })
});

export const {
    useGetGithubAuthUrlQuery,
} = authSlice;
