import { image, lorem, name } from 'faker';
import { Comment, SendComment } from '../types/comment';
import { Guitar } from '../types/guitar';
import { Product } from '../types/product';

export const mockGuitar: Guitar = {
  id: 1,
  name: name.findName(),
  vendorCode: 'qwerty123',
  type: lorem.word(),
  description: lorem.sentence(),
  previewImg: image.imageUrl(),
  stringCount: 6,
  rating: 5,
  price: 1234,
};

export const mockComment: Comment = {
  id: '123',
  userName: name.findName(),
  advantage: lorem.sentence(),
  disadvantage: lorem.sentence(),
  comment: lorem.sentence(),
  rating: 5,
  createAt: '2022-03-21T10:56:01.590Z',
  guitarId: 31,
};

export const mockSendComment: SendComment = {
  guitarId: 31,
  userName: lorem.sentence(),
  advantage: lorem.sentence(),
  disadvantage: lorem.sentence(),
  comment: lorem.sentence(),
  rating: 4,
};

export const mockProduct: Product = {
  id: 1,
  name: name.findName(),
  vendorCode: 'qwerty123',
  type: lorem.word(),
  description: lorem.sentence(),
  previewImg: image.imageUrl(),
  stringCount: 6,
  rating: 5,
  price: 1234,
  comments: [mockComment],
};
