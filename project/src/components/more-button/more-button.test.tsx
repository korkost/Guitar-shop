import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import MoreButton from './more-button';

const mockStore = configureMockStore();

const store = mockStore({
  App: {},
  Comments: {},
  Guitars: {},
});

const fakeComponent = (
  <Provider store={store}>
    <MemoryRouter>
      <MoreButton />
    </MemoryRouter>
  </Provider>
);

describe('component: MoreButton', () => {
  it('should render correctly', async () => {
    const { queryByText } = render(fakeComponent);

    await waitFor(() => {
      expect(queryByText('Показать еще отзывы'));
    });
  });
});
