export interface TableEntity {
	baseTable?: string
}
export interface BasePo {
	//主键id
	id: string
	//创建时间
	gmtCreate?: string
	//修改时间
	gmtModified?: string
}
//extends BasePo：继承BasePo
export interface BusinessPo extends BasePo {
	//创建人id
	createUserId?: string
	//创建人姓名
	createUserName?: string
	//修改人id
	updateUserId?: string
	//修改人姓名
	updateUserName?: string
	//状态 0为默认 1为删除
	isDeleted?: 0 | 1
	//乐观锁
	version?: number
	//备注
	memo?: string
}
