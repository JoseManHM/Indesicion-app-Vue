<template>
    <h2>{{ customTitle }}</h2>
    <p> {{counter}} <sup>2</sup> = {{SquareCounter}}</p>
    <p data-testid='counter'> {{counter}}</p>

    <div class="botons">
        <button @click="aumentar">+1</button>
        <button @click="disminuir">-1</button>
    </div>
</template>

<script>
export default {
    //props: ['titulo','start'],
    props: {
        titulo: String,
        start: {
            type: Number,
            default: 100,
            validator(value){
                return value > 0
            }
        }
    },
    name: 'Counter-v1',
    data(){
        return {
            counter: this.start
        }
    },
    methods: {
        aumentar(){
            this.counter = this.counter + 1;
        },
        disminuir(){
            this.counter -= 1;
        }
    },
    computed: {
        SquareCounter(){
            return this.counter * this.counter;
        },
        customTitle(){
            //Usando ternario
            return this.titulo ? this.titulo : 'Counter';
            //Usando if else
            // if(this.titulo == "" || this.titulo == undefined){
            //     return "Counter";
            // }else{
            //     return this.titulo;
            // }
        }
    }
}
</script>

<style>
    button{
        padding: 5px;
        margin-left: 5px;
        margin-right: 5px;
        width: 20%;
        background: rgb(142, 202, 142);
        border-color: rgb(205, 238, 156);
        color: black;
        cursor: pointer;
        font-size: 15px;
        border-radius: 10px;
    }
    button:hover{
        background-color: gray;
        color: white;
        transition: all 500ms;
        border-color: gray;
    }
</style>