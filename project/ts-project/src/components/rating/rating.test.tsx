import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import Rating from './rating';

const mockStore = configureMockStore();

const store = mockStore({
  App: {},
  Comments: {},
  Guitars: {},
});

const fakeComponent = (
  <Provider store={store}>
    <MemoryRouter>
      <Rating rating={3} className={'product-card__rate'} currentPosition={'catalog'} />
    </MemoryRouter>
  </Provider>
);

describe('component: Rating', () => {
  it('should render correctly', async () => {
    const { container, getByText } = render(fakeComponent);

    await waitFor(() => {
      expect(getByText(/Всего оценок:/i)).toBeInTheDocument();

      expect(container.firstChild).toHaveClass('rate');
    });
  });
});
