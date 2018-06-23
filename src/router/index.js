import Vue from 'vue'
import Router from 'vue-router'
import controlBoard from '@/pages/controlBoard'
import tempBoard from '@/pages/tempBoard'
import humidityBoard from '@/pages/humidityBoard'
import control from '@/pages/control'
import myIndex from '@/pages/myIndex'
import water from '@/pages/water'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/control', redirect: '/control/controlBoard' },
    {
      path: '/control',
      name: 'control',
      component: control,
      children: [{
        name: 'controlBoard',
        path: 'controlBoard',
        component: controlBoard
      },
      {
        name: 'tempBoard',
        path: 'tempBoard',
        component: tempBoard
      },
      {
        name: 'humidityBoard',
        path: 'humidityBoard',
        component: humidityBoard
      },
      {
        name: 'water',
        path: 'water',
        component: water
      }]
    },
    {
      name: 'index',
      path: '/',
      component: myIndex
    }
  ]
})
