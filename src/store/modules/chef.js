import kitchen from '../../api/kitchen'

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
      if( useBy > Date.now() )obj[ingredient.title] = ingredient;
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
            if(Date.now() > bestBefore)recipe.passBestBefore = true;
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
const actions = {
  getAvailableFood ({ commit }) {
    kitchen.getAvailable((recipes, ingredients) => {
      commit('setRecipes', recipes)
      commit('setIngredients', ingredients)
    })
  },
}

// mutations
const mutations = {
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