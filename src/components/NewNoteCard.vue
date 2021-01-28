<template>
    
    <div class="card">
        <router-link to="/note/newnote">
            <h2>Click here to add a new note</h2>
            <center><i class="gg-add-r"></i></center>
            
        </router-link>    
    </div>
    
  
</template>

<script>
export default {
    name:'NewNoteCard',
    data(){
        return{
            linkTo:'',
        }
    },
    created(){
        this.linkTo = '/note/'+this.title
    },
}
</script>

<style>
@import url('https://css.gg/add-r.css');
.card{
    width: 200px;
    height: 300px;
    box-shadow: 0px 0px 10px;
    margin: 20px;
    padding: 10px;
    border-radius: 10px;
}

.card a {
    text-decoration: none;
    font-weight: bold;
}
</style>