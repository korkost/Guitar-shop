import { Action } from '@reduxjs/toolkit';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';

import {
  commentsSlice,
  fetchCommentsAction,
  resetCommentsCounter,
  sendCommentAction,
  updateCommentsCounter,
} from './comments-slice';
import { createAPI } from '../../services/api';

import {
  APIRoute,
  FetchStatus,
  START_COUNT_COMMENT
} from '../../utils/const';
import { State } from '../../types/state';
import {
  mockComment,
  mockSendComment
} from '../../utils/mock';

const fakeArrayLength = 5;
const mockComments = Array.from({ length: fakeArrayLength }, () => mockComment);

const state = {
  comments: [],
  commentsStatus: FetchStatus.Idle,
  commentsError: false,

  commentsCount: START_COUNT_COMMENT,

  sendCommentStatus: FetchStatus.Idle,
};

describe('Comments slice', () => {
  it('without additional parameters should return initial state', () => {
    expect(commentsSlice.reducer(void 0, { type: 'UNKNOWN_ACTION' })).toEqual(state);
  });

  it('comments count state should be updated correctly', () => {
    expect(commentsSlice.reducer(state, updateCommentsCounter())).toEqual({
      ...state,
      commentsCount: START_COUNT_COMMENT + START_COUNT_COMMENT,
    });
  });

  it('comments count state should be reseted correctly', () => {
    expect(commentsSlice.reducer(state, resetCommentsCounter())).toEqual({
      ...state,
      commentsCount: START_COUNT_COMMENT,
    });
  });

  it('', () => {});

  describe('comments async action', () => {
    const api = createAPI();
    const mockAPI = new MockAdapter(api);
    const middlewares = [thunk.withExtraArgument(api)];
    const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);

    it('should dispatch fetch comments when GET /guitars/id/comments', async () => {
      const fakeId = 1;

      mockAPI.onGet(`${APIRoute.Guitars}/${fakeId}${APIRoute.Comment}`).reply(200, mockComments);

      const store = mockStore();

      await store.dispatch(fetchCommentsAction(fakeId));

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toContain(fetchCommentsAction.pending.type);
      expect(actions).toContain(fetchCommentsAction.fulfilled.type);
      expect(actions).not.toContain(fetchCommentsAction.rejected.type);
    });

    it('fetch dispatch send comment when POST /comments', async () => {
      mockAPI.onPost(APIRoute.Comment).reply(204);

      const store = mockStore();

      await store.dispatch(sendCommentAction(mockSendComment));

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toContain(sendCommentAction.pending.type);
      expect(actions).toContain(sendCommentAction.fulfilled.type);
      expect(actions).not.toContain(sendCommentAction.rejected.type);
    });
  });

  describe('fetch comments', () => {
    it('should be update fetch guitars state to pending', () => {
      const action = {
        type: fetchCommentsAction.pending.type,
      };

      expect(commentsSlice.reducer(state, action)).toEqual({
        ...state,
        commentsStatus: FetchStatus.Pending,
      });
    });

    it('should be update fetch guitars state to fulfilled', () => {
      const action = {
        type: fetchCommentsAction.fulfilled.type,
        payload: {
          mockComments,
        },
      };

      expect(commentsSlice.reducer(state, action)).toEqual({
        ...state,
        commentsStatus: FetchStatus.Fulfilled,
        comments: action.payload,
      });
    });

    it('should be update fetch guitars state to rejected', () => {
      const action = {
        type: fetchCommentsAction.rejected.type,
      };

      expect(commentsSlice.reducer(state, action)).toEqual({
        ...state,
        commentsStatus: FetchStatus.Rejected,
        commentsError: true,
      });
    });
  });

  describe('send comment', () => {
    it('should be update send comment status to pending', () => {
      const action = {
        type: sendCommentAction.pending.type,
      };

      expect(commentsSlice.reducer(state, action)).toEqual({
        ...state,
        sendCommentStatus: FetchStatus.Pending,
      });
    });

    it('should be update send comment status to fulfilled', () => {
      const action = {
        type: sendCommentAction.fulfilled.type,
      };

      expect(commentsSlice.reducer(state, action)).toEqual({
        ...state,
        sendCommentStatus: FetchStatus.Fulfilled,
      });
    });

    it('should be update send comment status to rejected', () => {
      const action = {
        type: sendCommentAction.rejected.type,
      };

      expect(commentsSlice.reducer(state, action)).toEqual({
        ...state,
        sendCommentStatus: FetchStatus.Rejected,
      });
    });
  });
});
