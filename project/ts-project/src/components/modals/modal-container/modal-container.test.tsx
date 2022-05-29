import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import ModalContainer from './modal-container';

const mockStore = configureMockStore();

const store = mockStore({
  App: {},
  Comments: {},
  Guitars: {},
});

const fakeComponent = (
  <Provider store={store}>
    <MemoryRouter>
      <ModalContainer className={''} children={null} />
    </MemoryRouter>
  </Provider>
);

describe('component: ModalContainer', () => {
  it('should render correctly', async () => {
    const { container } = render(fakeComponent);

    await waitFor(() => {
      expect(container.firstChild).toHaveClass('modal is-active');
    });
  });
});
