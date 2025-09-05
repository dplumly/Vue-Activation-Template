import { createRouter, createWebHistory } from 'vue-router'
import Attract from '../views/Attract.vue'
import Page1 from '../views/Page1.vue'
import Page2 from '../views/Page2.vue'

const routes = [
  { path: '/', name: 'Attract', component: Attract },
  { path: '/page1', name: 'Page1', component: Page1 },
  { path: '/page2', name: 'Page2', component: Page2 },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
