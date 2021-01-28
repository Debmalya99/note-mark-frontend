<template>
  <h1>Welcome user</h1>
  <h3>{{main}}</h3>
</template>

<script>
export default {
    name:'User',
    data(){
        return {
            main:null,
        }
    },
    beforeUpdate(){
        this.main = this.$route.params.id;
    }
}
</script>

<style>

</style>