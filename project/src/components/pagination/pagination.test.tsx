import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import Pagination from './pagination';
import { mockProduct } from '../../utils/mock';

const mockStore = configureMockStore();

const store = mockStore({
  App: {},
  Comments: {},
  Guitars: {
    guitars: [mockProduct],
  },
});

const fakeComponent = (
  <Provider store={store}>
    <MemoryRouter>
      <Pagination />
    </MemoryRouter>
  </Provider>
);

describe('component: Pagination', () => {
  it('should render correctly', async () => {
    const { queryByText, container } = render(fakeComponent);

    await waitFor(() => {
      expect(queryByText('Назад'));
      expect(queryByText('Далее'));
      expect(container.firstChild).toHaveClass('pagination page-content__pagination');
    });
  });
});
