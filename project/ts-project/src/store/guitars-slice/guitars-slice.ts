import {
  createAsyncThunk,
  createSlice,
  createSelector
} from '@reduxjs/toolkit';

import { AxiosInstance } from 'axios';
import { handleError } from '../../services/handle-error';
import {
  APIRoute,
  FetchStatus,
  NameSpace,
  MAX_NUMBER_OF_CARDS
} from '../../utils/const';
import { AppDispatch, State } from '../../types/state';
import { Guitar } from '../../types/guitar';
import { Product } from '../../types/product';
import { selectActivePageNumber } from '../app-slice/app-slice';

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
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchGuitars', async (_args, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Product[]>(`${APIRoute.Guitars}?_embed=comments`);

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

export const guitarsSlice = createSlice({
  name: NameSpace.Guitars,
  initialState,
  reducers: {
    getTotalProductCount: (state, action) => {
      state.totalProductCount = action.payload;
    },
  },
  extraReducers: (buider) => {
    buider
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
      });
  },
});

export const { getTotalProductCount } = guitarsSlice.actions;

const selectGuitarsState = (state: State) => state[NameSpace.Guitars];

export const selectGuitars = (state: State) => selectGuitarsState(state).guitars;
export const selectGuitar = (state: State) => selectGuitarsState(state).guitar;

export const selectFilteredGuitars = createSelector(selectGuitars, (guitars) => {
  return guitars.filter((guitar) => {
    if ('name' in guitar) {
      return true;
    }
    return false;
  });
});

export const selectSortedGuitars = createSelector(
  selectFilteredGuitars,
  selectActivePageNumber,
  (guitars, activePageNumber) => {
    const endLimit = activePageNumber * MAX_NUMBER_OF_CARDS;
    const startLimit = endLimit - MAX_NUMBER_OF_CARDS;

    return guitars.slice(startLimit, endLimit);
  },
);
