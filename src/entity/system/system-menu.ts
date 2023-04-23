import { BusinessPo } from '../common/base'

export interface SystemMenu extends BusinessPo {
	//子菜单
	children: Array<SystemMenu>
	// 子菜单id
	childrenIds: string[]
	// 页面显示菜单名称，自动生成，完整菜单链
	displayName: string
	// 权限节点dom
	doms: string
	// 上级id
	fkParentId: string
	// 图标
	icon: string
	// 是否显示，1表示显示
	isShow: number
	// 菜单地址/链接地址/路由地址
	linkUrl: string
	// 菜单编号，表单必填,唯一
	menuCode: string
	// 菜单完整id
	menuIds: string[]
	// 菜单标识符，用于业务扩展
	menuKey: string
	// 菜单级别,自动生成
	menuLevel: number
	// 菜单名称,表单必填
	menuName: string
	// 菜单类型（预留）
	menuType: number
	// 本地页面存储地址
	pagePath: string
	// 权限值
	permissions: string
	// 站点/终端
	siteCode: string
	// 排序号,默认自动累加
	sortCode: number
}
