import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const orgApi = createApi({
  reducerPath: 'orgApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER_URL}/org`,  credentials: 'include' }),
  refetchOnReconnect: true, refetchOnMountOrArgChange:true,
  tagTypes: ['org','job','interview'],
  endpoints: (builder) => ({
    createorg: builder.mutation({
      query: (FormData) => ({
        url: '/create',
        method: 'POST',
        body: FormData,
        headers: {'Content-Type': 'application/json'},
        credentials:"include"
      }),
      invalidatesTags:  ['org'],
    }),
    getOrg: builder.query({
      query: (searchparams) => {
        return {
          url: '/getall/org',
          method: 'GET',
          params:searchparams,
          transformResponse: (orgs) => orgs.reverse(),
        };
      },
      providesTags: ["org"],
    
    }),


    SearchCandidate: builder.query({
      query: (searchparams) => {
        return {
          url: '/candidate/search',
          method: 'GET',
          params:searchparams,
          transformResponse: (candidate) => candidate.reverse(),
        };
      },
    
    }),
    
    UpdateOrgInformation: builder.mutation({
      query: (data) => (
        {
        url: '/update',
        method: 'PATCH',
        body: data,
        headers: {'Content-Type': 'application/json'},
        credentials:"include"
      }),
      invalidatesTags: ["org"]
    }),

    orgbyid: builder.query({
      query: (id) => `/getorg/${id}`, 
      providesTags: (result) =>
      Array.isArray(result)? [...result.map(({ id }) => ({ type: 'org'})),  { type: 'org' },]: [{ type: 'org' }],
    }),

    DeletePersonalJob: builder.mutation({
      query: (id) => ({
        url: `/job/delete/${id}`,
        method: 'DELETE',
        credentials: "include"
      }),
      invalidatesTags:  ['org'],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const deleteresult = dispatch(
          orgApi.util.updateQueryData("orgbyid", undefined, (orgdata) => {
            const orgindex = orgdata.findIndex((el) => el.id === id);
            orgdata.splice(orgindex, 1);
          
          }),
        );
        try {
          const enddata =  await queryFulfilled;
          
        } catch {
          deleteresult.undo();
        }
      },
    }),

    // Interviews
    createInterview: builder.mutation({
      query: (payload) => ({
        url: '/interview',
        method: 'POST',
        body: payload,
        credentials: 'include',
      }),
      invalidatesTags: ['interview']
    }),
    listInterviews: builder.query({
      query: (scope = 'upcoming') => ({
        url: '/interview',
        params: { scope },
        credentials: 'include',
      }),
      providesTags: ['interview']
    }),
    updateInterview: builder.mutation({
      query: ({ id, update }) => ({
        url: `/interview/${id}`,
        method: 'PATCH',
        body: update,
        credentials: 'include',
      }),
      invalidatesTags: ['interview']
    }),
    deleteInterview: builder.mutation({
      query: (id) => ({
        url: `/interview/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['interview']
    }),
  }),
});


export const { useGetOrgQuery, useSearchCandidateQuery, useCreateorgMutation, useOrgbyidQuery, useDeletePersonalJobMutation, useUpdateOrgInformationMutation, useCreateInterviewMutation, useListInterviewsQuery, useUpdateInterviewMutation, useDeleteInterviewMutation  } = orgApi; 

export default orgApi;
