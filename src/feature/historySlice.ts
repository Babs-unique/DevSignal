import { api } from '../api/api.ts';
import type { Analysis } from './dashboardSlice';

export interface HistoryMetricResponse {
  total: number;
  averageMatchScore: string;
  topMatchedRole: number | null;
  topMatchedRoleName: string | null;
}

interface HistoryListResponse {
  status: string;
  success: boolean;
  data: {
    analyses: Analysis[];
  };
}

interface HistoryDetailResponse {
  status: string;
  success: boolean;
  data: {
    analysis: Analysis;
  };
}

const historySlice = api.injectEndpoints({
  endpoints: (build) => ({
    getHistoryMetrics: build.query<HistoryMetricResponse, void>({
      query: () => ({
        url: '/api/v1/history/metric',
        method: 'GET',
      }),
      transformResponse: (response: { data: HistoryMetricResponse }) => response.data,
    }),
    getHistoryList: build.query<Analysis[], { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 10 } = {}) => ({
        url: '/api/v1/history',
        method: 'GET',
        params: { page, limit },
      }),
      transformResponse: (response: HistoryListResponse) => response.data.analyses,
    }),
    searchHistory: build.query<Analysis[], { q: string; score?: number; date?: number }>({
      query: ({ q, score = 50, date = 30 }) => ({
        url: '/api/v1/history/search',
        method: 'GET',
        params: { q, score, date },
      }),
      transformResponse: (response: HistoryListResponse) => response.data.analyses,
    }),
    getHistoryById: build.query<Analysis, string>({
      query: (id) => ({
        url: `/api/v1/history/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: HistoryDetailResponse) => response.data.analysis,
    }),
    deleteHistoryById: build.mutation<void, string>({
      query: (id) => ({
        url: `/api/v1/history/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['History'],
    }),
  }),
});

export const {
  useGetHistoryMetricsQuery,
  useGetHistoryListQuery,
  useSearchHistoryQuery,
  useGetHistoryByIdQuery,
  useDeleteHistoryByIdMutation,
} = historySlice;
