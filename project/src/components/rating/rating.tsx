import { Comment } from '../../types/comment';
import { RatingLabelMap } from '../../utils/const';
import { checkIsFull, stars } from '../../utils/utils';

interface RatingProps {
  rating: number;
  className: string;
  currentPosition: string;
  comments?: Comment[];
}

interface StarSize {
  [key: string]: { width: number; height: number };
}

function Rating({
  rating,
  className,
  currentPosition,
  comments,
}: RatingProps): JSX.Element {
  const starSize: StarSize = {
    catalog: { width: 12, height: 11 },
    product: { width: 14, height: 14 },
    reviews: { width: 16, height: 16 },
  };

  return (
    <div className={`rate ${className}`}>
      {stars.map((number) => {
        return (
          <svg
            width={starSize[currentPosition].width}
            height={starSize[currentPosition].height}
            aria-hidden="true"
            key={number}
          >
            <use xlinkHref={checkIsFull(rating, number)} />
          </svg>
        );
      })}
      <p className="visually-hidden">{`Рейтинг: ${
        RatingLabelMap[Math.ceil(rating)]
      }`}</p>
      {(currentPosition === "product" || currentPosition === "catalog") && (
        <p className="rate__count">
          <span className="visually-hidden">Всего оценок:</span>
          {comments?.length}
        </p>
      )}
    </div>
  );
}

export default Rating;
