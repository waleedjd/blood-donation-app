import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import allReducers from './reducers/index';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  timeout: null,
  blacklist: ['loader'],
};

const persistedReducer = persistReducer(persistConfig, allReducers);
export const store = createStore(persistedReducer, {}, applyMiddleware(thunk));

export const persister = persistStore(store);
