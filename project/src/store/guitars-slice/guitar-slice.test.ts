import { Action } from '@reduxjs/toolkit';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';

import { fetchGuitarAction, fetchGuitarsAction, guitarsSlice } from './guitars-slice';
import { createAPI } from '../../services/api';

import { APIRoute, FetchStatus } from '../../utils/const';
import { State } from '../../types/state';
import { mockGuitar } from '../../utils/mock';
import { mockProducts } from '../../utils/utils';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);

const state = {
  guitars: [],
  guitarsStatus: FetchStatus.Idle,
  guitarsError: false,

  totalProductCount: null,

  guitar: null,
  guitarStatus: FetchStatus.Idle,
  guitarError: false,
};

describe('Guitars slice', () => {
  it('without additional parameters should return initial state', () => {
    expect(guitarsSlice.reducer(void 0, { type: 'UNKNOWN_ACTION' })).toEqual(state);
  });

  describe('guitars async action', () => {
    it('should dispatch fetchGuitarsAction when GET /guitars with query parameters', async () => {
      const fakeParams = {
        activePageNumber: 1,
      };

      mockAPI.onGet(`${APIRoute.Guitars}?_embed=comments`).reply(200, mockProducts);

      const store = mockStore();

      await store.dispatch(fetchGuitarsAction(fakeParams));

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toContain(fetchGuitarsAction.pending.type);
      expect(actions).toContain(fetchGuitarsAction.fulfilled.type);
      expect(actions).not.toContain(fetchGuitarsAction.rejected.type);
    });

    it('should dispatch fetchGuitarAction when GET /guitars/id ', async () => {
      const fakeGuitarId = 1;

      mockAPI.onGet(`${APIRoute.Guitars}/${fakeGuitarId}`).reply(200, mockGuitar);

      const store = mockStore();

      await store.dispatch(fetchGuitarAction(fakeGuitarId));

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toContain(fetchGuitarAction.pending.type);
      expect(actions).toContain(fetchGuitarAction.fulfilled.type);
      expect(actions).not.toContain(fetchGuitarAction.rejected.type);
    });
  });

  describe('fetch guitars', () => {
    it('should be update fetch guitars state to pending', () => {
      const action = {
        type: fetchGuitarsAction.pending.type,
      };

      expect(guitarsSlice.reducer(state, action)).toEqual({
        ...state,
        guitarsStatus: FetchStatus.Pending,
      });
    });

    it('should be update fetch guitars state to fulfilled', () => {
      const action = {
        type: fetchGuitarsAction.fulfilled.type,
        payload: {
          mockProducts,
        },
      };

      expect(guitarsSlice.reducer(state, action)).toEqual({
        ...state,
        guitars: action.payload,
        guitarsStatus: FetchStatus.Fulfilled,
      });
    });

    it('should be update fetch guitars state to rejected', () => {
      const action = {
        type: fetchGuitarsAction.rejected.type,
      };

      expect(guitarsSlice.reducer(state, action)).toEqual({
        ...state,
        guitarsStatus: FetchStatus.Rejected,
        guitarsError: true,
      });
    });
  });

  describe('fetch guitar', () => {
    it('should be update fetch guitar state to pending', () => {
      const action = {
        type: fetchGuitarAction.pending.type,
      };

      expect(guitarsSlice.reducer(state, action)).toEqual({
        ...state,
        guitarStatus: FetchStatus.Pending,
      });
    });

    it('should be update fetch guitar state to fulfilled', () => {
      const action = {
        type: fetchGuitarAction.fulfilled.type,
        payload: {
          mockGuitar,
        },
      };

      expect(guitarsSlice.reducer(state, action)).toEqual({
        ...state,
        guitar: action.payload,
        guitarStatus: FetchStatus.Fulfilled,
      });
    });

    it('should be update fetch guitar state to rejected', () => {
      const action = {
        type: fetchGuitarAction.rejected.type,
      };

      expect(guitarsSlice.reducer(state, action)).toEqual({
        ...state,
        guitarStatus: FetchStatus.Rejected,
        guitarError: true,
      });
    });
  });
});
