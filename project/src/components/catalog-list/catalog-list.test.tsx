import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { render, waitFor } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import CatalogList from './catalog-list';

import { mockProduct } from '../../utils/mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  App: {
    activePageNumber: 1,
  },
  Comments: {},
  Guitars: {
    guitars: [mockProduct],
  },
});

const fakeComponent = (
  <Provider store={store}>
    <MemoryRouter>
      <CatalogList />
    </MemoryRouter>
  </Provider>
);

describe('component: CatalogList', () => {
  it('should render correctly', async () => {
    const { getByText } = render(fakeComponent);

    await waitFor(() => {
      expect(getByText(/Подробнее/i).closest('a')).toHaveAttribute('href', '/product/1');
      expect(getByText(/Купить/i).closest('a')).toHaveAttribute('href', '/');
    });
  });
});
