import {
  createAsyncThunk,
  createSlice,
  createSelector } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { handleError } from '../../services/handle-error';

import {
  APIRoute,
  FetchStatus,
  NameSpace,
  START_COUNT_COMMENT } from '../../utils/const';

import { AppDispatch, State } from '../../types/state';

import { Comment, SendComment } from '../../types/comment';

interface InitialState {
  comments: Comment[];
  commentsStatus: FetchStatus;
  commentsError: boolean;

  commentsCount: number;

  sendCommentStatus: FetchStatus;
}

const initialState: InitialState = {
  comments: [],
  commentsStatus: FetchStatus.Idle,
  commentsError: false,

  commentsCount: START_COUNT_COMMENT,

  sendCommentStatus: FetchStatus.Idle,
};

export const fetchCommentsAction = createAsyncThunk<
  Comment[],
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchComments', async (id: number, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Comment[]>(`${APIRoute.Guitars}/${id}${APIRoute.Comment}`);

    return data;
  } catch (error) {
    handleError(error);
    throw error;
  }
});

export const sendCommentAction = createAsyncThunk<
  SendComment,
  SendComment,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/sendComment',
  async ({ guitarId, userName, advantage, disadvantage, comment, rating }: SendComment, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<SendComment>(APIRoute.Comment, {
        guitarId,
        userName,
        advantage,
        disadvantage,
        comment,
        rating,
      });

      return data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },
);

export const commentsSlice = createSlice({
  name: NameSpace.Comments,
  initialState,
  reducers: {
    updateCommentsCounter: (state) => {
      state.commentsCount += START_COUNT_COMMENT;
    },
    resetCommentsCounter: (state) => {
      state.commentsCount = START_COUNT_COMMENT;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsAction.pending, (state) => {
        state.commentsStatus = FetchStatus.Pending;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.commentsStatus = FetchStatus.Fulfilled;
      })
      .addCase(fetchCommentsAction.rejected, (state) => {
        state.commentsStatus = FetchStatus.Rejected;
        state.commentsError = true;
      })
      .addCase(sendCommentAction.pending, (state) => {
        state.sendCommentStatus = FetchStatus.Pending;
      })
      .addCase(sendCommentAction.fulfilled, (state) => {
        state.sendCommentStatus = FetchStatus.Fulfilled;
      })
      .addCase(sendCommentAction.rejected, (state) => {
        state.sendCommentStatus = FetchStatus.Rejected;
      });
  },
});

export const { updateCommentsCounter, resetCommentsCounter } = commentsSlice.actions;

const selectCommentsState = (state: State) => state[NameSpace.Comments];

export const selectComments = (state: State) => selectCommentsState(state).comments;
export const selectCommentsCount = (state: State) => selectCommentsState(state).commentsCount;
export const selectSendCommentStatus = (state: State) => selectCommentsState(state).sendCommentStatus;

export const selectCurrentComments = createSelector(selectComments, selectCommentsCount, (comments, count) => {
  return comments
    .slice()
    .sort((a, b) => {
      const dateA = Date.parse(a.createAt);
      const dateB = Date.parse(b.createAt);

      return dateB - dateA;
    })
    .slice(0, count);
});
