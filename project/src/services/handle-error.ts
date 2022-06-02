import request, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

const enum HttpCode {
  BadRequest = 400,
  NotFound = 404,
}

export const handleError = (error: AxiosError): void => {
  if (!request.isAxiosError(error)) {
    throw new Error(`${error}`);
  }

  const { response } = error;

  if (response) {
    switch (response.status) {
      case HttpCode.BadRequest:
        toast.info("Неверный синтаксис запроса");
        break;
      case HttpCode.NotFound:
        toast.error("Ресурс не найден. Попробуйте ещё раз!");
        break;
      default:
        toast.error(
          "Ошибка сервера или неизвестная ошибка. Попробуйте ещё раз!"
        );
    }
  }
};
