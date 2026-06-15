import { useState } from 'react';
import classNames from 'classnames';
import { SORT_OPTIONS, SortType } from '../../utils/sorting';

type SortOptionsProps = {
  activeSorting: SortType;
  onSortingChange: (sorting: SortType) => void;
};

function SortOptions({ activeSorting, onSortingChange }: SortOptionsProps): JSX.Element {
  const [isOpened, setIsOpened] = useState(false);

  const handleSortingTypeClick = () => {
    setIsOpened((isOpen) => !isOpen);
  };

  const handleOptionClick = (sorting: SortType) => {
    onSortingChange(sorting);
    setIsOpened(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleSortingTypeClick}
      >
        {activeSorting}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={classNames('places__options', 'places__options--custom', {
          'places__options--opened': isOpened,
        })}
      >
        {SORT_OPTIONS.map((sorting) => (
          <li
            key={sorting}
            className={classNames('places__option', {
              'places__option--active': sorting === activeSorting,
            })}
            tabIndex={0}
            onClick={() => handleOptionClick(sorting)}
          >
            {sorting}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortOptions;
