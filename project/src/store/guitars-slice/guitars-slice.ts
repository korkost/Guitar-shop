import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { handleError } from '../../services/handle-error';

import {
  APIRoute,
  FetchStatus,
  NameSpace
} from '../../utils/const';
import { createQuery } from '../../utils/utils';

import { AppDispatch, State } from '../../types/state';
import { Guitar } from '../../types/guitar';
import { Product } from '../../types/product';
import { Query } from '../../types/query';

interface InitialState {
  guitars: Product[];
  guitarsStatus: FetchStatus;
  guitarsError: boolean;


  totalProductCount: number | null;

  guitar: Guitar | null;
  guitarStatus: FetchStatus;
  guitarError: boolean;

}

const initialState: InitialState = {
  guitars: [],
  guitarsStatus: FetchStatus.Idle,
  guitarsError: false,

  totalProductCount: null,

  guitar: null,
  guitarStatus: FetchStatus.Idle,
  guitarError: false,

};

export const fetchGuitarsAction = createAsyncThunk<
  Product[],
  Query,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/fetchGuitars',
  async (
    { activePageNumber }: Query,
    { dispatch, extra: api },
  ) => {
    const query = createQuery({ activePageNumber });

    try {
      const { data } = await api.get<Product[]>(`${APIRoute.Guitars}?${query}&_embed=comments`);

      return data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },
);

export const fetchRangeGuitars = createAsyncThunk<
  Product[],
  Query,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchRangeGuitars', async ({ activePageNumber }: Query, { dispatch, getState, extra: api }) => {

  const query = createQuery({ activePageNumber });

  try {
    const { data } = await api.get<Product[]>(`${APIRoute.Guitars}?${query}&_embed=comments`);

    return data;
  } catch (error) {
    handleError(error);
    throw error;
  }
});

export const fetchGuitarAction = createAsyncThunk<
  Guitar,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchGuitar', async (id: number, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Guitar>(`${APIRoute.Guitars}/${id}`);

    return data;
  } catch (error) {
    handleError(error);
    throw error;
  }
});

export const fetchGuitarsSearch = createAsyncThunk<
  Guitar[],
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchGuitarsSearch', async (value: string, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Guitar[]>(`${APIRoute.Guitars}?name_like=${value}`);

    return data;
  } catch (error) {
    handleError(error);
    throw error;
  }
});

export const guitarsSlice = createSlice({
  name: NameSpace.Guitars,
  initialState,
  reducers: {
    setTotalProductCount: (state, action) => {
      state.totalProductCount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuitarsAction.pending, (state) => {
        state.guitarsStatus = FetchStatus.Pending;
      })
      .addCase(fetchGuitarsAction.fulfilled, (state, action) => {
        state.guitarsStatus = FetchStatus.Fulfilled;
        state.guitars = action.payload;
      })
      .addCase(fetchGuitarsAction.rejected, (state) => {
        state.guitarsStatus = FetchStatus.Rejected;
        state.guitarsError = true;
      })
      .addCase(fetchRangeGuitars.pending, (state) => {
        state.guitarsStatus = FetchStatus.Pending;
      })
      .addCase(fetchRangeGuitars.fulfilled, (state, action) => {
        state.guitarsStatus = FetchStatus.Fulfilled;
        state.guitars = action.payload;
      })
      .addCase(fetchRangeGuitars.rejected, (state) => {
        state.guitarsStatus = FetchStatus.Rejected;
        state.guitarsError = true;
      })
      .addCase(fetchGuitarAction.pending, (state) => {
        state.guitarStatus = FetchStatus.Pending;
      })
      .addCase(fetchGuitarAction.fulfilled, (state, action) => {
        state.guitar = action.payload;
        state.guitarStatus = FetchStatus.Fulfilled;
      })
      .addCase(fetchGuitarAction.rejected, (state) => {
        state.guitarStatus = FetchStatus.Rejected;
        state.guitarError = true;
      })
  },
});

export const { setTotalProductCount } = guitarsSlice.actions;

const selectGuitarsState = (state: State) => state[NameSpace.Guitars];

export const selectGuitars = (state: State) => selectGuitarsState(state).guitars;
export const selectGuitar = (state: State) => selectGuitarsState(state).guitar;
export const selectTotalProductCount = (state: State) => selectGuitarsState(state).totalProductCount;
