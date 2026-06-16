import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { toggleFavoriteAction } from '../../store/action';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAuthorizationStatus } from '../../store/selectors';

type FavoriteButtonProps = {
  offerId: string;
  isFavorite: boolean;
  buttonClassName?: string;
  iconClassName?: string;
  iconWidth?: string;
  iconHeight?: string;
};

function FavoriteButton({
  offerId,
  isFavorite,
  buttonClassName = 'place-card__bookmark-button button',
  iconClassName = 'place-card__bookmark-icon',
  iconWidth = '18',
  iconHeight = '19',
}: FavoriteButtonProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const handleClick = useCallback(() => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate('/login');
      return;
    }

    dispatch(toggleFavoriteAction(offerId, isFavorite));
  }, [authorizationStatus, dispatch, isFavorite, navigate, offerId]);

  return (
    <button
      className={`${buttonClassName}${isFavorite ? ' place-card__bookmark-button--active' : ''}`}
      type="button"
      onClick={handleClick}
    >
      <svg className={iconClassName} width={iconWidth} height={iconHeight}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

export default memo(FavoriteButton);
