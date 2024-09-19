import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/user`,
    credentials: 'include',
  }),
  tagTypes: ['auth'],
  endpoints: (builder) => ({
    Login: builder.mutation({
      query: (User) => ({
        url: '/login',
        method: 'POST',
        body: User,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      }),
    }),
    Register: builder.mutation({
      query: (Registerdata) => ({
        url: '/register',
        method: 'POST',
        body: Registerdata,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      }),
    }),
    SignOut: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      }),
      invalidatesTags:["auth"]
    }),

    CurrentUser: builder.query({
      query: () => `/currentuser`,
      credentials: 'include',
      providesTags: ['auth'],
    }),
    Me: builder.query({
      query: () => `/me`,
      credentials: 'include',
      providesTags: ['auth'],
    }),
    UserDetail: builder.query({
      query: (id) => `/getinfo/${id}`,
      credentials: 'include',
      providesTags: ['auth'],
    }),
    MultipleUserDetail: builder.query({
      query: (userIds) => ({
        url: '/multiple-user-info',
        params: { ids: userIds.join(',') },
      }),

    }),

    RequestPasswordReset: builder.mutation({
      query: ({email}) => ({
        url: '/resetrequest',
        method: 'POST',
        body: { email },
      }),
    }),

    DelAcountRequest: builder.mutation({
      query: () => ({
        url: '/acountdelrequest',
        method: 'POST',
        credentials:"include"
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useCurrentUserQuery,
  useUserDetailQuery,
  useMultipleUserDetailQuery,
  useRequestPasswordResetMutation,
  useDelAcountRequestMutation,
  useSignOutMutation,
  useMeQuery,
  
} = authApi;

export default authApi;
// resetrequest