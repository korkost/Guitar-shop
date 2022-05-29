import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import Product from './product';
import thunk from 'redux-thunk';
import { mockComment, mockGuitar } from '../../utils/mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  App: {},
  Comments: {
    comments: [mockComment],
  },
  Guitars: {
    guitar: mockGuitar,
  },
});

const fakeComponent = (
  <Provider store={store}>
    <MemoryRouter>
      <Product />
    </MemoryRouter>
  </Provider>
);

describe('page: Catalog', () => {
  it('should render correctly', async () => {
    const { getByText, queryByText } = render(fakeComponent);

    await waitFor(() => {
      expect(getByText(/Цена:/i));
      expect(queryByText(/Добавить в корзину/i));
    });
  });
});
