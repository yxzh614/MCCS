import Vue from 'vue'
import Router from 'vue-router'
import controlBoard from '@/pages/controlBoard/controlBoard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'controlBoard',
      component: controlBoard
    },
    {
      path: '/tempBoard',
      name: 'controlBoard',
      component: controlBoard
    }
  ]
})
