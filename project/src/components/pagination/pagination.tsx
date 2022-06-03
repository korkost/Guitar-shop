import { generatePath, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { selectFilteredGuitars } from '../../store/guitars-slice/guitars-slice';
import { AppRoute, MAX_NUMBER_OF_CARDS, START_PAGE_NUMBER } from '../../utils/const';
import { changeActivePageNumber } from '../../store/app-slice/app-slice';

function Pagination(): JSX.Element {
  const { number } = useParams();
  const dispatch = useAppDispatch();
  const guitarsCount = useAppSelector(selectFilteredGuitars).length;
  const currentPageNumber = Number(number);

  const numberOfPages = Math.ceil(guitarsCount! / MAX_NUMBER_OF_CARDS);
  const paginationLinks = Array.from({ length: numberOfPages }, (v, k) => k + 1);

  const prevBtnValue = currentPageNumber - 1;
  const nextBtnValue = currentPageNumber + 1;
  const prevPath = generatePath(`${AppRoute.Catalog}/page_:number`, { number: `${prevBtnValue}` });
  const nextPath = generatePath(`${AppRoute.Catalog}/page_:number`, { number: `${nextBtnValue}` });

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {START_PAGE_NUMBER !== currentPageNumber && (
          <li className="pagination__page pagination__page--prev" id="prev">
            <Link
              className="link pagination__page-link"
              to={prevPath}
              onClick={() => {
                dispatch(changeActivePageNumber(prevBtnValue));
              }}>
              Назад
            </Link>
          </li>
        )}

        {paginationLinks.map((linkNumber) => {
          const path = generatePath(`${AppRoute.Catalog}/page_:number`, { number: `${linkNumber}` });

          return (
            <li
              className={cn('pagination__page', { 'pagination__page--active': currentPageNumber === linkNumber })}
              key={linkNumber}>
              <Link
                className="link pagination__page-link"
                to={path}
                onClick={() => dispatch(changeActivePageNumber(linkNumber))}>
                {linkNumber}
              </Link>
            </li>
          );
        })}

        {numberOfPages !== currentPageNumber && (
          <li className="pagination__page pagination__page--next" id="next">
            <Link
              className="link pagination__page-link"
              to={nextPath}
              onClick={() => {
                dispatch(changeActivePageNumber(nextBtnValue));
              }}>
              Далее
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Pagination;
