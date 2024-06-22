<template>
    <button
      class="btn btn-secondary"
      @click="goToHomePage"
    >
      Torna alla Home
    </button>
  </template>
  
  <script>
  import { useRouter } from 'vue-router'
  
  export default {
    name: 'BackToHomeButton',
    setup() {
      const router = useRouter()
  
      const goToHomePage = () => {
        router.push('/')
      }
  
      return {
        goToHomePage
      }
    }
  }
  </script>
  
  <style scoped>
  .btn {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border-radius: 0.25rem;
    transition: background-color 0.3s, border-color 0.3s;
  }
  
  .btn-secondary {
    color: #fff;
    background-color: #6c757d;
    border-color: #6c757d;
  }
  
  .btn-secondary:hover {
    background-color: #5a6268;
    border-color: #545b62;
  }
  </style>