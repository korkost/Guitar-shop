import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { State } from '../../types/state';
import { NameSpace } from '../../utils/const';

interface InitialState {
  reviewModalActive: boolean;
  reviewSuccessModalActive: boolean;
}

const initialState: InitialState = {
  reviewModalActive: false,
  reviewSuccessModalActive: false,
};

export const appSlice = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeReviewModalActive: (state, action: PayloadAction<boolean>) => {
      state.reviewModalActive = action.payload;
    },
    changeReviewSuccessModalActive: (state, action: PayloadAction<boolean>) => {
      state.reviewSuccessModalActive = action.payload;
    },
    closeAllModal: () => initialState,
  },
});

export const { changeReviewModalActive, changeReviewSuccessModalActive, closeAllModal } =
  appSlice.actions;

const selectAppState = (state: State) => state[NameSpace.App];

export const selectReviewModalActive = (state: State) => selectAppState(state).reviewModalActive;
export const selectReviewSuccessModalActive = (state: State) => selectAppState(state).reviewSuccessModalActive;
