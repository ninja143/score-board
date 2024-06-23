import { createRouter, createWebHistory } from 'vue-router'
import LeaderBoard from '../views/LeaderBoard/ScorersView.vue'
import CreateScorer from '../views/LeaderBoard/CreateScorer.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    /*
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    */
    {
      path: '/',
      name: 'leaderboard',
      component: LeaderBoard
    },
    {
      path: '/leaderboard/create-scorer',
      name: 'createScorer',
      component: CreateScorer
    }
  ]
})

export default router
