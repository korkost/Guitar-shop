import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import UpButton from './up-button';

const mockStore = configureMockStore();

const store = mockStore({
  App: {},
  Comments: {},
  Guitars: {},
});

const fakeComponent = (
  <Provider store={store}>
    <MemoryRouter>
      <UpButton />
    </MemoryRouter>
  </Provider>
);

describe('component: SubmitButton', () => {
  it('should render correctly', async () => {
    const { container, getByText } = render(fakeComponent);

    await waitFor(() => {
      expect(getByText(/Наверх/i)).toBeInTheDocument();

      expect(container.firstChild).toHaveClass('button button--up button--red-border button--big reviews__up-button');
      expect(container.firstChild).toHaveAttribute('href', '#header');
    });
  });
});
