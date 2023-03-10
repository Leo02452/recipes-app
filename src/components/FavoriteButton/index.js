import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import contextGlobal from '../../context';
import { verifyIfIsFavorites, getFavorites } from '../../helpers/favoritesRecipes';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import ContainerFavoriteButton from './style';

function FavoriteButton({ name, recipe, pageDetails, isFavoritePage, index }) {
  const { handleFavorites,
    setAllFavoritesRecipes,
    setFilteredFavoritesRecipes,
  } = useContext(contextGlobal);
  const isFavoriteRecipe = verifyIfIsFavorites(name);

  useEffect(() => {
    const favoritesRecipes = getFavorites() || [];
    setAllFavoritesRecipes(favoritesRecipes);
    setFilteredFavoritesRecipes(favoritesRecipes);
  }, []);

  return (
    <ContainerFavoriteButton>
      <button
        type="button"
        onClick={ () => handleFavorites(name, recipe, pageDetails) }
      >
        <img
          data-testid={ isFavoritePage
            ? `${index}-horizontal-favorite-btn`
            : 'favorite-btn' }
          src={ isFavoriteRecipe
            ? blackHeartIcon : whiteHeartIcon }
          alt="Heart Icon"
        />
      </button>
    </ContainerFavoriteButton>
  );
}

FavoriteButton.defaultProps = {
  isFavoritePage: false,
  index: null,
  name: null,
};

FavoriteButton.propTypes = {
  name: PropTypes.string,
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  pageDetails: PropTypes.string.isRequired,
  isFavoritePage: PropTypes.bool,
  index: PropTypes.number,
};

export default FavoriteButton;
