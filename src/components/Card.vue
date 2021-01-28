<template>
    <div class="card">
        <h2>{{name}}</h2>
        
        <router-link :to="linkTo">Open note</router-link>
    </div>
    
  
</template>

<script>
export default {
    name:'Card',
    props:['id','name'],
    data(){
        return{
            linkTo:'',
        }
    },
    created(){
        this.linkTo = '/note/'+this.id
    },
}
</script>

<style>
.card{
    width: 200px;
    height: 300px;
    box-shadow: 0px 0px 10px grey;
    margin: 20px;
    padding: 10px;
    border-radius: 10px;
    transition: 0.2s;
}

.card:hover{
    transform: scale(1.03) rotate(-1deg);
    /* background-color: #47d6b7; */
    background: rgb(24,40,115);
    background: linear-gradient(45deg, rgba(24,40,115,1) 0%, rgba(129,255,248,1) 100%);
    color:white;
    
}

.card:hover a{
    color:wheat;
}

.card a {
    text-decoration: none;
    font-weight: bold;
}
</style>