<template>
  <input type="text" name="searchBar" id="" placeholder="Search for Notes by name or hashtag" v-model="searchString" @input="searchNotes" class="searchbar">
  <div class="home" v-if="searchString.trim() === ''">
    <h1>Create a new note</h1>
    <new-note-card/>
    <h1>All Notes:</h1>
    <p v-if="notes.length === 0">No notes present</p>
    <div class="card_container">
      
      <card v-for="(note,index) in notes" :key="note" :id="note" :name="note_names[index]"/>
    </div>  
  </div>
  <div v-else>
    <h1>Search Results:</h1>
    <div class="card_container">
    
    <card v-for="s in searchResults" :key="s" :id="s.id" :name="s.name"/>
  </div>
  </div>
  
  
  <router-view/>
  
</template>

<script>
// @ is an alias to /src
import Card from '../components/Card.vue';
import NewNoteCard from '../components/NewNoteCard.vue';
import axios from 'axios';
import host from '../misc/globals.js';

export default {
  name: 'Home',
  components: {
    Card,
    NewNoteCard,
    
  },
  data(){
    return {
      notes: [],
      note_names: [],
      searchString:'',
      searchResults:[],
    }
  },
  created(){
    document.title = 'Note Mark';
    axios.get(host.host+'getnotes').then(response=>{
      console.log(response.data['id']);
      this.notes = response.data['id'];
      this.note_names = response.data['names'];
    }).catch(err=>{
      console.log('ERROR failed to fetch notes');
      console.log(err);
    })
  },
  methods:{
    searchNotes(){  // Kind of sucks
      this.searchResults = []
      if(this.searchString.trim() === ''){
        
        return
      }
      axios.post(host.host+'searchnotes',{string:this.searchString}).then(response=>{
        response.data['searchresult'].forEach(element => {
          this.searchResults.push(element);
        });
      })
    }
  }
}
</script>

<style scoped>
.card_container{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  /* width: 100vw; */
}

.searchbar{
  outline: none;
  padding: 10px;
  margin: 20px;
  border: black solid thin;
  border-radius: 20px;
  width: 253px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 15px;
}
</style>
