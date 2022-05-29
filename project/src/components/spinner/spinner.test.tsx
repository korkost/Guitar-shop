import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import Spinner from './spinner';

const mockStore = configureMockStore();

const store = mockStore({
  App: {},
  Comments: {},
  Guitars: {},
});

const fakeComponent = (
  <Provider store={store}>
    <MemoryRouter>
      <Spinner className={'spinner'} />
    </MemoryRouter>
  </Provider>
);

describe('component: Spinner', () => {
  it('should render correctly', async () => {
    const { container, getByText } = render(fakeComponent);

    await waitFor(() => {
      expect(getByText(/Loading.../i)).toBeInTheDocument();

      expect(container.firstChild).toHaveClass('spinner_container');
    });
  });
});
