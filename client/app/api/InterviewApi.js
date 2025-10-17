import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const interviewApi = createApi({
  reducerPath: 'interviewApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER_URL}/interview`, credentials: 'include' }),
  tagTypes: ['interview'],
  endpoints: (builder) => ({
    createInterview: builder.mutation({
      query: (payload) => ({
        url: '/',
        method: 'POST',
        body: payload,
        credentials: 'include',
      }),
      invalidatesTags: ['interview']
    }),
    listInterviews: builder.query({
      query: (scope = 'upcoming') => ({
        url: '/',
        params: { scope },
        credentials: 'include',
      }),
      providesTags: ['interview']
    }),
    listCandidateInterviews: builder.query({
      query: (scope = 'all') => ({
        url: '/candidate',
        params: { scope },
        credentials: 'include',
      }),
      providesTags: ['interview']
    }),
    updateInterview: builder.mutation({
      query: ({ id, update }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: update,
        credentials: 'include',
      }),
      invalidatesTags: ['interview']
    }),
    deleteInterview: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['interview']
    }),
  }),
});

export const { useCreateInterviewMutation, useListInterviewsQuery, useListCandidateInterviewsQuery, useUpdateInterviewMutation, useDeleteInterviewMutation } = interviewApi;
export default interviewApi;


