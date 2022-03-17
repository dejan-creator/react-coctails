import logo from './logo.svg';
import './App.css';
import Cocktails from './Components/Cocktails';
import React, { useState } from 'react';
import SearchBar from './Components/SearchBar';

function App() {
  const [searchResult, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`;

  // const filteredCocktails = searchValue ? 
  //   cocktails.filter(u => u.cocktails.toUpperCase().indexOf(searchValue.toUpperCase()) > -1)
  // : cocktails;

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const fetchData = async () => {
    const resp = await fetch(url);
    const result = await resp.json();
    console.log(result);
    result && result.drinks && setSearchResults(result.drinks);
  }

  const fetchMoreData = async (id) => {
    const datailUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}` ;
    const resp = await fetch(datailUrl);
    const result = await resp.json();
    }

  const fetchIngredient = async (name) => {
    const ingUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${name}`;
    const resp = await fetch(ingUrl);
    const result = await resp.json();
    console.log(result);
    // // condition to check if I got results, if there are any ingredients inside the object of results and if the ingredients has any length so I can access its first property
    result && 
      result.ingredients && 
      // check that the array is not empty
      !!result.ingredients.length && 
      setSelectedIngredient(result.ingredients[0]);
  }
  
  return (
    <div className="App">
      <SearchBar
      setSearchValue={setSearchValue} 
      fetchData={fetchData} />

      {searchResult.map(drink => {
        console.log(Object.entries(drink));
        const ingredients = Object.keys(drink).filter(key => key.indexOf('strIng') > -1)
        .reduce((obj, key) => {
          return {
            ...obj, [key]: drink[key]
          };
        }, {});

  return (
        <div key={drink.strDrink}>
          <h2 onClick={() => fetchMoreData(drink.strDrink)}>{drink.strDrink}</h2>

        <h3>Ingredients:</h3>
        {Object.entries(ingredients).map(([key, value]) => (
          <p onClick={() => fetchIngredient(value)}>{value}</p>
        ))}
        {selectedIngredient && 
          <p>
            {selectedIngredient.strDescription}
          </p>
        }
      </div>
      )
    })}
    </div>
  );
}

export default App;
