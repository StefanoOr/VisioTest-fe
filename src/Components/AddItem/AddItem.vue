<template>
    <div class="container">
      <h1>Aggiungi un Nuovo Articolo</h1>
      <form @submit.prevent="addItem" class="form">
        <div class="form-group">
          <label for="nome">Nome Articolo:</label>
          <input type="text" id="nome" v-model="nome" required class="form-control">
        </div>
        <div class="form-group">
          <label for="prezzo">Prezzo:</label>
          <input type="number" id="prezzo" v-model="prezzo" required>
        </div>
        <div class="form-group">
          <label for="descrizione">Descrizione:</label>
          <textarea id="descrizione" v-model="descrizione" class="form-control"></textarea>
        </div>
        <div class="form-group">
          <label for="image">Immagine:</label>
          <input type="file" @change="handleImageUpload" required  class="form-control-file center-button">
          <p v-if="!hasImage" class="error-message" >È necessario caricare un'immagine.</p>
          <p v-else style="color: green;">Immagine caricata correttamente.</p>
        </div>
        <div class="form-actions d-flex justify-content-center">
          <button  type="submit" class="btn btn-primary center-button">Conferma</button>
       </div>
        
      </form>
      <BackToHomeComponent class="btn btn-secondary my-custom-spacing"></BackToHomeComponent>
    </div>
  </template>

<style>

.form-actions {
  display: flex;
  justify-content: center;
}

.center-button {
  display: block;
  margin: 0 auto;
}

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
  
  .form-control-file {
    display: block;
    width: 100%;
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
  
  .error-message {
    color: #dc3545;
    font-weight: bold;
  }
</style>

<script>
    
import axios from 'axios';
import BackToHomeComponent from '../BackToHome/BackToHomeComponent.vue';

export default {
  name: 'NuovoArticoloComponent',
  components:{
    BackToHomeComponent,
  },
  data() {
    return {
      nome: '',
      prezzo: null,
      descrizione: '',
      image:'',
      imageData:'',
      hasImage: false,
    }
  },
  methods: {
    async addItem() {

      if (!this.hasImage) {
        this.$toast.error('È necessario caricare un\'immagine');
        return;
      }

      try {
        const newItem = {
          nome_articolo: this.nome,
          prezzo: this.prezzo,
          descrizione: this.descrizione,
          immagine: this.imageData,
        };
         await axios.post('http://localhost:3000/api/v1/negozio', newItem);
        // Resetta i campi del form
        this.nome = '';
        this.prezzo = null;
        this.descrizione = '';
        this.imageData = null;
        this.image = null;
        this.hasImage = false;
        this.$el.querySelector('input[type="file"]').value = '';
        
        alert('Articolo Aggiungo con successo');
      }catch (error) {
        console.error('Errore durante l aggiunta di un nuovo articolo:', error);
        if (error && error.message) {
          this.$toast.error(`Errore durante l'aggiunta: ${error.message}`);
        } else {
          this.$toast.error(`Errore sconosciuto durante l'aggiunta`);
        }
      }
    },

    handleImageUpload(event) {
      const file = event.target.files[0];
      // Controllo  formato jpg
      if (file.type === 'image/jpeg') {
        this.image = file;
        const reader = new FileReader();
        reader.onload = () => {
          this.imageData = reader.result.split(',')[1]; //  Base64
          this.hasImage = true;
        };
        reader.readAsDataURL(this.image);
      } else {
      
        alert('Sono accettati solo file in formato JPG.');
         event.target.value = '';
        this.image = null;
        this.imageData = null;
        this.hasImage = false;
      }
    }
  }
}

</script>
