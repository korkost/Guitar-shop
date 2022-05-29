import { render, waitFor, cleanup } from '@testing-library/react';

import Filter from './filter';

const fakeComponent = <Filter />;

describe('component: Filter', () => {
  afterEach(cleanup);

  it('should render correctly', async () => {
    const { getByText, getByRole } = render(fakeComponent);

    await waitFor(() => {
      expect(getByText(/Фильтр/i));
      expect(getByText(/Цена, ₽/i));
      expect(getByText(/Тип гитар/i));
      expect(getByText(/Количество струн/i));
      expect(getByRole('button')).toHaveTextContent(/Очистить/i);
    });
  });
});
