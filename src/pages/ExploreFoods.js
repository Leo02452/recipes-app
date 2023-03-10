import React, { useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import NewHeader from '../components/NewHeader';
import contextGlobal from '../context';
import ContainerExploreFoods from '../styles/ExploreFoods';

function ExploreFoods() {
  const { handleRandom, resultsRandomFoods } = useContext(contextGlobal);
  return (
    <div>
      <NewHeader name="Explore Foods" />
      <ContainerExploreFoods>
        <Link
          to="/explore/foods/ingredients"
          data-testid="explore-by-ingredient"
        >
          By Ingredient
        </Link>
        <Link
          to="/explore/foods/nationalities"
          data-testid="explore-by-nationality"
        >
          By Nationality
        </Link>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ () => handleRandom('/explore/foods') }
        >
          Surprise me!
        </button>

        {
          resultsRandomFoods && resultsRandomFoods.map((food, index) => {
            const { idMeal } = food;
            return (
              <Redirect
                key={ index }
                to={ `/foods/${idMeal}` }
              />
            );
          })
        }
      </ContainerExploreFoods>
      <Footer />
    </div>
  );
}

export default ExploreFoods;
