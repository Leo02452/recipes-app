import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import contextGlobal from '.';
import {
  getFavorites,
  removeFavorites, saveFavorites,
} from '../helpers/favoritesRecipes';

const filterFirstLetter = 'First letter';
const filterName = 'Name';
const filterIngredient = 'Ingredient';
function Provider({ children }) {
  const [foodsRecipes, setFoodsRecipes] = useState([]);
  const [resultsFoods, setResultsFoods] = useState([]);
  const [resultsDrinks, setResultsDrinks] = useState([]);
  const [oneRecipes, setOneRecipes] = useState([]);
  const [drinksRecipes, setDrinksRecipes] = useState([]);
  const [foodsCategory, setFoodsCategory] = useState([]);
  const [drinksCategory, setDrinksCategory] = useState([]);
  const [count, setCount] = useState(1);
  const [disabledInput, setDisabledInput] = useState(true);
  const [resultsFilterFoods, setResultsFilterFoods] = useState([]);
  const [resultsFilterDrinks, setResultsFilterDrinks] = useState([]);
  const [resultsRandomFoods, setResultsRandomFoods] = useState([]);
  const [resultsRandomDrinks, setResultsRandomDrinks] = useState([]);
  const [progressRecipe, setProgressRecipe] = useState([]);
  const [allFavoritesRecipes, setAllFavoritesRecipes] = useState([]);
  const [filteredFavoritesRecipes, setFilteredFavoritesRecipes] = useState([]);
  const toogleInput = () => {
    if (count === 1) {
      setDisabledInput(false);
      setCount(2);
    } if (count === 2) {
      setDisabledInput(true);
      setCount(1);
    }
  };

  const getFoods = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const dataJson = await response.json();
    const foods = dataJson && dataJson.meals;
    setResultsFoods(foods);
  };
  const getDrinks = async () => {
    const responseDrinks = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await responseDrinks.json();
    const drinks = data && data.drinks;
    setResultsDrinks(drinks);
  };
  useEffect(() => {
    getFoods();
    getDrinks();
  }, []);
  useEffect(() => {
    const getCategoryFoods = async () => {
      const responseCategory = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const dataCategory = await responseCategory.json();
      const categoryFoods = dataCategory && dataCategory.meals;
      setFoodsCategory(categoryFoods);
    };
    getCategoryFoods();
  }, []);
  useEffect(() => {
    const getCategoryDrinks = async () => {
      const responseCategoryDrinks = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const dataCategory = await responseCategoryDrinks.json();
      const categoryDrinks = dataCategory && dataCategory.drinks;
      setDrinksCategory(categoryDrinks);
    };
    getCategoryDrinks();
  }, []);
  const requisitionFoodsByIngredient = async (search) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`);
    const dataJson = await response.json();
    setFoodsRecipes(dataJson.meals);
  };
  const requisitionFoodsByName = async (search) => {
    const returnSearch = search;
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${returnSearch}`);
    const dataJson = await response.json();
    const foods = dataJson && dataJson.meals;
    if (!foods) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    if (foods.length === 1) return setOneRecipes(foods);
    if (foods.length > 1) return setFoodsRecipes(foods);
  };
  const requisitionFoodsByFirstLetter = async (search) => {
    const firstLetter = search.slice(0, 1);
    const URL = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
    const dataJson = await URL.json();
    setFoodsRecipes(dataJson.meals);
    if (search.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
  };

  const requisitionDrinksByIngredient = async (search) => {
    const responseDrinks = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`);
    const dataJsonDrinks = await responseDrinks.json();
    setDrinksRecipes(dataJsonDrinks.drinks);
  };

  const requisitionDrinksByName = async (search) => {
    const responseDrinks = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`);
    const dataJsonDrinks = await responseDrinks.json();
    const drinks = dataJsonDrinks && dataJsonDrinks.drinks;
    if (!drinks) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    if (drinks.length === 1) return setOneRecipes(drinks);
    if (drinks.length > 1) return setDrinksRecipes(drinks);
  };
  const requisitionDrinksByFirstLetter = async (search) => {
    const firstLetter = search.slice(0, 1);
    const URL = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);
    const dataJson = await URL.json();
    setDrinksRecipes(dataJson.drinks);
    if (search.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
  };

  const auxiliaryFunctionFoods = (typeSearch, search) => {
    if (typeSearch === filterIngredient) return requisitionFoodsByIngredient(search);
    if (typeSearch === filterName) return requisitionFoodsByName(search);
    if (typeSearch === filterFirstLetter) return requisitionFoodsByFirstLetter(search);
  };

  const auxiliaryFunctionDrinks = (typeSearch, search) => {
    if (typeSearch === filterIngredient) return requisitionDrinksByIngredient(search);
    if (typeSearch === filterName) return requisitionDrinksByName(search);
    if (typeSearch === filterFirstLetter) return requisitionDrinksByFirstLetter(search);
  };

  const foodFilter = async (callback, checking) => {
    const url = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${callback}`);
    const dataURL = await url.json();
    const food = dataURL && dataURL.meals;
    if (!checking) {
      setResultsFilterFoods(food);
    } else {
      setResultsFilterFoods(resultsFoods);
    }
  };
  const drinkFilter = async (callback, checking) => {
    const url = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${callback}`);
    const dataURL = await url.json();
    const drink = dataURL && dataURL.drinks;
    if (!checking) {
      setResultsFilterDrinks(drink);
    } else {
      setResultsFilterDrinks(resultsDrinks);
    }
  };
  const handleAllFilter = async (pathname) => {
    const urlAll = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const dataURLAll = await urlAll.json();
    const foodsList = dataURLAll && dataURLAll.meals;
    const urlAllDrinks = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const dataURLDrinks = await urlAllDrinks.json();
    const drinksList = dataURLDrinks && dataURLDrinks.drinks;
    if (pathname === '/foods') {
      setResultsFilterFoods(foodsList);
    } else {
      setResultsFilterDrinks(drinksList);
    }
  };
  const handleRandom = async (pathname) => {
    const urlRandomMeals = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const dataURLMeals = await urlRandomMeals.json();
    const mealsRandom = dataURLMeals && dataURLMeals.meals;
    const urlRandomDrinks = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const dataURLDrinks = await urlRandomDrinks.json();
    const drinksRandom = dataURLDrinks && dataURLDrinks.drinks;
    if (pathname === '/explore/foods') {
      setResultsRandomFoods(mealsRandom);
    } else {
      setResultsRandomDrinks(drinksRandom);
    }
  };
  const handleFavorites = (name, recipe, pageDetails) => {
    const isRecipeFavorite = allFavoritesRecipes
      .some((favoriteRecipe) => {
        const values = Object.values(favoriteRecipe).includes(name);
        return values;
      });
    console.log(isRecipeFavorite);
    if (isRecipeFavorite) {
      removeFavorites(name);
      const newFavoritesRecipes = getFavorites();
      setAllFavoritesRecipes(newFavoritesRecipes);
      setFilteredFavoritesRecipes(newFavoritesRecipes);
    } else {
      setAllFavoritesRecipes([...allFavoritesRecipes, recipe]);
      setFilteredFavoritesRecipes([...filteredFavoritesRecipes, recipe]);
      saveFavorites(recipe, pageDetails);
    }
  };
  const contextValue = { requisitionFoodsByIngredient,
    requisitionFoodsByName,
    requisitionFoodsByFirstLetter,
    requisitionDrinksByIngredient,
    requisitionDrinksByName,
    requisitionDrinksByFirstLetter,
    toogleInput,
    disabledInput,
    auxiliaryFunctionFoods,
    auxiliaryFunctionDrinks,
    foodsRecipes,
    drinksRecipes,
    resultsFoods,
    oneRecipes,
    foodsCategory,
    resultsDrinks,
    drinksCategory,
    foodFilter,
    drinkFilter,
    resultsFilterFoods,
    resultsFilterDrinks,
    getFoods,
    handleAllFilter,
    handleRandom,
    resultsRandomFoods,
    resultsRandomDrinks,
    progressRecipe,
    setProgressRecipe,
    allFavoritesRecipes,
    setAllFavoritesRecipes,
    filteredFavoritesRecipes,
    setFilteredFavoritesRecipes,
    handleFavorites,
  };
  return (
    <contextGlobal.Provider value={ contextValue }>
      {children}
    </contextGlobal.Provider>
  );
}
Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Provider;
