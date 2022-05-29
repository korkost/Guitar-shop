import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import ProductCard from './product-card';
import { mockProduct } from '../../utils/mock';

const mockStore = configureMockStore();

const store = mockStore({
  App: {},
  Comments: {},
  Guitars: {},
});

const fakeComponent = (
  <Provider store={store}>
    <MemoryRouter>
      <ProductCard guitar={mockProduct} />
    </MemoryRouter>
  </Provider>
);

describe('component: ProductCatd', () => {
  it('should render correctly', async () => {
    const { queryByText, container, getByText } = render(fakeComponent);

    await waitFor(() => {
      expect(getByText(/Цена:/i)).toBeInTheDocument();
      expect(getByText(/Подробнее/i)).toBeInTheDocument();
      expect(getByText(/Купить/i)).toBeInTheDocument();
      expect(queryByText('Далее'));
      expect(container.firstChild).toHaveClass('product-card');
    });
  });
});
