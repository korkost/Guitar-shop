import { render, waitFor, getByLabelText } from '@testing-library/react';

import Footer from './footer';

const fakeComponent = <Footer />;

describe('component: Footer', () => {
  it('should render correctly', async () => {
    const { getByText, container } = render(fakeComponent);

    await waitFor(() => {
      expect(getByText(/О нас/i));
      expect(getByText(/Информация/i));
      expect(getByText(/Контакты/i));

      expect(getByLabelText(container, /skype/i));
      expect(getByLabelText(container, /vsco/i));
      expect(getByLabelText(container, /pinterest/i));
    });
  });
});
