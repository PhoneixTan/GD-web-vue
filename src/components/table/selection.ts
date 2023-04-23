import { TableEntity } from '../../entity/common/base'
import { computed, ComputedRef, reactive } from 'vue'

const useSelection = (): Required<{
	option: Required<{ rows: TableEntity[]; keys: string[] }>
	//ComputedRef是vue3中computed返回的一种特殊的类型
	//和Ref类型是ref函数返回值类型一样
	count: ComputedRef<number>
	rowSelection: object
	exposeMethod: object
}> => {
	//批量操作的数据缓存
	const option = reactive<{
		rows: TableEntity[]
		keys: string[]
	}>({
		rows: [],
		keys: []
	})
	//批量操作的事件
	/*
	 * splice()方法向数组中添加/删除元素，然后返回被删除元素组成的数据，会改变原数组
	 * slice()方法主要用于截取数组，返回截取到的数据到新数组，不会改变原数组
	 * */
	const rowSelection = {
		onChange: (selectedRowKeys: (string | number)[], selectedRows: TableEntity[]) => {
			console.log('选中项改变时触发：', selectedRowKeys, selectedRows)
			if (option.keys.length > 0) {
				option.keys.splice(0, option.keys.length)
			}
			if (option.rows.length > 0) {
				option.rows.splice(0, option.rows.length)
			}
			option.rows.push(...selectedRows)
			option.keys.push(...(selectedRowKeys as string[]))
		}
	}
	//选中内容的数量
	const count = computed(() => option.keys.length || 0)
	const exposeMethod = {
		//选中源数据列表
		selectRecordList: option.rows,
		//选中的源数据rowkey列表
		selectRecordKeyList: option.keys
	}
	return {
		option,
		count,
		rowSelection,
		exposeMethod
	}
}
export default useSelection
