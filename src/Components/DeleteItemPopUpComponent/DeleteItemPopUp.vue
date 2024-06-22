<template>
    <div class="modal" :class="{ 'is-active': isVisible }">
      <div class="modal-background" @click="closeModal"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Conferma eliminazione</p>
          <button class="delete" aria-label="close" @click="closeModal"></button>
        </header>
        <section class="modal-card-body">
          Sei sicuro di voler eliminare questo elemento?
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="confirmDelete">Conferma</button>
          <button class="button" @click="closeModal">Annulla</button>
        </footer>
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
    props: {
      isVisible: {
        type: Boolean,
        required: true
      },
      itemIndex: {
        type: Number,
        required: true
      }
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
      confirmDelete() {
        this.$emit('delete', this.itemIndex);
        this.closeModal();
      }
    }
  }
  </script>