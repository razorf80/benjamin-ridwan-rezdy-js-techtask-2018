import kitchen from '../../api/kitchen'

// initial state
const state = {
  recipes: [],
  ingredients: [],
}

// getters
const getters = {
  recipesAvailable: (state) => {
    return state.recipes;
  },
}

// actions
const actions = {
  getAvailableFood ({ commit }) {
    kitchen.getAvailable((recipes, ingredients) => {
      commit('setRecipes', recipes)
      commit('setIngredients', ingredients)
    })
  }
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