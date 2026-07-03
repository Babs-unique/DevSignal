import { api } from '../api/api.ts';

export interface UserProfile {
  _id: string;
  email: string;
  name: string;
  githubId: string | null;
  googleId: string | null;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

interface SettingsResponse {
  status: string;
  success: boolean;
  data: {
    user: UserProfile;
  };
}

const settingsSlice = api.injectEndpoints({
  endpoints: (build) => ({
    getSettings: build.query<UserProfile, void>({
      query: () => ({
        url: '/api/v1/settings',
        method: 'GET',
      }),
      transformResponse: (response: SettingsResponse) => response.data.user,
    }),
    updatePassword: build.mutation<void, { currentPassword: string; newPassword: string }>({
      query: (body) => ({
        url: '/api/v1/settings/password',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Settings'],
    }),
    deleteAccount: build.mutation<void, void>({
      query: () => ({
        url: '/api/v1/settings',
        method: 'DELETE',
      }),
      invalidatesTags: ['Settings'],
    }),
  }),
});

export const {
  useGetSettingsQuery,
  useUpdatePasswordMutation,
  useDeleteAccountMutation,
} = settingsSlice;
