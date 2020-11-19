import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'
import CommentList from '../views/CommentList.vue'
import TimeLine from '../views/TimeLine.vue'
import TimeLineList from '../views/TimeLineList.vue'
import AdminComment from '../views/AdminComment.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'Main',
  component: Main,
  children: [{
    path: '',
    redirect: '/categories/list'
  }, {
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
  }]
}]

const router = new VueRouter({
  routes
})

export default router