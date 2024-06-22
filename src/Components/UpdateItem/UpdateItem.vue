<template>
    <div class="container">
    <h1>Modifica Articolo</h1>

    <form @submit.prevent="updateItem(model.item.id)">
      <div class="mb-3">
        <label for="name" class="form-label">Nome</label>
        <input type="text" class="form-control" id="name" v-model="model.item.name" required>
      </div>

      <div class="mb-3">
        <label for="price" class="form-label">Prezzo</label>
        <input type="number" class="form-control" id="price" v-model="model.item.price" required>
      </div>

      <div class="mb-3">
        <label for="description" class="form-label">Descrizione</label>
        <textarea class="form-control" id="description" rows="3" v-model="model.item.description" required></textarea>
      </div>

      <div class="mb-3 my-custom-spacing">
        <button type="submit" class="btn btn-primary ">Aggiorna</button>
      </div>
    </form>

    <div v-if="errorList" class="alert alert-danger" role="alert">
      {{ errorList }}
    </div>
    <div class="my-custom-spacing">
        <BackToHomeComponent/>
    </div>
  </div>
</template>


<style>
    .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .form {
    background-color: #f8f9fa;
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  .form-label {
    font-weight: bold;
  }
  
  .form-control {
    display: block;
    width: 100%;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  
  .form-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .btn {
    display: inline-block;
    font-weight: 400;
    color: #fff;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  
  .btn-primary {
    background-color: #007bff;
    border-color: #007bff;
  }
  
  .btn-primary:hover {
    background-color: #0069d9;
    border-color: #0062cc;
  }
  
  .btn-secondary {
    background-color: #6c757d;
    border-color: #6c757d;
  }
  
  .btn-secondary:hover {
    background-color: #5a6268;
    border-color: #545b62;
  }
  
  .alert {
    margin-top: 1.5rem;
  }
</style>

<script>
    import axios from "axios";
import BackToHomeComponent from '../BackToHome/BackToHomeComponent.vue';


export default {
    name : 'updateItem',
    components:{
        BackToHomeComponent,
    },
    data(){
        return {
            errorList: '',
            model: {
                item: {
                    name: '',
                    price: '',
                    description: ''
                }
            }
        }
    },
    mounted(){
      console.log("yessa",this.$route.params.id) ;
      this.getItemData(this.$route.params.id);
    },
    methods: {

       updateItem(id){
        console.log("inserimento " ,  this.model.item);
        axios.put(`http://localhost:3000/api/v1/negozio/update/${id}`,this.model.item)
        .then(res => {
           console.log(res);
        }); 
        alert('Articolo modificato con successo !');
       },

        getItemData(id){
            axios.get(`http://localhost:3000/api/v1/negozio/${id}`)
            .then(res => {
                console.log("dentro", res.data.nome_articolo);
                this.model.item.id=res.data.id;
                this.model.item.name=res.data.nome_articolo;
                this.model.item.price=res.data.prezzo;
                this.model.item.description=res.data.descrizione;

                console.log("questo è il modello", this.model.item);
            });
        }

    }

}
</script>

