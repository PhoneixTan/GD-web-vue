import { acceptHMRUpdate, defineStore } from 'pinia'
import { SystemMenu } from '../entity/system/system-menu'
import requestMethod from '../api/system/menu'
interface MenuStore {
	//菜单部分
	menus: Array<SystemMenu>
	//当前菜单的序号
	index: number
}
const STORE_KEY = 'menu-store'
export const useMenuStore = defineStore(STORE_KEY, {
	state: () =>
		<MenuStore>{
			menus: [],
			index: 0
		},
	getters: {
		/**
		 * 获取菜单
		 */
		menuList: state => state.menus,
		/**
		 * 获取菜单序号
		 */
		menuIndex: state => state.index,
		/**
		 *
		 * @param state
		 */
		currentMenu: state => {
			if (state.index >= state.menus.length) return null
			else return state.menus[state.index]
		},
		/**
		 * 获取map类型的菜单{linkUrl：SystemMenu}
		 * 用于首页的面包屑和路由守卫
		 * @param state
		 */
		menuMap: state => {
			const menuMap = menuListToMap(state.menus)
			//添加首页
			menuMap['/'] = <SystemMenu>{}
			return menuMap
		}
	},
	actions: {
		/**
		 * 注册菜单
		 */
		async registerMenu() {
			const { data } = await requestMethod.menuList({ sistCode: 'manage' })
			const menus = data.filter(value => value.isShow === 1)
			//赋值菜单信息
			this.$patch({ menus })
		},
		/**
		 * 通过id更改index
		 * @param id
		 */
		setIndexById(id: string) {
			const index = this.menus.findIndex(value => value.id === id)
			if (this.index != index) {
				this.$patch({ index })
			}
		}
	},
	//开启数据缓存
	persist: {
		enabled: true,
		strategies: [
			{
				key: STORE_KEY,
				storage: sessionStorage
			}
		]
	}
})
interface MenuMap {
	[key: string]: SystemMenu
}

/**
 * 遍历menus，重组map对象
 * @param menus
 */
function menuListToMap(menus: Array<SystemMenu>): MenuMap {
	let result: MenuMap = {}
	for (const menu of menus) {
		if (menu.isShow === 1) {
			if (menu.linkUrl) result[menu.linkUrl] = menu
		}
		if (menu.children) {
			const systemItem = menuListToMap(menu.children)
			result = { ...result, ...systemItem }
		}
	}
	return result
}
if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useMenuStore, import.meta.hot))
}
