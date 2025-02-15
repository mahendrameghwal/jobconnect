import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

// Import your slices and APIs
import CreateJobSlice from './slices/CreateJobSlice';
import CreateOrgSlice from './slices/CreateOrgSlice';
import CreateCandidateSlice from './slices/CreateCandidateSlice';
import loginslice from './slices/Loginslice';
import RegisterSlice from './slices/RegisterSlice';
import ResetpasswordSlice from './slices/ResetpasswordSlice';
import Authslice from './slices/Authslice';
import jobApi from './api/JobApi';
import OrgApi from './api/OrgApi';
import AddressSlice from './slices/AddressSlice';
import CandidateApi from './api/CandidateApi';
import PaymentApi from './api/PaymentApi';
import authApi from './api/authApi';
import Sendcategory from './slices/Sendcategory';

// Combine your reducers
const rootReducer = combineReducers({
  [jobApi.reducerPath]: jobApi.reducer,
  [OrgApi.reducerPath]: OrgApi.reducer,
  [CandidateApi.reducerPath]: CandidateApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [PaymentApi.reducerPath]: PaymentApi.reducer,
  createnewpassword: ResetpasswordSlice,
  CreateJob: CreateJobSlice,
  CreateOrg: CreateOrgSlice,
  CreateCandidate: CreateCandidateSlice,
  login: loginslice,
  register: RegisterSlice,
  address: AddressSlice,
  sendCategory: Sendcategory,
});


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'jobApi/subscriptions/internal_probeSubscription'],
        ignoredPaths: ['jobApi.queries.searchJobs({}).originalArgs'],
        warnAfter: 200
      },
    }).concat(
      jobApi.middleware,
      OrgApi.middleware,
      CandidateApi.middleware,
      authApi.middleware,
      PaymentApi.middleware
    ),
});

// Create persistor
export const persistor = persistStore(store);

export default store;












// import { configureStore } from '@reduxjs/toolkit';
// import CreateJobSlice from './slices/CreateJobSlice';
// import CreateOrgSlice from './slices/CreateOrgSlice';
// import CreateCandidateSlice from './slices/CreateCandidateSlice';
// import loginslice from './slices/Loginslice';
// import RegisterSlice from './slices/RegisterSlice';
// import ResetpasswordSlice from './slices/ResetpasswordSlice';
// import Authslice from './slices/Authslice';
// import jobApi from './api/JobApi';
// import OrgApi from './api/OrgApi';
// import AddressSlice from './slices/AddressSlice';
// import CandidateApi from './api/CandidateApi';
// import authApi from './api/authApi';
// import Sendcategory from './slices/Sendcategory';


// const store = configureStore({
//   reducer: {
//     [jobApi.reducerPath]: jobApi.reducer,
//     [OrgApi.reducerPath]: OrgApi.reducer,
//     [CandidateApi.reducerPath]: CandidateApi.reducer,
//     [authApi.reducerPath]: authApi.reducer,
 

//     auth: Authslice,
//     createnewpassword: ResetpasswordSlice,
//     CreateJob: CreateJobSlice,
//     CreateOrg: CreateOrgSlice,
//     CreateCandidate: CreateCandidateSlice,
//     login: loginslice,
//     register: RegisterSlice,
//     address: AddressSlice,
//     sendCategory: Sendcategory,

//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: ['jobApi/subscriptions/internal_probeSubscription'],
//         ignoredPaths: ['jobApi.queries.searchJobs({}).originalArgs'],
//         warnAfter:100 
//       },
//     }).concat(
//       jobApi.middleware,
//       OrgApi.middleware,
//       CandidateApi.middleware,
//       authApi.middleware,

//     ),
// });
// export default store;
