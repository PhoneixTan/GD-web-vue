import { BusinessPo } from '../common/base'
/**
 * 数据字典下拉框实体类
 */
export interface DictionaryListVo extends BusinessPo {
	//数据项页面显示名称，自动生成，去除根字典的数据字典名称链
	displayName: string
	//上级字典id
	fkParentId: string
	//图标
	icon: string
	//数据项唯一编号（名字英文，根字典必填）
	itemCode: string
	//数据字典名称
	itemName: string
	//数据项值
	itemValue: string
	//上级编号
	parentCode: string
	//根字典编号/类别编号，子项必填
	rfRootCode: string
	//排序
	sortCode: number
	//状态，0不可编辑，1可编辑，2禁用
	state: number
}
