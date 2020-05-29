import Vue from 'vue'
// import store from '../store/index'
import VueRouter from 'vue-router'//登录页面
import Login from '../components/Login.vue'

Vue.use(VueRouter)

const routes = [

	{
		path: '/',
		component: Login,
		name: 'Login',
		hidden: true
	},
	{
		path: "/student",
		component: () => import("../views/student/Home"),
		children: [
			{
				path: "/Student/studentInformation",
				meta: { name: "个人信息", icon: "el-icon-tickets" },
				component: () => import("../views/student/sSelfInformation.vue")
			},
			{
				path: "/Student/Grade",
				meta: { name: "成绩查询", icon: "el-icon-setting" },
				component: () => import("../views/student/sGrade.vue")
			},
			{
				path: "/Student/exam",
				meta: { name: "考试列表", icon: "el-icon-s-order" },
				component: () => import("../views/student/sExam.vue")
			}
		]
	},
	{
		path: '/exam/:index',
		component: () => import('../views/student/sExamDetail.vue')
	},
	{
		path: '/grade/:index',
		component: () => import('../views/student/sGradeDetail.vue')
	},
	{
		path: "/teacher",
		component: () => import("../views/teacher/Home"),
		redirect:"/Teacher/selfInformation", // 设置默认打开的页面
		children: [
			{
				path: "/Teacher/selfInformation",
				meta: {name: "个人信息", icon: "el-icon-user"},
				component: () => import("../views/teacher/tSelfInformation.vue")
			},
			{
				path: "/Teacher/studentInformation",
				meta: {name: "学生信息", icon: "el-icon-s-custom"},
				component: () => import("../views/teacher/tManageStudent.vue")
			},
			{
				path: "/Teacher/paperManage",
				meta: {name: "试卷信息", icon: "el-icon-document-checked"},
				component: () => import("../views/teacher/tManagePaper.vue")
			},
			{
				path: "/Teacher/questionManage",
				meta: {name: "试题信息", icon: "el-icon-edit-outline"},
				component: () => import("../views/teacher/tManageQuestion.vue")
			},
			
		]
	},
	{
		path: "/manager",
		component: () => import("../views/manager/Home"),
		redirect:"/Manager/studentInformation",
		children: [
			{
				path: "/Manager/studentInformation",
				meta: {name: "学生信息", icon: "el-icon-tickets"},
				component: () => import("../views/manager/mManageStudent.vue")
			},
			{
				path: "/Manager/teacherInformation",
				meta: {name: "教师信息", icon: "el-icon-setting"},
				component: () => import("../views/manager/mManageTeacher.vue")
			},
		]
	},
	
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 全局路由守卫
// router.beforeEach((to, from, next) => {
//   const isLogined = store.getters.getIsLogined ? store.getters.getIsLogined : window.sessionStorage.getItem('isLogined');    //获取登录状态
//   /*如果进入需要登录的页面，就判断是否已经登录，如果登录》next，如果没登录》Login*/
//   if (to.meta.requiresAuth) {
//     if (isLogined) {
//       next()
//     } else {
//       next('/Login')
//     }
//   } else {
//     next()
//   }
// })
export default router;