import { ColumnsProps, OperationProps } from './table-help'

export interface TableOperationCheckInterface<T> {
	//操作列数组
	operation?: OperationProps<T>[]
	//操作列宽度
	operationWidth?: number
	//操作列固定的位置
	operationFixed?: 'left' | 'right' | false
	//允许操作列操作按钮最大个数
	maxOperation?: number
}
const FIELD_OPERATION = 'operation'
//单个字符的长度
const CHAR_LENGTH = 14
//操作列最小的宽度
const MIN_WIDTH_LENGTH = 61
//左侧空白大小
const LEFT_BLANK_LENGTH = 17
//右侧空白大小
const RIGHT_BLANK_LENGTH = 16

export const getOperationColumns = <T>(params: TableOperationCheckInterface<T>): ColumnsProps<T> | undefined => {
	//计算宽度(如果只要4个或者4个以下就直接计算，如果按钮数大于4个则只计算前三项)
	const operation = params.operation
	if (!operation || operation.length == 0) {
		return undefined
	}
	//获取允许操作列操作按钮最大个数
	const maxCount = Math.max(params.maxOperation || 4, 2)
	//如果大于最大的个数，会筛选长度最长的三个进行计算
	let width: number
	if (operation.length <= maxCount) {
		// [2, 2, 2, 2]
		width = operation.map(item => item.title.length).reduce((total, value) => total + value * CHAR_LENGTH + RIGHT_BLANK_LENGTH, 0)
	} else {
		// [2, 4, 5, 6] => [6, 5 , 4, 2]
		width = operation
			.map(item => item.title.length)
			.sort((x1, x2) => x2 - x1)
			.slice(0, maxCount - 1)
			.reduce((total, value) => total + value * CHAR_LENGTH + RIGHT_BLANK_LENGTH, 0)
	}
	return {
		title: '操作',
		key: FIELD_OPERATION,
		dataIndex: FIELD_OPERATION,
		width: params.operationWidth || Math.max(width + LEFT_BLANK_LENGTH, MIN_WIDTH_LENGTH * 2),
		align: 'center',
		fixed: params.operationFixed || false
	}
}
