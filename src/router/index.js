import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import Recipes from '../components/Recipes'

Vue.use(VueRouter)

export const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/recipes',
      name: 'Recipes',
      component: Recipes
    }
  ]
})