import { createRouter, createWebHistory, RouteRecordRaw, Router, RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { useSystemStore } from '../store/system'
import {useMenuStore} from "../store/menu";

//动态导入所有modules下的路由信息
//modules/**/*.ts：modules下面所有的文件夹里的.ts文件
const modelsFile = import.meta.glob('./modules/**/*.ts', { eager: true })
//路由去中心化
const children =
	Object.keys(modelsFile)
		.map((key: string) => (modelsFile[key] as Record<any, any>).default)
		.flat(1) || []

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'home',
		component: () => import('@/views/index.vue'),
		children: children
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/Login.vue')
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})
export const defaultBeforeEach = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
	//使用系统存储
	const systemStore = useSystemStore()
	//使用菜单存储
	const menuStore =useMenuStore()
	if (['/login', '/404', '/403', '/500'].includes(to.path)) {
		next()
		return
	}
	if (systemStore.isLogin) {
		//如果有token，那么判断是否有权限
	 const menu=menuStore.menuMap[decodeURI(to.path)]
		if(menu) {
			//如果menu有值，那么说明有权限
			next()
		}else {
			//没有权限
			next({path:'/403'})
		}
	} else {
		next({ path: '/login' })
	}
}
/**
 * 路由守卫
 */
router.beforeEach(defaultBeforeEach)
/**
 * 获取路由信息
 */
export const getRouter = (): Router => {
	return router
}
export default router
