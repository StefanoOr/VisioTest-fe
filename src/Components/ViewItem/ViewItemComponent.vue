<template>

  <div class="container" v-if="this.model.item">
    <div class="row">
      <div class="col-md-6">
        <img :src="getImageUrl()" alt="Item Image" class="image-container" v-if="model.item?.immage">
        <div v-else class="no-image">
          <i class="pi pi-image"></i>
          <p>Nessuna immagine disponibile</p>
        </div>
      </div>
      <div class="col-md-6">
        <h1>{{ model.item.name }}</h1>
        <p class="description">{{ model.item.description }}</p>
        <p class="price">Prezzo: {{ formatPrice(model.item.price) }}</p>
      </div>
      <div class="col-md-6">
        <BackToHomeComponent></BackToHomeComponent>
      </div>
    </div>
  </div>
  <div v-else class="loading-container">
    <div class="spinner-border" role="status">
      <span class="sr-only">Caricamento...</span>
    </div>
    <p>Caricamento in corso...</p>
  </div>
</template>


<style>
    .container {
    margin-top: 2rem;
  }
  .no-image {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 200px;
    background-color: #f5f5f5;
    color: #999;
  }
  .description {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }
  .price {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
  }

  .image-container {
    width: 250px; 
    height: 250px; 
    object-fit: cover; 
  }
</style>

<script>
    import axios from "axios";
import BackToHomeComponent from '../BackToHome/BackToHomeComponent.vue';

export default {
  name: 'ViewItem',
  components:{
    BackToHomeComponent
  },
  data() {
    return {
      model: {
        item: {
            name: '',
            price: '',
            description: '',
            immage:null
        }
      }
    }
  },
  mounted() {
    console.log("id", this.$router.currentRoute.value.params.id);
    var id = this.$router.currentRoute.value.params.id;
    this.getItemData(id);

  },
  methods: {

    /* item prov fetchItem() {
      this.item = {
        name: 'Prodotto di esempio',
        description: 'Questa è una descrizione del prodotto di esempio',
        price: 24.99,
      };
    },*/

    getImageUrl() {
      if (this.model.item.immage) {
        try {
          // Decodifica  base64 
          const binaryData = atob(this.model.item.immage);
          const arrayBuffer = new ArrayBuffer(binaryData.length);
          const uint8Array = new Uint8Array(arrayBuffer);
    
          //l array di byte con i dati base64
          for (let i = 0; i < binaryData.length; i++) {
            uint8Array[i] = binaryData.charCodeAt(i);
          }
    
          //url
          return `data:image/jpeg;base64,${this.model.item.immage}`;
        }  catch (error) {
          console.error("Error decoding image:", error);
          return '';
        }
      }
      return '';
    },

    formatPrice(price) {
      if (typeof price !== 'undefined' && price !== null) {
        if (typeof price === 'string') {

            return parseFloat(price).toFixed(2) + ' €';
        } else if (typeof price === 'number') {
          return price.toFixed(2) + ' €';
        } else { 
          return 'N/A';
        }
      } else {
        return 'N/A';
      }
    },

    getItemData(id){
      console.log("dentro getItemData")
      axios.get(`http://localhost:3000/api/v1/negozio/${id}`)
      .then(res => {
          this.model.item.id=res.data.id;
          this.model.item.name=res.data.nome_articolo;
          this.model.item.price=res.data.prezzo;
          this.model.item.description=res.data.descrizione;
          this.model.item.immage=res.data.immagine;
      });
    }
  },
}
</script>
