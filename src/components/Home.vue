<template>
  <button v-on:click="onClick">
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