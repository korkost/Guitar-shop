import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import Review from './review';
import { mockComment } from '../../utils/mock';

const mockStore = configureMockStore();

const store = mockStore({
  App: {},
  Comments: {},
  Guitars: {},
});

const fakeComponent = (
  <Provider store={store}>
    <MemoryRouter>
      <Review currentComment={mockComment} />
    </MemoryRouter>
  </Provider>
);

describe('component: Review', () => {
  it('should render correctly', async () => {
    const { container, getByText } = render(fakeComponent);

    await waitFor(() => {
      expect(getByText(/Достоинства:/i)).toBeInTheDocument();
      expect(getByText(/Недостатки:/i)).toBeInTheDocument();
      expect(getByText(/Комментарий:/i)).toBeInTheDocument();

      expect(container.firstChild).toHaveClass('review');
    });
  });
});
