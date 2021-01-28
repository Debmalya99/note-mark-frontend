<template>
  <div id="main" class="container">
    
    <note-editor class="column"/>
    
  </div>
</template>

<script>

import NoteEditor from '../components/NoteEditor.vue';


export default {
    name:'EditNote',
    components:{
        NoteEditor,
        
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Orbitron&display=swap');
#main {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* color:white; */
  /* background-color:black; */
  /* margin-top: 60px; */
}

*{
  margin:0px;
}

.btn{
  margin: 10px;
  outline: 0px;
}


::-webkit-scrollbar {
 width: 13px;
 height: 13px;
}
::-webkit-scrollbar-thumb {
 background: #c7ceff;
 border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover{
 background: #6771b8;
}
::-webkit-scrollbar-track{
 background: #ffffff;
 border-radius: 10px;
}

</style>