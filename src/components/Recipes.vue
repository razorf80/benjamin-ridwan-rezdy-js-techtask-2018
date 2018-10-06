<template>
  <div>
    <div 
      v-for="recipe in recipesAvailable"
      :key="recipe.title">
      {{recipe.title}}
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