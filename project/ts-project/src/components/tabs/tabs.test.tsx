import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import Tabs from './tabs';

const mockStore = configureMockStore();

const store = mockStore({
  App: {},
  Comments: {},
  Guitars: {},
});

const fakeComponent = (
  <Provider store={store}>
    <MemoryRouter>
      <Tabs vendorCode={''} type={''} stringCount={0} description={''} />
    </MemoryRouter>
  </Provider>
);

describe('component: SubmitButton', () => {
  it('should render correctly', async () => {
    const { container, getByText } = render(fakeComponent);

    await waitFor(() => {
      expect(getByText(/Характеристики/i)).toBeInTheDocument();
      expect(getByText(/Описание/i)).toBeInTheDocument();
      expect(getByText(/Артикул:/i)).toBeInTheDocument();
      expect(getByText(/Тип:/i)).toBeInTheDocument();
      expect(getByText(/Количество струн:/i)).toBeInTheDocument();

      expect(container.firstChild).toHaveClass('tabs');
    });
  });
});
