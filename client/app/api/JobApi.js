import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

    
export const jobApi = createApi({
  reducerPath: 'jobApi',
  baseQuery: fetchBaseQuery({
     baseUrl: `${import.meta.env.VITE_SERVER_URL}/job`,
     credentials: 'include'
}),
  refetchOnMountOrArgChange: true,
  tagTypes: ['job'],
  endpoints: (builder) => ({
    searchJobs: builder.query({
      query: (searchparams) => {
       
        return {
          url: '/post/search',
          method: 'GET',
          params: searchparams,
          transformResponse: (jobs) => jobs.reverse(),
        };
      },
      providesTags: ['job'],
    }),
    getJobById: builder.query({
      query: (id) => `/getjob/${id}`,
      providesTags: ['job'],
    }),
    getJobcategory: builder.query({
      query: () => `/category`,
      invalidatesTags: ['job'],
    }),
    JobdetailWithCandidate: builder.query({
      query: (id) => `/jobdetail/${id}`,
      headers: { 'Content-Type': 'application/json' },
      providesTags: (result, error, id) => [{ type: 'jobetail', id }],
    }),
    createJob: builder.mutation({
      query: (FormData) => ({
        url: '/create',
        method: 'POST',
        body: FormData,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      }),
      invalidatesTags: ['job'],
    }),
    UpdateJobInformation: builder.mutation({
      query: (jobinfo) => ({
        url: `/updatejob`,
        method: 'PATCH',
        credentials: 'include',
        body: jobinfo
      }),
      invalidatesTags: [{ type: 'job', id: 'list' }],
    }),

getJobs: builder.query({
  query: (filter) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(filter)) {
      if (value) {
        params.append(key, value);
      }
    }
    return `/getall/jobs?${params.toString()}`;
  },
  providesTags: ["job"],
}),
    
    RejectedSingleCandidate: builder.mutation({
      query: ({ applicationId, candidateId }) => ({
        url: `/reject/${applicationId}/${candidateId}`,
        method: 'PATCH',
        credentials: 'include',
      }),
      invalidatesTags: (result, error, { applicationId }) => [{ type: 'jobetail', id: applicationId }],
    }),
    ShortlistSingleCandidate: builder.mutation({
      query: ({ applicationId, candidateId }) => ({
        url: `/shortlist/${applicationId}/${candidateId}`,
        method: 'PATCH',
        credentials: 'include',
      }),
      invalidatesTags: (result, error, { applicationId }) => [{ type: 'jobetail', id: applicationId }],
    }),
  }),
});

export const {
  useGetJobcategoryQuery,
  useCreateJobMutation,
  useGetJobByIdQuery,
  useJobdetailWithCandidateQuery,
  useSearchJobsQuery,
  useRejectedSingleCandidateMutation,
  useShortlistSingleCandidateMutation,
  useUpdateJobInformationMutation,
  useGetJobsQuery
} = jobApi;

export default jobApi;

