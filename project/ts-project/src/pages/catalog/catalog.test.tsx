import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import Catalog from './catalog';
import { mockGuitar } from '../../utils/mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  App: {},
  Comments: {},
  Guitars: {
    guitars: [mockGuitar],
  },
});

const fakeComponent = (
  <Provider store={store}>
    <MemoryRouter>
      <Catalog />
    </MemoryRouter>
  </Provider>
);

describe('page: Catalog', () => {
  it('should render correctly', async () => {
    const { getByRole } = render(fakeComponent);

    await waitFor(() => {
      expect(getByRole('heading', { level: 1 })).toHaveTextContent(/Каталог гитар/i);
    });
  });
});
