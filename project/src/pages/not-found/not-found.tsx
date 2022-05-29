import { useNavigate } from 'react-router-dom';

import styles from './not-found.module.css';

function NotFound(): JSX.Element {
  const navigate = useNavigate();

  return (
    <section className={styles.content}>
      <h1 className={`title ${styles.title}`}>Простите, такой страницы у нас нет</h1>
      <p className={`title title--big ${styles.description}`}>
        Попробуйте перейти на другую страницу или вернуться на шаг назад
      </p>
      <div className={styles.button_group}>
        <button onClick={() => navigate('/', { replace: true })} className="button button--medium">
          На главную
        </button>
        <button onClick={() => navigate(-1)} className="button button--medium">
          Назад
        </button>
      </div>
    </section>
  );
}

export default NotFound;
