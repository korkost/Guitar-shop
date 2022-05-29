import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { render, waitFor, cleanup } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';

import App from './app';
import HistoryRouter from '../history-router/history-router';

import { AppRoute } from '../../utils/const';
import { mockComment, mockGuitar, mockProduct } from '../../utils/mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const store = mockStore({
  App: {},
  Comments: {
    comments: [mockComment],
  },
  Guitars: {
    guitars: [mockProduct],
    guitar: mockGuitar,
  },
});

const fakeComponent = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('App routing', () => {
  afterEach(cleanup);

  it('should render Catalog page when user navigate to "/catalog/page_1"', async () => {
    history.push(`${AppRoute.Catalog}/page_1`);

    const { getByText } = render(fakeComponent);

    await waitFor(() => {
      expect(getByText(/Каталог гитар/i)).toBeInTheDocument();
      expect(getByText(/Фильтр/i)).toBeInTheDocument();
      expect(getByText(/Сортировать:/i)).toBeInTheDocument();
    });
  });

  it('should render Produce page when user navigate to "/product/id"', async () => {
    history.push(`${AppRoute.Product}/1`);

    const { getByText } = render(fakeComponent);

    await waitFor(() => {
      expect(getByText(/Цена:/i)).toBeInTheDocument();
      expect(getByText(/₽/i)).toBeInTheDocument();
      expect(getByText(/Добавить в корзину/i)).toBeInTheDocument();
    });
  });

  it('should render NotFound page when user navigate to unknown route', async () => {
    history.push('/unknown');

    const { getByText } = render(fakeComponent);

    await waitFor(() => {
      expect(getByText(/Простите, такой страницы у нас нет/i)).toBeInTheDocument();
      expect(getByText(/Попробуйте перейти на другую страницу или вернуться на шаг назад/i)).toBeInTheDocument();
    });
  });
})
