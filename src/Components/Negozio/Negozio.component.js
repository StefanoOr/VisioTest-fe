import axios from 'axios';
import 'primeicons/primeicons.css';
import DeleteItemPopUp from '../DeleteItemPopUpComponent/DeleteItemPopUp.vue';
import PopupComponent from '../PopUp/PopupComponent.vue';
import { ref } from 'vue';

export default {
  name: 'NegozioComponent',
  components: {
    DeleteItemPopUp,
    PopupComponent
  },
  setup() {
    const popUpTriggers = ref({ buttonTrigger: false });
    const currentIndex = ref(null);

    const TogglePopup = (trigger) => {
      popUpTriggers.value[trigger] = !popUpTriggers.value[trigger];
    };

    return {
      popUpTriggers,
      TogglePopup,
      currentIndex,
    };
  },
  data() {
    return {
      data: [],
      sortDirection: { nome_articolo: 'asc' },
      modals: { deleteModal: false },
    };
  },
  mounted() {
    this.getItem();
  },
  computed: {
  },
  methods: {

    
    async getItem() {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/negozio');
        this.data = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    deleteItem(index) {
      this.currentIndex = index;
      this.TogglePopup('buttonTrigger');
    },
    async confirmDelete(index) {
      console.log("articolo in eliminazione id : ",index);
      try {
        await axios.delete(`http://localhost:3000/api/v1/negozio/delete/${index}`);
        this.data.splice(index, 1);
        this.getItem();
      } catch (error) {
        console.error('Errore durante la richiesta di eliminazione:', error);
        this.$toast.error(`Errore imprevisto durante l'eliminazione: ${error.message}`);
      }
    },
    TogglePopup(trigger) {
      this.popUpTriggers.value[trigger] = !this.popUpTriggers.value[trigger];
      if (!this.popUpTriggers.value[trigger]) {
        this.currentIndex = null; // Resetta l'indice corrente se il popup viene chiuso
      }
    },
  },
}