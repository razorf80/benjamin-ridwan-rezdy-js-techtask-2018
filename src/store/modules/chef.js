import kitchen from '../../api/kitchen'
import {todayDate} from '../../util/Date'

// initial state
const state = {
  recipes: [],
  ingredients: [],
}

// getters
export const getters = {
  
  ingredientsAvailable: (state) => {
    return state.ingredients.reduce((obj,ingredient) => {
      const useBy = new Date(ingredient['use-by']);
      if( useBy >= todayDate() )obj[ingredient.title] = ingredient;
      return obj;
    }, {});
  },
  recipesAvailable: (state, getters) => {
    const ingredientsObj = getters.ingredientsAvailable;
    return state.recipes
      .filter((recipe)=>{
        recipe.passBestBefore=false
        return recipe.ingredients.every((ingredient) => {
          let ingredientInfo = ingredientsObj[ingredient];
          if(ingredientInfo){
            let bestBefore = new Date(ingredientInfo['best-before']);
            if(todayDate() > bestBefore)recipe.passBestBefore = true;
          }
          return ingredientInfo !== undefined;
        })
      })
      .sort((a,b) => {
        if(a.passBestBefore && !b.passBestBefore) return 1;
        return -1;
      });
  },
}

// actions
export const actions = {
  getAvailableFood ({ commit }) {
    kitchen.getAvailable((recipes, ingredients) => {
      commit('setRecipes', recipes)
      commit('setIngredients', ingredients)
    })
  },
}

// mutations
export const mutations = {
  setRecipes (state, recipes) {
    state.recipes = recipes
  },

  setIngredients (state, ingredients) {
    state.ingredients = ingredients
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}