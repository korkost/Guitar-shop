import { Link } from 'react-router-dom';
import CatalogList from '../../components/catalog-list/catalog-list';

function Catalog(): JSX.Element {
  return (
    <div className="container">
      <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
      <ul className="breadcrumbs page-content__breadcrumbs">
        <li className="breadcrumbs__item">
          <Link className="link" to="/">
            Главная
          </Link>
        </li>
        <li className="breadcrumbs__item">
          <Link className="link" to="/">
            Каталог
          </Link>
        </li>
      </ul>

      <CatalogList />
    </div>
  );
}

export default Catalog;