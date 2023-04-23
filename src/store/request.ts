import { acceptHMRUpdate, defineStore } from 'pinia'
interface RequestStore {
	//登录令牌
	cache: { [key: string]: string } //字符串索引
}
const STORE_KEY = 'request-store'
export const useRequestStore = defineStore(STORE_KEY, {
	state: () =>
		<RequestStore>{
			cache: {}
		},
	actions: {
		/**
		 * 保存缓存
		 * @param key 保存的key值
		 * @param data 数据信息
		 */
		//接收值
		save(key: string, data: string) {
			this.$state.cache[key] = data
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

//热更新实现
if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useRequestStore, import.meta.hot))
}
