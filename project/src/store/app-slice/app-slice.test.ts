import { 
  appSlice, 
  changeReviewModalActive,
  changeReviewSuccessModalActive,
  closeAllModal 
  } from './app-slice';

const state = {
  activePageNumber: 1,
  reviewModalActive: false,
  reviewSuccessModalActive: false,
};

describe('App slice', () => {
  it('without additional parameters should return initial state', () => {
    expect(appSlice.reducer(void 0, { type: 'unknonw_action' })).toEqual(state);
  });

  it('review modal state should be updated correctly', () => {
    expect(appSlice.reducer(state, changeReviewModalActive(true))).toEqual({
      ...state,
      reviewModalActive: true,
    });
  });

  it('success modal state should be updated correctly', () => {
    expect(appSlice.reducer(state, changeReviewSuccessModalActive(true))).toEqual({
      ...state,
      reviewSuccessModalActive: true,
    });
  });

  it('closeAllModal should be return initial state', () => {
    expect(appSlice.reducer(state, closeAllModal())).toEqual(state);
  });
});