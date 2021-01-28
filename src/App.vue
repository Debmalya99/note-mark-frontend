<template>
  <div id="nav" v-if="showRoutes" class="topbar">
    <h1><router-link to="/"> NOTE MARK</router-link></h1>
    <div class="options">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      
    </div>
    
  </div>
  <router-view/>
</template>

<script>


export default {
  name:'App',
  components:{},
  data(){
    return {
      showRoutes:true,
    }
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Orbitron&display=swap');
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: white;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.topbar{
    display: flex;
    color:white;
    background-color: #2c3e50;
    padding: 10px;
    /* width: 100%; */
    
}

.topbar h1{
  font-family: 'Orbitron', sans-serif;
  justify-content: center;
  
}



.options a{
  align-self: flex-end;
  color:white;
}
</style>
