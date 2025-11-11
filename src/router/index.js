import { createRouter, createWebHistory } from 'vue-router'
import Attract from '../views/Attract.vue'
import Instructions from '../views/Instructions.vue'
import Selection from '../views/Selection.vue'
import Cta from '../views/Cta.vue'

const routes = [
    { path: '/', name: 'Attract', component: Attract },
    { path: '/instructions', name: 'Instructions', component: Instructions },
    { path: '/selection', name: 'Selection', component: Selection },
    { path: '/cta', name: 'Cta', component: Cta },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
