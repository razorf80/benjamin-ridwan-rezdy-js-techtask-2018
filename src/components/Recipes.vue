<template>
  <div class="recipe-grid">
    <div 
      class="recipe-card"
      v-for="recipe in recipesAvailable"
      :key="recipe.title">
      <h3>{{recipe.title}}</h3>
      <ul>
        <li 
          v-for="ingredient in recipe.ingredients"
          :key="ingredient">
          {{ingredient}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Recipes',
  computed: {
    ...mapGetters('chef', {
      recipesAvailable: 'recipesAvailable',
    })
  },
  created () {
    this.$store.dispatch('chef/getAvailableFood')
  }
}
</script>

<style>
  .recipe-grid{
    display:flex;
    flex-wrap: wrap;
  }
  h3{
    font-size: 16px;
  }
  .recipe-card {
    border: 1px solid black;
    padding: 5px;
    margin: 5px;
    flex-grow:1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
</style>