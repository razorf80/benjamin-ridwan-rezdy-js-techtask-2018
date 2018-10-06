<template>
  <button class="btn-lunch" v-on:click="onClick">
    What's for lunch
  </button>
</template>

<script>
export default {
  name: 'Home',
  methods:{
    onClick: function(){
      this.$router.push({path:'/recipes'})
    }
  }
}
</script>

<style>
  .btn-lunch {
      background-color: red;
      border: none;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      cursor: pointer;
  }
</style>