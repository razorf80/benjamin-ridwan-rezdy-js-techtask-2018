import axios from 'axios'

const getRecipes = () => {
  return axios.get('/recipes.json');
}

const getIngredients = () => {
  return axios.get('/ingredients.json');
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