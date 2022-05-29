import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import ReviewsModalSuccess from './reviews-modal-success';

import { mockGuitar } from '../../../utils/mock';

const mockStore = configureMockStore();

const store = mockStore({
  App: {
    reviewSuccessModalActive: true,
  },
  Comments: { commentsCount: 5, sendCommentStatus: false },
  Guitars: {
    guitar: mockGuitar,
  },
});

const fakeComponent = (
  <Provider store={store}>
    <MemoryRouter>
      <ReviewsModalSuccess />
    </MemoryRouter>
  </Provider>
);

describe('component: ReviewsModalSuccess', () => {
  it('should render correctly', async () => {
    const { getByText, queryByText } = render(fakeComponent);

    await waitFor(() => {
      expect(getByText(/Спасибо за ваш отзыв!/i));
      expect(queryByText('К покупкам!'));
    });
  });
});
