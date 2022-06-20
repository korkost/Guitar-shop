import { useState } from 'react';
import cn from 'classnames';

import { adaptTypeToClient } from '../../utils/utils';

interface TabsProps {
  vendorCode: string;
  type: string;
  stringCount: number;
  description: string;
}

function Tabs({ vendorCode, type, stringCount, description }: TabsProps): JSX.Element {
  const [activeTab, setActiveTab] = useState({
    characteristics: true,
    description: false,
  });

  const handleTabButtonClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();

    if (evt.currentTarget.id === 'characteristics') {
      setActiveTab({
        characteristics: true,
        description: false,
      });
    }

    if (evt.currentTarget.id === 'description') {
      setActiveTab({
        characteristics: false,
        description: true,
      });
    }
  };

  return (
    <div className="tabs">
      <a
        onClick={handleTabButtonClick}
        className={cn('button button--medium', 'tabs__button', { 'button--black-border': !activeTab.characteristics })}
        href="/"
        id="characteristics">
        Характеристики
      </a>
      <a
        onClick={handleTabButtonClick}
        className={cn('button button--medium', 'tabs__button', { 'button--black-border': !activeTab.description })}
        href="/"
        id="description">
        Описание
      </a>
      <div className="tabs__content">
        {activeTab.characteristics && (
          <table className="tabs__table">
            <tbody>
              <tr className="tabs__table-row">
                <td className="tabs__title">Артикул:</td>
                <td className="tabs__value">{vendorCode}</td>
              </tr>
              <tr className="tabs__table-row">
                <td className="tabs__title">Тип:</td>
                <td className="tabs__value">{adaptTypeToClient(type)}</td>
              </tr>
              <tr className="tabs__table-row">
                <td className="tabs__title">Количество струн:</td>
                <td className="tabs__value">{stringCount} струнная</td>
              </tr>
            </tbody>
          </table>
        )}
        {activeTab.description && <p className="tabs__product-description">{description}</p>}
      </div>
    </div>
  );
}

export default Tabs;
