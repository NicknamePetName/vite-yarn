import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from "@/views/login/Login.vue";
import Register from "@/views/register/Register.vue";
import { isLoginRequest } from "@/api/login";
import { ElMessage } from "element-plus";
import Home from "@/views/home/Home.vue";
import Electric from "@/views/home/checkout/Electric.vue";


const routes: Array<RouteRecordRaw> = [
/*   {
    path: '/helloworld',
    name: 'hello',
    // component: HelloWorld,
    component: () => import('@/components/HelloWorld.vue'),
  }, */
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/home',
    name: 'home',
    alias: '/',
    redirect: '/home/electric',
    component: Home, 
    children: [
      {
        path: 'electric',
        component: Electric
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from) => {
  const res: any = await isLoginRequest()
  
  if (
    // 检查用户是否已登录
    !res.isSuccess &&
    // 避免无限重定向
    to.name !== 'login' && 
    to.name !== 'register'
  ) {
    // 将用户重定向到登录页面
    ElMessage.warning(res.message)
    return { name: 'login' } 
  }
})

export default router