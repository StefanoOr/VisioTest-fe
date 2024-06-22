import { createRouter, createWebHistory } from 'vue-router';
import HomeComponent from './Components/Negozio/NegozioComponent.vue';
import AddItemComponent from './Components/AddItem/AddItem.vue';
import UpdateItem from './Components/UpdateItem/UpdateItem.vue';
import ViewItemComponent from './Components/ViewItem/ViewItemComponent.vue';

const routes = [
  { path: '/', component: HomeComponent },
  { path: '/addItem', component: AddItemComponent },
  { path:'/:id/updateItem', component: UpdateItem},
  { path: '/viewitem/:id', name: 'viewitem', component: ViewItemComponent, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;