import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



export const CandidateApi = createApi({
  reducerPath: 'CandidateApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER_URL}/candidate` ,  credentials:"include"}),
  tagTypes: ["candidate"],
  endpoints: (builder) => ({
    GetCandidate: builder.query({
      query: () => '/getall/candidate', 
      providesTags: ["candidate"],
    }),
    SingleCandidate: builder.query({
        query: (id) => `/get/${id}`, 
        providesTags: ["candidate"],
      }),
    createCadidate: builder.mutation({
      query: (data) => (
        {
        url: '/create',
        method: 'POST',
        body: data,
        headers: {'Content-Type': 'application/json'},
        credentials:"include"
      }),
      invalidatesTags: ["candidate"]
    }),
    EditCandidateInformation: builder.mutation({
      query: (data) => (
        {
        url: '/edit',
        method: 'PUT',
        body: data,
        headers: {'Content-Type': 'application/json'},
        credentials:"include"
      }),
      invalidatesTags: ["candidate"]
    }),
    UpdateCandidateProfile: builder.mutation({
      query: (data) => (
        {
        url: '/update/profile',
        method: 'PUT',
        body: data,
        headers: {'Content-Type': 'application/json'},
        credentials:"include",

      }),
      invalidatesTags: ["candidate"]
    }),
    UpdateResume: builder.mutation({
      query: (data) => (
        {
        url: '/upload/resume',
        method: 'PUT',
        body: data,
        formData: true,
        credentials:"include",
      }),
      invalidatesTags: ["candidate"]
    }),
    ApplyforJob: builder.mutation({
      query: (id) => ( {
        url: `/apply/${id}`,
        method: 'PATCH',
        credentials:"include"
      }),
      invalidatesTags: ["candidate"]
    }),
  }),
});

export const {
  useEditCandidateInformationMutation,
  useGetCandidateQuery,
  useCreateCadidateMutation,
  useSingleCandidateQuery,
  useApplyforJobMutation,
  useUpdateCandidateProfileMutation,
  useUpdateResumeMutation
} = CandidateApi; 
export default CandidateApi;
