// src/features/api/paymentApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/subscription`, 
    credentials: 'include',
  }),
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  tagTypes: ['payment'],
  endpoints: (builder) => ({
    getUserSubscriptionsHistory: builder.query({
      query: () => '/history',
      providesTags: ['payment'],
    }),

    getUserCurrentSubscription: builder.query({
      query: () => '/current',
      providesTags: ['payment'],
    }),

    createSubscription: builder.mutation({
      query: (subscriptionData) => ({
        url: '/create',
        method: 'POST',
        body: subscriptionData,
      }),
      invalidatesTags: ['payment'],
    }),
    cancelSubscription: builder.mutation({
      query: (subscriptionId) => ({
        url: `/cancel/${subscriptionId}`,
        method: 'POST',
      }),
      invalidatesTags: ['payment'],
    }),

    RefundMoney: builder.mutation({
      query: (subscriptionId) => ({
        url: `/refund/${subscriptionId}`,
        method: 'POST',
      }),
      invalidatesTags: ['payment'],
    }),
  }),
});

export const { 
  useGetUserSubscriptionsHistoryQuery, 
  useCreateSubscriptionMutation,
  useCancelSubscriptionMutation,
  useGetUserCurrentSubscriptionQuery,
  useRefundMoneyMutation
} = paymentApi;

export default paymentApi;