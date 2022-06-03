import { Comment } from '../../types/comment';
import { formatDate } from '../../utils/utils';
import Rating from '../rating/rating';

interface ReviewProps {
  currentComment: Comment;
}

function Review({ currentComment }: ReviewProps): JSX.Element {
  const { userName, rating, comment, createAt, advantage, disadvantage } =
    currentComment;

  return (
    <div className="review">
      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser">
          {userName}
        </h4>
        <span className="review__date">{formatDate(createAt)}</span>
      </div>
      <Rating rating={rating} className={"review__rating-panel"} currentPosition={"reviews"} />
      <h4 className="review__title title title--lesser">Достоинства:</h4>
      <p className="review__value">{advantage}</p>
      <h4 className="review__title title title--lesser">Недостатки:</h4>
      <p className="review__value">{disadvantage}</p>
      <h4 className="review__title title title--lesser">Комментарий:</h4>
      <p className="review__value">{comment}</p>
    </div>
  );
}

export default Review;
