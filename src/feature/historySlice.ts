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
    totalCount?: number;
    page?: number;
    limit?: number;
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
    getHistoryList: build.query<{ analyses: Analysis[]; totalCount: number; page: number; limit: number }, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 10 } = {}) => ({
        url: '/api/v1/history',
        method: 'GET',
        params: { page, limit },
      }),
      transformResponse: (response: HistoryListResponse) => ({
        analyses: response.data.analyses,
        totalCount: response.data.totalCount ?? response.data.analyses.length,
        page: response.data.page ?? 1,
        limit: response.data.limit ?? 10,
      }),
      providesTags: ['History'],
    }),
    searchHistory: build.query<{ analyses: Analysis[]; totalCount: number; page: number; limit: number }, { q: string; score?: number; date?: number; page?: number; limit?: number }>({
      query: ({ q, score = 50, date = 30, page = 1, limit = 10 }) => ({
        url: '/api/v1/history/search',
        method: 'GET',
        params: { q, score, date, page, limit },
      }),
      transformResponse: (response: HistoryListResponse) => ({
        analyses: response.data.analyses,
        totalCount: response.data.totalCount ?? response.data.analyses.length,
        page: response.data.page ?? 1,
        limit: response.data.limit ?? 10,
      }),
      providesTags: ['History'],
    }),
    getHistoryById: build.query<Analysis, string>({
      query: (id) => ({
        url: `/api/v1/history/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: HistoryDetailResponse) => response.data.analysis,
      providesTags: ['History'],
    }),
    deleteHistoryById: build.mutation<void, string>({
      query: (id) => ({
        url: `/api/v1/history/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['History'],
    }),
    duplicateAnalysesById: build.mutation<Analysis, string>({
      query: (id) => ({
        url: `/api/v1/history/${id}/duplicate`,
        method: 'POST',
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
  useDuplicateAnalysesByIdMutation,
} = historySlice;
