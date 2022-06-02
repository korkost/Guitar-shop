import { GuitarTypeFromTheServer, GuitarTypeForClient, FAKE_ARRAY_LENGTH } from './const';
import { mockProduct } from './mock';

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

export const priceWithSpace = (number: number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
