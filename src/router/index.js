import { createRouter, createWebHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'
import MainPage from '@/views/MainPage.vue'; // 主页面
import DetailPage from '@/views/DetailPage.vue'; // 详情页面

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage,
    },
    {
      path: '/detail/:id/:type',
      name: 'DetailPage',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: DetailPage,
      props: route => ({ id: route.params.id, type: route.params.type }),
    },
  ],
})

export default router
