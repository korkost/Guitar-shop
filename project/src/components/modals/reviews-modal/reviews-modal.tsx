import {
  ChangeEvent,
  FormEvent,
  Fragment,
  useLayoutEffect,
  useRef,
  useState
} from 'react';

import cn from 'classnames';
import Spinner from '../../spinner/spinner';
import { changeReviewModalActive } from '../../../store/app-slice/app-slice';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import {
  selectSendCommentStatus,
  sendCommentAction
} from '../../../store/comments-slice/comments-slice';
import { selectGuitar } from '../../../store/guitars-slice/guitars-slice';
import { FetchStatus, RatingLabelMap } from '../../../utils/const';
import styles from './reviews-modal.module.css';

const REG_EXP_NAME = /^[аА-яЯaA-zZ'][аА-яЯaA-zZ -' ]+[аА-яЯaA-zZ']?$/i;
const REG_EXP_RATING = /[1-5]/;
const REG_EXP_TEXT = /[аА-яЯaA-zZ]{3}/i;

interface LoginField {
  value: string;
  regexp: RegExp;
  error: boolean;
  errorText: string;
}

type InitialState = { [key: string]: LoginField };

function ReviewsModal(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const guitar = useAppSelector(selectGuitar);
  const sendCommentStatus = useAppSelector(selectSendCommentStatus);
  const inputFocus = useRef<HTMLInputElement | null>(null);

  const [formState, setFormState] = useState<InitialState>({
    name: {
      value: '',
      regexp: REG_EXP_NAME,
      error: false,
      errorText: 'Заполните поле',
    },
    rating: {
      value: '0',
      regexp: REG_EXP_RATING,
      error: false,
      errorText: 'Поставьте оценку',
    },
    advantage: {
      value: '',
      regexp: REG_EXP_TEXT,
      error: false,
      errorText: 'Заполните поле',
    },
    disadvantage: {
      value: '',
      regexp: REG_EXP_TEXT,
      error: false,
      errorText: 'Заполните поле',
    },
    comment: {
      value: '',
      regexp: REG_EXP_TEXT,
      error: false,
      errorText: 'Заполните поле',
    },
  });

  useLayoutEffect(() => {
    inputFocus.current?.focus();
  }, []);

  if (!guitar) {
    return null;
  }

  const { name, id } = guitar;
  const ratingLabelMapRevers: [string, string][] = Object.entries(RatingLabelMap);

  const isValid = Object.values(formState).some(({ error }) => error);
  const isFormDisabled = sendCommentStatus === FetchStatus.Pending;

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = evt.target;

    const regExp = formState[name].regexp;
    const isValid = regExp.test(value);

    setFormState((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        error: !isValid,
        value,
      },
    }));
  };

  const handleModalClose = () => {
    dispatch(changeReviewModalActive(false));
    document.body.style.overflow = 'auto';
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (formState.rating.value === '0') {
      formState.rating.error = true;
    }

    const data = {
      guitarId: id,
      userName: formState.name.value,
      advantage: formState.advantage.value,
      disadvantage: formState.disadvantage.value,
      comment: formState.comment.value,
      rating: Number(formState.rating.value),
    };

    dispatch(sendCommentAction(data));
  };

  return (
    <div className="modal__content">
      <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
      <h3 className="modal__product-name title title--medium-20 title--uppercase">{name}</h3>
      <form className="form-review" name="form-review" onSubmit={handleSubmit}>
        <div className={cn('form-review__wrapper', { [styles.input_mb]: !formState.name.error })}>
          <div className="form-review__name-wrapper">
            <label className="form-review__label form-review__label--required" htmlFor="user-name">
              Ваше Имя
            </label>
            <input
              onChange={handleInputChange}
              ref={inputFocus}
              className="form-review__input form-review__input--name"
              id="user-name"
              type="text"
              autoComplete="off"
              name="name"
              value={formState.name.value}
              required
              disabled={isFormDisabled}
            />
            {formState.name.error && <p className="form-review__warning">{formState.name.errorText}</p>}
          </div>
          <div>
            <span className="form-review__label form-review__label--required">Ваша Оценка</span>
            <div className={styles['rate']}>
              {ratingLabelMapRevers.map(([value, title]) => (
                <Fragment key={title}>
                  <input
                    onChange={handleInputChange}
                    className={`visually-hidden ${styles['rate__input']}`}
                    id={`star-${value}`}
                    name="rating"
                    type="radio"
                    value={value}
                    checked={value === formState.rating.value}
                    required
                    disabled={isFormDisabled}
                  />
                  <label className={styles['rate__label']} htmlFor={`star-${value}`} title={title} />
                </Fragment>
              ))}

              {formState.rating.error && <p className="rate__message">{formState.rating.errorText}</p>}
              <div className={styles['rate__focus']} />
            </div>
          </div>
        </div>
        <label className="form-review__label form-review__label--required" htmlFor="adv">
          Достоинства
        </label>
        <input
          onChange={handleInputChange}
          className={cn('form-review__input', [styles.input_mb], {
            [styles.input_mb_error]: formState.advantage.error,
          })}
          id="adv"
          type="text"
          autoComplete="off"
          name="advantage"
          value={formState.advantage.value}
          required
          disabled={isFormDisabled}
        />
        {formState.advantage.error && <p className="form-review__warning">{formState.advantage.errorText}</p>}

        <label className="form-review__label form-review__label--required" htmlFor="disadv">
          Недостатки
        </label>
        <input
          onChange={handleInputChange}
          className={cn('form-review__input', {
            [styles.input_mb]: !formState.disadvantage.error,
          })}
          id="disadv"
          type="text"
          autoComplete="off"
          name="disadvantage"
          value={formState.disadvantage.value}
          required
          disabled={isFormDisabled}
        />
        {formState.disadvantage.error && (
          <p className={cn('form-review__warning', { [styles.input_mb_error]: formState.disadvantage.error })}>
            {formState.disadvantage.errorText}
          </p>
        )}

        <label className="form-review__label form-review__label--required" htmlFor="comment">
          Комментарий
        </label>
        <textarea
          onChange={handleInputChange}
          className={cn('form-review__input', 'form-review__input--textarea', {
            [styles.input_mb]: !formState.comment.error,
          })}
          id="comment"
          rows={10}
          autoComplete="off"
          name="comment"
          value={formState.comment.value}
          required
          disabled={isFormDisabled}
        />
        {formState.comment.error && (
          <p className={cn('form-review__warning', { [styles.input_mb_error]: formState.comment.error })}>
            {formState.comment.errorText}
          </p>
        )}

        <button
          className="button button--medium-20 form-review__button"
          type="submit"
          disabled={isValid || isFormDisabled}>
          {isFormDisabled ? <Spinner className="spinner--small" /> : 'Отправить отзыв'}
        </button>
      </form>
      <button onClick={handleModalClose} className="modal__close-btn button-cross" type="button" aria-label="Закрыть">
        <span className="button-cross__icon" />
        <span className="modal__close-btn-interactive-area" />
      </button>
    </div>
  );
}

export default ReviewsModal;
