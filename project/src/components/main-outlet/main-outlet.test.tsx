import { Provider } from 'react-redux';
import { MemoryRouter, Navigate, Route, Routes } from 'react-router-dom';
import { cleanup, render, waitFor } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import MainOutlet from './main-outlet';

import { AppRoute } from '../../utils/const';

const mockStore = configureMockStore();

const store = mockStore({
  App: {},
  Comments: {},
  Guitars: {},
});

const fakeComponent = (
  <Provider store={store}>
    <MemoryRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<MainOutlet />}>
          <Route index element={<Navigate to={`${AppRoute.Main}/page_1`} replace />} />
          <Route path={`${AppRoute.Catalog}/page_:number`} element={<h1>catalog</h1>} />
        </Route>
      </Routes>
    </MemoryRouter>
  </Provider>
);

describe('component: MainOutlet', () => {
  afterEach(cleanup);

  it('should render correctly outlet', async () => {
    const { getByText } = render(fakeComponent);

    await waitFor(() => {
      expect(getByText(/Каталог/i)).toBeInTheDocument();
      expect(getByText(/Перейти в корзину/i)).toBeInTheDocument();
      expect(getByText(/О компании/i)).toBeInTheDocument();

      expect(getByText(/Магазин гитар, музыкальных инструментов и гитарная мастерская/i)).toBeInTheDocument();
      expect(getByText(/Информация/i)).toBeInTheDocument();
      expect(getByText(/Сервис-центры/i)).toBeInTheDocument();
    });
  });

  it('should render correctly inner component', async () => {
    const { getByText } = render(fakeComponent);

    await waitFor(() => {
      expect(getByText(/catalog/i)).toBeInTheDocument();
    });
  });
});
