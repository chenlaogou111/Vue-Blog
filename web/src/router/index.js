import Vue from 'vue';
import VueRouter from 'vue-router';

// 路由懒加载
const Home = () => import('../views/Home');
const Tag = () => import('../views/Tag');
const Message = () => import('../views/Message');
const TimeLine = () => import('../views/TimeLine');
const About = () => import('../views/Ab');
const Detail = () => import('../views/Detail');

Vue.use(VueRouter);


const router = new VueRouter({
  routes: [{
    path: "/",
    redirect: "/home"
  }, {
    path: "/home",
    component: Home,
    meta: {
      title: "主页"
    }
  }, {
    path: "/tag",
    component: Tag,
    meta: {
      title: "标签"
    }
  }, {
    path: "/timeline",
    component: TimeLine,
    meta: {
      title: "时间线"
    }
  }, {
    path: "/message",
    component: Message,
    meta: {
      title: "留言板"
    }
  }, {
    path: "/about",
    component: About,
    meta: {
      title: "关于"
    }
  }, {
    path: "/detail",
    component: Detail,
    meta: {
      title: "文章"
    }
  }],
  linkActiveClass: 'current',
  mode: "history"
})

import NProgress from 'nprogress' //顶部进度条
import 'nprogress/nprogress.css'
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  document.title = `${to.meta.title} | 前端老刘`
  next()
  NProgress.start() //开启
  next()
})
router.afterEach(() => {
  NProgress.done() //关闭
})

export default router;