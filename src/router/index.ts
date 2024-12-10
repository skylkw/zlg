import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: () => import('@/layouts/index.vue'),
      redirect: '/zlg',
      children: [
        {
          path: '/zlg',
          name: 'Zlg',
          component: () => import('@/views/zlg/index.vue'),
          meta: {
            title: 'CAN通信设置',
          },
        },
        {
          path:'/motor',
          name:'Motor',
          component:()=>import('@/views/motor/index.vue'),
          meta:{
            title:'双电机控制'
          }
        },
      ]
    },
  ],
})

export default router
