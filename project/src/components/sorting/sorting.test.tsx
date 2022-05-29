import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import Sorting from './sorting';

const mockStore = configureMockStore();

const store = mockStore({
  App: {},
  Comments: {},
  Guitars: {},
});

const fakeComponent = (
  <Provider store={store}>
    <MemoryRouter>
      <Sorting />
    </MemoryRouter>
  </Provider>
);

describe('component: Sorting', () => {
  it('should render correctly', async () => {
    const { container, getByText } = render(fakeComponent);

    await waitFor(() => {
      expect(getByText(/Сортировать:/i)).toBeInTheDocument();
      expect(getByText(/по цене/i)).toBeInTheDocument();
      expect(getByText(/по популярности/i)).toBeInTheDocument();

      expect(container.firstChild).toHaveClass('catalog-sort');
    });
  });
});
