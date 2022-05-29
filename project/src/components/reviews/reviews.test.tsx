import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import Reviews from './reviews';
import { mockComment } from '../../utils/mock';

const mockStore = configureMockStore();

const store = mockStore({
  App: {},
  Comments: {
    comments: [mockComment],
  },
  Guitars: {},
});

const fakeComponent = (
  <Provider store={store}>
    <MemoryRouter>
      <Reviews />
    </MemoryRouter>
  </Provider>
);

describe('component: Reviews', () => {
  it('should render correctly', async () => {
    const { container, getByText } = render(fakeComponent);

    await waitFor(() => {
      expect(getByText(/Отзывы/i)).toBeInTheDocument();

      expect(container.firstChild).toHaveClass('reviews');
    });
  });
});
