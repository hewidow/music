import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/music',
    redirect: '/music/home'
  },
  {
    path: '/music/home',
    component: () => import('../views/Home')
  },
  {
    path: '/music/rank',
    component: () => import('../views/MusicRank')
  },
  {
    path: '/music/rankList',
    component: () => import('../views/MusicRankList')
  },
  {
    path: '/music/search',
    component: () => import('../views/MusicSearch')
  },
  {
    path: '/music/my',
    component: () => import('../views/My')
  },
  {
    path: '/music/login',
    component: () => import('../views/Login')
  },
  {
    path: '/music/liked',
    component: () => import('../views/MusicLiked')
  },
  {
    path: '/music/setting',
    component: () => import('../views/Setting')
  },
  {
    path: '/music/theme',
    component: () => import('../views/Theme')
  },
  {
    path: '/music/mv',
    component: () => import('../views/MusicMovie')
  }
]

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
