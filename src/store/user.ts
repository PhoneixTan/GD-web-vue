import { defineStore } from 'pinia'
import { AccountUser, AccountUserInfo, AccountUserVo } from '../entity/account/account-user'
import { AccountRole } from '../entity/account/account-role'
import { AccountOrg } from '../entity/account/account-org'
import { AccountDept } from '../entity/account/account-dept'
import { BaseUtil } from '../utils/base-util'

interface UserStore {
	//用户账号信息
	user: AccountUser | undefined
	//用户基本信息
	info: AccountUserInfo | undefined
	//所属角色信息
	roleList: Array<AccountRole>
	//所属单位信息
	orgList: Array<AccountOrg>
	//所属部门信息
	deptList: Array<AccountDept>
	//权限
	permissionMap: { [key: string]: string }
}

const STORE_KEY = 'user-store'
export const useUserStore = defineStore(STORE_KEY, {
	state: () =>
		<UserStore>{
			user: undefined,
			info: undefined,
			roleList: [],
			orgList: [],
			deptList: [],
			permissionMap: {}
		},
	getters: {
		/**
		 * 获取用户头像
		 * @param state
		 */
		avatar: state => {
			const headPath = state.info?.headPath
			if (headPath) {
				return BaseUtil.getUploadPath(headPath)
			} else {
				return false
			}
		},
		/**
		 * 获取用户名
		 * @param state
		 */
		userName: state => {
			return state.user?.userName || '请登录'
		}
	},
	actions: {
		/**
		 * 设置登录的信息
		 * @param userVo
		 */
		setInfo(userVo: AccountUserVo) {
			const premissionMap: { [key: string]: string[] } = {}
			Object.entries(userVo.permissionMap).forEach(([key, value]) => {
				premissionMap[key] = value.split(',')
			})
			this.$patch({
				deptList: userVo.deptList,
				info: userVo.userInfo,
				orgList: userVo.orgList,
				roleList: userVo.orgList,
				user: {
					...userVo //...:解构
				}
			})
		},
		/**
		 * 清除用户信息（退出登录）
		 */
		clearInfo() {
			this.$patch({
				user: undefined,
				info: undefined,
				roleList: [],
				orgList: [],
				deptList: [],
				permissionMap: {}
			})
		}
	}
})
