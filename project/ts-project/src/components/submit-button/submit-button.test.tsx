import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import SubmitButton from './submit-button';

const mockStore = configureMockStore();

const store = mockStore({
  App: {},
  Comments: {},
  Guitars: {},
});

const fakeComponent = (
  <Provider store={store}>
    <MemoryRouter>
      <SubmitButton onModalClick={jest.fn()} />
    </MemoryRouter>
  </Provider>
);

describe('component: SubmitButton', () => {
  it('should render correctly', async () => {
    const { container, getByText } = render(fakeComponent);

    await waitFor(() => {
      expect(getByText(/Оставить отзыв/i)).toBeInTheDocument();

      expect(container.firstChild).toHaveClass('button button--red-border button--big reviews__sumbit-button');
    });
  });
});
