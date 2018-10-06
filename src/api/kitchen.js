import axios from 'axios'

const getRecipes = () => {
  return axios.get('http://localhost:8080/recipes.json');
}

const getIngredients = () => {
  return axios.get('http://localhost:8080/ingredients.json');
}


export default {
  getAvailable (cb) {
    axios.all(
      [getRecipes(), getIngredients()]
    )
    .then(axios.spread((recipes, ingredients) => {
      cb(recipes.data.recipes,ingredients.data.ingredients)
    }));
  },
}