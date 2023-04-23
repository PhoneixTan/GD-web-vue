/*
 * manage页面的共用方法-列表
 * */
import { BasePo, TableEntity } from '../../entity/common/base'
import { UnwrapNestedRefs } from '@vue/reactivity'
import { QueryObjectType } from '../../http/request-model'
import { getCurrentInstance, reactive, ref, Ref } from 'vue'
import BaseTable from '../../components/table/BaseTable.vue'
import { messageMethod } from '../../utils/message-util'

interface BaseTableType {
	/*
	 * 调取查询的事件
	 * */
	pageRequest(): void

	/*
	 * 渲染的源数据
	 * */
	dataList(): TableEntity[]

	/*
	 * 搜索条件列表
	 * */
	queryList: QueryObjectType
	/*
	 * 替换数据
	 * */
	setDataList(array: TableEntity[]): void
	/*
	 * 搜索参数
	 * */
	getParams(): QueryObjectType
	//表格选中行数据
	selectRecordList: TableEntity[]
	//表格选中rowKey数据
	selectRecordKeyList: string[]
}
export const manageMethod = <T extends BasePo>(): Required<{
	//刷新表格的数据
	refresh: () => void
	//更新面板的状态
	update: UnwrapNestedRefs<
		Required<{
			id: string
			title: string
			visible: boolean
			width: string
			[key: PropertyKey]: unknown
		}>
	>
	//得到表格的ref
	baseTable(): BaseTableType
	//修改面板
	handleUpdate: (vo: T | undefined) => void
}> => {
	//获得全局的信息
	const app = getCurrentInstance()
	const update = reactive({
		id: '',
		title: '',
		visible: false,
		width: '40%'
	})
	return {
		update,
		refresh: () => {
			//const baseTable = ref<InstanceType<typeOf BaseTable>>(null)
			const baseTable = app?.refs['baseTable'] as InstanceType<typeof BaseTable>
			baseTable.pageRequest()
		},
		baseTable: (): BaseTableType => {
			//as unknown as BaseTableType：将格式强制转换为最后面的类型
			return app?.refs['baseTable'] as InstanceType<typeof BaseTable> as unknown as BaseTableType
		},
		handleUpdate: (vo: T | undefined): void => {
			update.id = vo?.id ?? ''
			update.title = vo ? '编辑信息' : '新增信息'
			update.visible = true
		}
	}
}
/*
 * 修改面板的共用方法-新增、编辑
 * */
interface Col {
	//栅格占位格数，为0相当于display:none
	span?: number
	//栅格左侧的间隔格数
	offset?: number
}
export const updateMethod = (): Required<{
	//label标签的文本对齐方式
	formLabelAlign: 'left' | 'right'
	// label标签布局
	formLabelCol: Col
	//需要为输入控件设置布局样式
	formWrapperCol: Col
	//表单操作按钮的位置，底部的提交按钮以及取消按钮
	formActionCol: Col
	//取消弹框的方法
	handleCancel: () => void
	//刷新方法
	handleRefresh: () => void
	//刷新弹框方法
	handleSave: () => void
	//是否显示
	visible: Ref<boolean>
	//是否显示表单
	showForm: () => void
	//异常消息方法(表单验证失败)
	formFail: ({ errorFields }: { errorFields: Array<{ errors: Array<string>; name: Array<string> }> }) => void
}> => {
	//获取上下文对象信息
	const app = getCurrentInstance()
	const visible = ref<boolean>(false)
	return {
		formLabelAlign: 'right',
		formLabelCol: { span: 5 },
		formWrapperCol: { span: 19 },
		formActionCol: { span: 14, offset: 5 },
		handleCancel: () => app?.emit('cancel'),
		handleRefresh: () => app?.emit('refresh'),
		handleSave: () => {
			app?.emit('cancel')
			app?.emit('refresh')
		},
		visible,
		showForm: () => {
			visible.value = true
		},
		formFail: ({ errorFields }: { errorFields: Array<{ errors: Array<string>; name: Array<string> }> }) => {
			errorFields.forEach(item => {
				messageMethod.error(item.errors).then()
			})
		}
	}
}
/*
 * 抽屉的共用方法-查看
 * */
export const drawerMethod = <T extends BasePo>(
	title?: (vo: T) => string
): Required<{
	/*
	 * 更新面板的状态
	 * */
	panel: UnwrapNestedRefs<
		Required<{
			id: string
			title: string
			visible: boolean
			width: string
			[key: PropertyKey]: unknown
		}>
	>
	/*
	 * 打开查看面板的操作
	 * */
	open: (vo: T) => void
}> => {
	const panel = reactive({
		id: '',
		title: '',
		visible: false,
		width: '40%'
	})
	return {
		panel,
		open: (vo: T) => {
			panel.id = vo?.id ?? ''
			panel.title = title ? title(vo) : '查看信息'
			panel.visible = true
		}
	}
}
