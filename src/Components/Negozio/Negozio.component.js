import axios from 'axios';
import 'primeicons/primeicons.css';
import PopupComponent from '../PopUp/PopupComponent.vue';
import { ref } from 'vue';

export default {
  name: 'NegozioComponent',
  components: {
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
      try {
        await axios.delete(`http://localhost:3000/api/v1/negozio/delete/${index}`);
        this.data.splice(index, 1);
        this.getItem();
      } catch (error) {
        this.$toast.error(`Errore imprevisto durante l'eliminazione: ${error.message}`);
      }
    },
    TogglePopup(trigger) {
      this.popUpTriggers.value[trigger] = !this.popUpTriggers.value[trigger];
      if (!this.popUpTriggers.value[trigger]) {
        this.currentIndex = null; // Resetta l indice 
      }
    },
  },
}