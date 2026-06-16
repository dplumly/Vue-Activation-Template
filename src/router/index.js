import { createRouter, createWebHistory } from 'vue-router'
import Attract from '../views/Attract.vue'
import Instructions from '../views/Instructions.vue'
import Quiz from '../views/Quiz.vue'
import Results from '../views/Results.vue'
import Cta from '../views/Cta.vue'

const routes = [
    { path: '/', name: 'Attract', component: Attract },
    { path: '/instructions', name: 'Instructions', component: Instructions },
    { path: '/quiz', name: 'Quiz', component: Quiz },
    { path: '/results', name: 'Results', component: Results },
    { path: '/cta', name: 'Cta', component: Cta },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
