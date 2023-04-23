import { ColumnsProps } from './table-help'
import { deepCopy } from '../../utils/data-util'
import { ColumnType } from 'ant-design-vue/lib/table/interface'
import { h } from 'vue'

/*
 * 处理列信息
 * */
export const resolveColumns = <RecordType>(array: ColumnsProps<RecordType>[]): ColumnsProps<RecordType>[] => {
	return [
		...array.map(column => {
			const c = deepCopy(column)
			if (c.ellipsisRow && c.ellipsisRow > 0) {
				ellipsisRow(c)
			}
			return c
		})
	]
}
/*
 * 多行省略信息
 * */
const ellipsisRow = <RecordType>(column: ColumnsProps<RecordType>) => {
	//判断当前列是否是自定义渲染
	//若是，则取自定义渲染后的数据
	if (column.customRender) {
		const method = column.customRender
		column.customRender = (opt: {
			value: string
			text: string
			record: RecordType
			index: number
			renderIndex: number
			column: ColumnType<RecordType>
		}) => {
			return renderEllipsisRow({
				content: method(opt).children as string,
				showLine: column.ellipsisRow
			})
		}
		return
	}
	//否则，则取当前行对应字段的数据
	if (column.dataIndex) {
		column.customRender = (opt: {
			value: string
			text: string
			record: RecordType
			index: number
			renderIndex: number
			column: ColumnType<RecordType>
		}) => {
			return renderEllipsisRow({
				content: opt.text,
				showLine: column.ellipsisRow
			})
		}
		return
	}
}
/*
 * 表格渲染富文本
 * */
const renderEllipsisRow = (child: { content: string; showLine?: number }) => {
	return h(
		'div',
		{
			//给div添加title属性，鼠标hover到元素上时显示全部信息
			title: child.content,
			style: `display: -webkit-box; word-break: break-all;-webkit-line-clamp: ${child.showLine ?? 4};line-clamp:${
				child.showLine ?? 4
			};overflow: hidden;text-overflow:ellipsis;white-space:normal;-webkit-box-orient:vertical`
		},
		formatRich2Text(child.content ?? '')
	)
}
/*
 * 格式化富文本信息
 * */
const formatRich2Text = (richText: string) => {
	return richText
		.replace(/<.+?>/g, '') //去除换行
		.replace(/&nbsp;/gi, '') //去除空格
		.replace(/\s/gi, '')
}
