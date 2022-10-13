<template>
    <img v-if="img" :src="img" alt="bg">
    <div class="bg-dark"></div>
    <div class="indecision-container">
        <input type="text" placeholder="Hazme una pregunta" v-model="question">
        <p>Recuerda poner un signo de interrogación (?) al final</p>
        <div>
            <h2>{{question}}</h2>
            <h1 v-show="isValidQuestion">{{respuesta}}</h1>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            question: '',
            respuesta: '',
            img: '',
            isValidQuestion: false
        }
    },
    watch: {
        question(value, oldValue){
            this.isValidQuestion = false
            console.log({value})
            if(!value.includes('?')) return

            this.isValidQuestion = true
            //TODO: realizar petición HTTP
            this.getAnswer()
        }
    },
    methods:{
        async getAnswer(){
            try{
                this.img = 'https://via.placeholder.com/750'
                this.respuesta = 'Pensando...'
                const { answer, image } = await fetch('https://yesno.wtf/api').then(response => response.json())
                if(answer == 'yes'){
                    this.respuesta = 'Sí!'
                }else if(answer == 'no'){
                    this.respuesta = 'No!'
                }else{
                    this.respuesta = 'Tal vez'
                }
                //this.respuesta = answer
                this.img = image
            }catch(error){
                console.log('getAnswerError: ', error)
                this.respuesta = 'No se pudo cargar el API'
                this.img = null
            }
        }
    }
}
</script>

<style scoped>
    img, .bg-dark{
       height: 100vh;
       left: 0px;
       max-height: 100%;
       max-width: 100%;
       position: fixed;
       top: 0px;
       width: 100vw;
    }
    .bg-dark{
        background-color: rgba(0,0,0,0.4);
    }
    .indecision-container{
        position: relative;
        z-index: 99;
    }
    input{
        width: 250px;
        padding: 10px 15px;
        border-radius: 5px;
        border: none;
    }
    input:focus{
        outline: none;
    }
    p{
        color: white;
        font-size: 20px;
        margin-top: 0px;
    }
    h1, h2{
        color: white;
    }
    h2{
        margin-top: 150px;
    }
</style>