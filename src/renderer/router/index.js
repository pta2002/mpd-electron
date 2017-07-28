import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/albums',
      name: 'main-page',
      component: require('@/components/AlbumView')
    },
    {
      path: '/albums/:artist/:album',
      name: 'view-album',
      component: require('@/components/AlbumDetails')
    },
    {
      path: '/',
      redirect: '/albums'
    }
  ]
})
