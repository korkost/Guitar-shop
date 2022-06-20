import qs from 'query-string';
import {
  GuitarTypeFromTheServer,
  GuitarTypeForClient,
  FAKE_ARRAY_LENGTH,
  MAX_NUMBER_OF_CARDS
} from './const';
import { mockProduct } from './mock';
import { Query } from '../types/query';

export const stars = Array.from({ length: 5 }, (v, k) => k + 1);

export const mockProducts = Array.from({ length: FAKE_ARRAY_LENGTH }, () => mockProduct);

export const checkIsFull = (rating: number, number: number) => (rating >= number ? '#icon-full-star' : '#icon-star');

export const adaptTypeToClient = (type: string) => {
  switch (type) {
    case GuitarTypeFromTheServer.Acoustic:
      return GuitarTypeForClient.Acoustic;
    case GuitarTypeFromTheServer.Electric:
      return GuitarTypeForClient.Electric;
    case GuitarTypeFromTheServer.Ukulele:
      return GuitarTypeForClient.Ukulele;
    default:
      return GuitarTypeForClient.Unknown;
  }
};

export const formatDate = (date: string) => {
  if (isNaN(Date.parse(date))) {
    return 'Дата неизвестна';
  }

  return new Date(date).toLocaleString('ru', { month: 'long', day: 'numeric' });
};

export const getPriceWithSpace = (number: number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

export const createQueryByPage = (activePageNumber?: number) => {
  const endLimit = activePageNumber ? activePageNumber * MAX_NUMBER_OF_CARDS : MAX_NUMBER_OF_CARDS;
  const startLimit = endLimit - MAX_NUMBER_OF_CARDS;

  return qs.stringify(
    {
      _start: startLimit,
      _end: endLimit,
    },
    { skipNull: true, skipEmptyString: true },
  );
};

export const createQuery = ({ activePageNumber}: Query) => {
  const page = createQueryByPage(activePageNumber);

  return [page].filter((currentQuery) => currentQuery !== '').join('&');
};
