import { useAppDispatch } from '../../hooks/hooks';
import { updateCommentsCounter } from '../../store/comments-slice/comments-slice';

function MoreButton(): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <button onClick={() => dispatch(updateCommentsCounter())} className="button button--medium reviews__more-button">
      Показать еще отзывы
    </button>
  );
}

export default MoreButton;