import { Link } from 'react-router-dom';
import { generatePath } from 'react-router-dom';

import Rating from '../rating/rating';

import { Product } from '../../types/product';
import { getPriceWithSpace } from '../../utils/utils';

interface ProductCardProps {
  guitar: Product;
}

function ProductCard({ guitar }: ProductCardProps): JSX.Element {
  const link = generatePath('/product/:id', { id: `${guitar.id}` });

  const { name, rating, price, previewImg, comments } = guitar;

  return (
    <div className="product-card">
      <img src={`../../${previewImg}`} width="75" height="190" alt={name} />
      <div className="product-card__info">
        <Rating rating={rating} className={'product-card__rate'} currentPosition={'catalog'} comments={comments} />

        <p className="product-card__title">{name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>
          {getPriceWithSpace(price)} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <Link className="button button--mini" to={link}>
          Подробнее
        </Link>
        <a className="button button--red button--mini button--add-to-cart" href="/">
          Купить
        </a>
      </div>
    </div>
  );
}

export default ProductCard;
