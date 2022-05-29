import styles from './catalog-list-empty.module.css';

function CatalogListEmpty(): JSX.Element {
  return (
    <div className={styles.container}>
      <p className={styles.description}>Тут должны быть наши гитары, но что-то пошло не так</p>
      <p className={styles.recommendation}>Попробуйте обновите страницу</p>
    </div>
  );
}

export default CatalogListEmpty;
