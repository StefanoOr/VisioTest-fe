<template>
  <div class="popup-container">
    <div class="popup">
      <div class="pop-inner">
        <h2>Sei sicuro di voler eliminare l'articolo?</h2>
        <div class="popup-buttons">
          <button class="confirm-button" @click="confirmDelete">Conferma</button>
          <button class="cancel-button" @click="exit()">Annulla</button>
        </div>
      </div>
    </div>
  </div>
  </template>
  
  <script>
  export default {
    name: 'PopupComponent',
    props: ['TogglePopup', 'indexx'],
    methods: {
      confirmDelete() {
        console.log("questo è l'indice", this.indexx);
        this.$emit('confirm-delete', this.indexx);
        this.TogglePopup();
        
      },
      exit(){
        console.log("esci da pop Up");
        this.TogglePopup();
        console.log("dopo");
      }
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .popup-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.popup {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  max-width: 400px;
  width: 100%;
}

.pop-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2 {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}

.popup-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.confirm-button, .cancel-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
}

.confirm-button {
  background-color: #f44336;
  color: white;
  margin-right: 10px;
}

.cancel-button {
  background-color: #4CAF50;
  color: white;
}
  </style>