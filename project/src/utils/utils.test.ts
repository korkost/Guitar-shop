import {
  checkIsFull,
  adaptTypeToClient,
  formatDate,
  priceWithSpace
} from './utils';

import {
  GuitarTypeFromTheServer,
  GuitarTypeForClient
} from './const';

describe('Utils functions', () => {
  describe('check function checkIsFull', () => {
    it('function return correct answer when rating >= number', () => {
      expect(checkIsFull(4, 3)).toBe('#icon-full-star');
    });

    it('function return correct answer when rating < number', () => {
      expect(checkIsFull(1, 5)).toBe('#icon-star');
    });
  });

  describe('check function adaptTypeToClient', () => {
    it('function return correct answer', () => {
      expect(adaptTypeToClient(GuitarTypeFromTheServer.Ukulele)).toBe(GuitarTypeForClient.Ukulele);
    });

    it('function return default answer when type unknown', () => {
      expect(adaptTypeToClient('unknown')).toBe(GuitarTypeForClient.Unknown);
    });
  });

  describe('check function formatDate', () => {
    it('function return formated date', () => {
      expect(formatDate('2022-03-21T10:56:01.590Z')).toBe('21 марта');
    });

    it('function return correct answer when date incorrect', () => {
      expect(formatDate('bla-bla-bla')).toBe('Дата неизвестна');
    });
  });

  describe('check function priceWithSpace', () => {
    it('function return correct price with space', () => {
      expect(priceWithSpace(100000)).toBe('100 000');
    });
  });
});
