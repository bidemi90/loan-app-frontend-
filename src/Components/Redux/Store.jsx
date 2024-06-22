import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import userdataReducer from './userdata';
import admindataReducer from './admindata';
import alluserdataReducer from './alluserdata';
import personalloanrequestReducer from './personalloanrequest';
import studentloanrequestReducer from './studentloanrequest';
import autoloanrequestReducer from './autoloanrequest';
import onepersonalloanrequestReducer from './onepersonalloanrequest';
import onestudentloanrequestReducer from './onestudentloanrequest';
import oneautoloanrequestReducer from './oneautoloanrequest';
import onepaidautoloanReducer from './onepaidautoloan';
import onepaidpersonalloanReducer from './onepaidpersonalloan';
import onepaidstudentloanReducer from './onepaidstudentloan';
import paidpersonalloanReducer from './paidpersonalloan';
import paidstudentloanReducer from './paidstudentloan';
import paidautoloanReducer from './paidautoloan';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  userdata: userdataReducer,
  admindata: admindataReducer,
  alluserdata: alluserdataReducer,
  personalloanrequest: personalloanrequestReducer,
  studentloanrequest: studentloanrequestReducer,
  autoloanrequest: autoloanrequestReducer,
  onepersonalloanrequest: onepersonalloanrequestReducer,
  onestudentloanrequest: onestudentloanrequestReducer,
  oneautoloanrequest: oneautoloanrequestReducer,
  onepaidautoloan: onepaidautoloanReducer,
  onepaidpersonalloan: onepaidpersonalloanReducer,
  onepaidstudentloan: onepaidstudentloanReducer,
  paidpersonalloan: paidpersonalloanReducer,
  paidstudentloan: paidstudentloanReducer,
  paidautoloan: paidautoloanReducer,
  // Add other reducers here if needed
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const Store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(Store);
