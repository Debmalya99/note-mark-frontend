<template>
  <div id="editor">
      
      <input type="text" v-model="filename" placeholder="Enter a name for the note" class="savenote"/><button v-on:click="save" class="savebutton"><i class="fas fa-save"></i> Save</button>
      <button @click="toggleOutput" class="output_btn">Toggle Output Display</button>
      <hr style="margin-bottom: 20px;">
      <div v-if="showOutput">
          
          <div id="output" v-html="htmlOutput" class="markdown-body"></div>
          <hr style="margin-top:50px;">
          <h3>Tags:</h3>
          <p v-for="(tag,index) in tags" :key="tag"  style="display:flex;flex:flex-wrap;">
              <span @click="removeTag(index)">{{tag}}<i class="fa fa-times" aria-hidden="true" style="margin:3px;"></i></span>
          </p>
      </div>
      <div v-else>
          
              <textarea name="" v-model="input" @input="updateContent" class="editarea"></textarea>
          <br>
          
          <label for="tagsInput">Add Tags:</label>
          <input type="text" id="tagsInput" v-model="currentTag">
          <input type="button" value="Add Tag" @click="addTag">
          <br>
          <strong>Tags:</strong>
          <p v-for="(tag,index) in tags" :key="tag" >
              <button @click="removeTag(index)">{{tag}}<i class="fa fa-times" aria-hidden="true" style="margin:3px;"></i></button>
          </p>
          
          
      </div>
      <button class="deletebutton" v-if="id !== null" @click="deleteNote">Delete <i class="fas fa-trash"></i></button>
      
  </div>
</template>

<script>
import marked from 'marked';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';
import host from '../misc/globals.js';

export default {
    name:'NoteEditor',
    components:{

    },
    data(){
        return {
            input:"### The default markdown content. It can be edited",
            htmlOutput:null,
            showOutput:true,
            filename:'',
            tags:[],
            currentTag:null,
            newNote:false,
            id:null,
        }
    },
    created(){
        if(this.newNote || this.$route.params.id == 'newnote'){
            document.title = 'unititled - Note Mark';
            this.htmlOutput = marked(this.input,{breaks:true});
            return;
        }
        var route = host.host+'getnote/'+this.$route.params.id;
        console.log(route);
        axios.get(route).then(response=>{
            this.id = this.$route.params.id,
            this.input = response.data['data'];
            this.tags = response.data['tags'];
            this.filename = response.data['name'];
            this.htmlOutput = marked(this.input,{breaks:true});
            document.title = this.filename + '- NoteMark';
        }).catch(err=>{
            console.log('Error while loading the note data');
            console.log(err);
        });    
    },
    beforeUpdate(){
        
    },
    methods:{
        updateContent(){
            // _.debounce(()=>{},300);
            this.htmlOutput = marked(this.input,{breaks:true});
            
        },
        toggleOutput(){
            this.showOutput = !this.showOutput;
        },
        save(){
            if(this.filename.trim()){
                // alert('You saved using the filename '+this.filename);
                axios.post(host.host+'savenote',{
                    id:(this.id === null)?uuidv4():this.id,
                    name:this.filename,
                    note:this.input,
                    tags:this.tags
                }).then((res)=>{
                    console.log(res);
                    alert('Saved!')
                    }).catch(err=>{
                    console.log(err);
                });
                document.title = this.filename + '- NoteMark';
            }
            else{
                alert('Please provide a filename');
            }
            
        },
        addTag(){
            this.currentTag.trim().split(' ').forEach(element => {
                this.tags.push(element.toLowerCase());    
            });
            
            this.currentTag = null;
        },
        removeTag(index){
            this.tags.splice(index,1);
        },
        deleteNote(){
            if(this.newNote === false){
                axios.delete(host.host+'delete/'+this.id).then(response=>{
                    console.log('Deleted');
                    this.$router.push('/');
                    console.log(response);
                }).catch(err=>{
                    console.log(err);
                })
            }
            this.$router.push('/');
        }
        
    },
    computed:{
        compiledMarkdown : function(){
            return marked(this.input);
        }
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
@import url('./../../node_modules/github-markdown-css/github-markdown.css');
#editor{
    font-family: 'Roboto', sans-serif;
    color: #2c3e50;
    margin:10px;
}

.markdown-body {
		box-sizing: border-box;
		min-width: 200px;
		max-width: 980px;
		margin: 0 auto;
		padding: 45px;
        text-align: left;
	}

@media (max-width: 767px) {
		.markdown-body {
			padding: 15px;
		}
}

.editarea{
    outline: 0px;
    height: 60vh;
    width: 80vw;
    border:solid black;
    /* border:none; */
    border-width: 1px;
    /* box-shadow: 0px 0px 10px #333; */
    padding: 10px;
    /* border-radius: 5px; */
    font-family: 'Open Sans', sans-serif;
    
}

.viewOut{
    text-align: left;
    font-family: Helvetica, arial, sans-serif;
    
}

.viewOut a{
    text-decoration: none;
    
}

.deletebutton{
    color: white;
    background-color: red;
    border: none;
    padding: 15px;
    width: 150px;
    border-radius: 25px;
    transition: 0.2s;
    margin: 10px;
    outline: none;
}

.deletebutton:hover{
    color: red;
    border: solid red thin;
    background-color: white;
}

.savebutton{
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    padding: 10px;
    border: none;
    background-color: #2c3e50;
    color:white;
    transition: 0.5s;
    outline: none;
    
}

.savebutton:hover{
    /* background-color: #5d9466; */
    background-color: rgb(226, 226, 99);
    color: #2c3e50;
}

.savenote{
    padding:8px;
    outline: none;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    border-style: solid;
}

.output_btn{
    border-radius: 20px;
    padding: 10px;
    border: none;
    background-color: #2c3e50;
    color:white;
    /* transition: 0.1s;    */
    margin: 10px;
    outline:0px;
    font-weight: bold;
}

.output_btn:hover{
    /* border:solid #2c3e50 thin; */
    /* margin: 9px; */
    /* background: rgb(99,92,222); */
    background: linear-gradient(90deg, rgba(99,92,222,1) 0%, rgba(129,234,255,1) 100%);
    
}
</style>