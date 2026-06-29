import { api } from '../api/api.ts';



const analysesSlice = api.injectEndpoints({
    endpoints: (build) => ({
        analyses: build.mutation({
            query: (data) => ({
                url: '/api/v1/analyses',
                method: 'POST',
                body: data
            }),
        }),
    }),
});

export const { useAnalysesMutation } = analysesSlice