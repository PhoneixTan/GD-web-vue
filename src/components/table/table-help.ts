import { ParamsItemType, QueryType } from '../../http/request-model'
import { OptionKeys } from '../form-item/props/props-option'
import { ColumnType } from 'ant-design-vue/lib/table/interface'
import { CSSProperties } from 'vue'

/*
 * 表格的列对象接口
 * */
export interface ColumnsProps<T> extends ColumnType<T> {
	//是否隐藏
	hidden?: boolean
	//省略号行数
	ellipsisRow?: number
	//子级数据
	children?: Array<ColumnType<T>>
}

/*
 * 表格操作列对象接口
 * */
export interface OperationProps<T> {
	//操作名称
	title: string
	//操作列是否隐藏，默认不隐藏
	hidden?: boolean
	//是否危险按钮
	danger?: boolean
	//自定义按钮样式
	style?: CSSProperties
	//数据验证是否显示该操作按钮，如果为true则显示
	check?(record: T): boolean
	//点击后调用的方法 record：代表当前这一行
	action(record: T, el?: HTMLElement | null): void
}
/*
 * 批量操作的按钮组
 * */
export interface BatchOperationProps<T> {
	//操作名称
	title: string
	//是否为危险按钮
	danger?: boolean
	//数据验证判断是否显示该操作按钮，如果为true则显示
	check?(recordList: T[]): boolean
	//点击后调用的方法
	action(
		//Required将类型中的所有选项变为必选，去除所有问号
		params: Required<{ recordList: T[]; keys: string[] }>
	): void
}
/*
 * 查询参数接口
 * */
export interface SearchProps {
	//主要类型
	type: 'text' | 'select' | 'date-picker' | 'time-picker' | 'date-time-picker' | 'number' | 'auto-complete' | 'sort'
	//label
	label?: string
	//提交的字段名称
	field: string
	//绑定的数据
	value: ParamsItemType
	//占位大小
	span?: number
	//占位提示信息
	placeholder: string
	//是否隐藏
	hidden?: boolean
	//当类型为select的时候的选项数据
	options?: Array<SearchOptionsProps> | Array<object> | DatePicker | TimePicker | DateTimePicker | NumberPicker
	//自定义options中的label name children的字段
	fieldName?: OptionKeys
	//真实的提交字段名称
	beforeArrayGet?(value: string[]): QueryType
}

/*
 * 查询条件接口
 * */
export interface SearchOptionsProps {
	key: string | number
	value: string | number | boolean
	text: string
}

/*
 * 日期选择器
 * */
export interface DatePicker {
	//是否是范围选择器
	range?: boolean
	//展示的时间格式 YYYY-MM-dd
	format?: string
	//设置选择器的类型
	picker?: 'date' | 'week' | 'month' | 'quarter' | 'year'
	//绑定值的格式 对value、defaultValue、defaultPickerValue起作用，不指定则绑定值为dayjs对象
	valueFormat?: string
}

/*
 * 时间选择器
 * */
export interface TimePicker {
	//是否是范围选择器
	range?: boolean
	//展示的时间格式 HH:mm:ss
	format?: string
	//小时选项间隔
	hourStep?: number
	//分钟选项间隔
	minuteStep?: number
	//秒选项间隔
	secondStep?: number
	//面板是否显示"此刻"按钮
	showNow?: boolean
	//绑定值的格式 对value、defaultValue、defaultPickerValue起作用，不指定则绑定值为dayjs对象
	valueFormat?: string
}

/*
 * 日期时间选择器
 * */
export interface DateTimePicker extends DatePicker, TimePicker {}

/*
 * 数字范围
 * */
export interface NumberPicker {
	//是否是范围选择器
	range?: boolean
}
