import { combineReducers } from '@reduxjs/toolkit';

import { appSlice } from './app-slice/app-slice';
import { commentsSlice } from './comments-slice/comments-slice';
import { guitarsSlice } from './guitars-slice/guitars-slice';

import { NameSpace } from '../utils/const';

export const rootReducer = combineReducers({
  [NameSpace.App]: appSlice.reducer,
  [NameSpace.Guitars]: guitarsSlice.reducer,
  [NameSpace.Comments]: commentsSlice.reducer,
});