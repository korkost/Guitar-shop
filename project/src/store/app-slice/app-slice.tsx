import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { State } from '../../types/state';
import { NameSpace, START_PAGE_NUMBER } from '../../utils/const';

interface InitialState {
  activePageNumber: number;
  reviewModalActive: boolean;
  reviewSuccessModalActive: boolean;
}

const initialState: InitialState = {
  activePageNumber: START_PAGE_NUMBER,
  reviewModalActive: false,
  reviewSuccessModalActive: false,
};

export const appSlice = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeActivePageNumber: (state, action: PayloadAction<number>) => {
      state.activePageNumber = action.payload;
    },
    changeReviewModalActive: (state, action: PayloadAction<boolean>) => {
      state.reviewModalActive = action.payload;
    },
    changeReviewSuccessModalActive: (state, action: PayloadAction<boolean>) => {
      state.reviewSuccessModalActive = action.payload;
    },
    closeAllModal: () => initialState,
  },
});

export const { changeActivePageNumber, changeReviewModalActive, changeReviewSuccessModalActive, closeAllModal } =
  appSlice.actions;

const selectAppState = (state: State) => state[NameSpace.App];

export const selectActivePageNumber = (state: State) => selectAppState(state).activePageNumber;
export const selectReviewModalActive = (state: State) => selectAppState(state).reviewModalActive;
export const selectReviewSuccessModalActive = (state: State) => selectAppState(state).reviewSuccessModalActive;