import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'
import CommentList from '../views/CommentList.vue'
import TimeLine from '../views/TimeLine.vue'
import TimeLineList from '../views/TimeLineList.vue'
import AdminComment from '../views/AdminComment.vue'
import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/details',
  name: 'Main',
  component: Main,
  children: [{
      path: '',
      redirect: '/categories/list'
    },
    {
      path: "/categories/create",
      component: CategoryEdit
    }, {
      path: "/categories/edit/:id",
      component: CategoryEdit,
      props: true
    }, {
      path: "/categories/list",
      component: CategoryList
    }, {
      path: "/categories/comment",
      component: CommentList
    }, {
      path: "/categories/timeline",
      component: TimeLine
    }, {
      path: "/categories/timelinelist",
      component: TimeLineList
    }, {
      path: "/categories/admincomment/:id",
      component: AdminComment
    }, {
      path: "/admin_users/creat",
      component: AdminUserEdit
    }, {
      path: "/admin_users/edit/:id",
      component: AdminUserEdit,
      props: true
    }, {
      path: "/admin_users/list",
      component: AdminUserList
    }
  ]
}, {
  path: "/login",
  name: "login",
  component: Login,
  meta: {
    // 需要授权
    isPublic: true
  }
}, {
  path: '/',
  redirect: '/login'
}]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/');
  }
  next();
})

export default router