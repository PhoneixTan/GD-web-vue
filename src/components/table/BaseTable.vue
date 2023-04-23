<template>
	<table-search ref="tableSearch" :search="props.search" @click-search="handleClickSearch">
		<slot name="operation"></slot>
	</table-search>
	<br />
	<!--class="ant-table-container" -->
	<div ref="aBaseTable" style="flex: 1 1 auto" :style="props.calculateHeight ? { height: scroll.y + 'px', overflow: 'hidden' } : {}">
		<a-table
			v-if="!loading"
			:bordered="props.bordered"
			:columns="realColumns"
			:data-source="list"
			:loading="loading"
			:pagination="false"
			:scroll="props.calculateHeight ? scroll : null"
			:size="props.size"
			:row-key="props.rowKey"
			:row-selection="props.batchOperation?.length > 0 ? useSelection.rowSelection : null"
		>
			<template #bodyCell="{ column, record }">
				<template v-if="column.key === 'operation' && props.operation && props.operation.length > 0">
					<TableLineOperation
						:operation="props.operation"
						:max-operation="props.maxOperation"
						:operationWidth="props.operationWidth"
						:record="record"
					></TableLineOperation>
				</template>
			</template>
		</a-table>
	</div>

	<div v-if="props.isDisabled" style="display: flex">
		<TableBatchOperation
			v-if="props.batchOperation?.length > 0 && useSelection.option.keys.length > 0"
			:operation="props.batchOperation"
			:record-keys-list="useSelection.option.keys"
			:record-list="useSelection.option.rows"
		></TableBatchOperation>
		<div class="spacer"></div>
		<a-pagination
			v-if="!props.hiddenPage"
			v-model:current="pagination.page"
			v-model:page-size="pagination.rows"
			:page-size-options="props.pageSizeOptions"
			:show-total="total => `共${total}条数据`"
			:total="pagination.total"
			show-less-items
			show-quick-jumper
			show-size-changer
			style="text-align: right"
			@change="handleChangePage"
		></a-pagination>
	</div>
</template>
<script lang="ts" setup>
import TableSearch from '@/components/table/TableSearch.vue'
import { BatchOperationProps, ColumnsProps, OperationProps, SearchProps } from './table-help'
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import { QueryObjectType, QueryType } from '../../http/request-model'
import { getQuery } from './search-method'
import { PageModel, ResultModel } from '../../http/result-model'
import { resolveColumns } from './columns-handle'
import { getOperationColumns, TableOperationCheckInterface } from './table-operation-check'
import TableLineOperation from './TableLineOperation.vue'
import selection from './selection'
import TableBatchOperation from './TableBatchOperation.vue'
const useSelection = selection()
interface TableProps {
	//查询条件数据
	search: SearchProps[]
	//表格列的配置项
	columns: Array<ColumnsProps<unknown>>
	//表格标题
	title?: string
	//每行的key值
	rowKey?: string | (() => string)
	//第一次进入的page
	page?: number
	//每页的行数
	rows?: number
	//*表格的大小
	size?: 'default' | 'middle' | 'small'
	//是否显示时间间隔斑马纹
	stripe?: boolean
	//是否显示时间纵向的边框
	bordered?: boolean
	//表格的宽度
	width?: string | number
	//表格的高度
	height?: string | number
	//表格的最大高度(固定表格表头时使用)
	maxHeight?: string | number
	//是否显示表头
	showHeader?: boolean
	//*表格数据(当父组件没有传递action时，表格的数据将由该参数控制，不传它，可能表格的初始数据为空)
	tableData?: Array<unknown>
	//是否禁用分页组件
	isDisabled?: boolean
	//是否显示分页
	showSizer?: boolean
	//分页总数(当父组件没有传递action时，分页总数为tableData.length，不传tableData，分页总数为0)
	tableTotal?: number
	//是否显示总数
	showTotal?: boolean
	//分页数据
	pageSizeOptions?: string[]
	//是否自行处理分页数据处理，为true，当前组件将向父组件暴露处理分页的两个函数
	selfWithPage?: boolean
	//*父组件应该将搜索条件通过这个参数传递过来(不传可能造成分页与搜索条件无法同时使用)
	initParams?: { [key: string]: QueryType }
	//分页必传参数配置
	pageParams?: Partial<{
		page: string
		rows: string
	}>
	//是否隐藏分页信息
	hiddenPage?: boolean
	//表格是否加载(当父组件没有传递action时，表格的加载状态将由这个参数控制)
	isLoading?: boolean
	//表格是否可滚动，也可以指定滚动区域的宽、高
	scroll?: { [key: string]: unknown }
	//是否需要计算表格的高度
	calculateHeight?: boolean
	//请求的api地址
	action?(query?: QueryType): Promise<ResultModel<PageModel<unknown>>>
	//操作列数据
	operation: OperationProps<unknown>[]
	//允许操作列操作按钮最大个数
	maxOperation?: number
	//操作列固定位置
	operationFixed: 'left' | 'right' | false
	//操作列宽度
	operationWidth?: number
	//批量操作
	batchOperation?: BatchOperationProps<unknown>[]
}
/*
 * withDefaults：设置props中数据初始值
 * 当接收props数据不需要设置初始值，那么就只需要使用defineProps
 * */
const props = withDefaults(defineProps<TableProps>(), {
	//默认的搜索数据
	search: () => [],
	columns: () => [],
	title: '数据列表',
	rowKey: 'id',
	page: 1,
	rows: 10,
	width: 'auto',
	size: 'middle',
	hiddenPage: false,
	calculateHeight: true,
	tableTotal: 0,
	showSizer: true,
	showTotal: true,
	isDisabled: true,
	pageSizeOptions: () => ['10', '20', '50', '100'],
	scroll: () => ({ y: 500 }),
	pageParams: () => ({
		page: 'pageNum',
		rows: 'pageSize'
	})
})
/*
 * 1、将columns和operation的数据进行合并
 * 2、遍历columns数据，将存在ellipsisRow的列对象进行多行省略渲染
 * 3、计算operation列的宽度 (根据按钮文字的长度*单个字符的长度+右侧间距的大小)
 * */
//最终展示到页面的列项
const realColumns = computed(
	(): Array<ColumnsProps<unknown>> =>
		<ColumnsProps<unknown>[]>[...resolveColumns(props.columns), getOperationColumns(<TableOperationCheckInterface<unknown>>props)].filter(item => item)
)
//请求参数
let params = ref<QueryType>({})
//加载动画
const loading = ref<boolean>(true)
//表格数据列表
const list = ref<unknown>([])
//分页的数据
const pagination = reactive({
	page: 1,
	rows: 10,
	total: 0,
	isLast: false
})
//表格的高度
const scroll = reactive({
	scrollToFirstRowOnChange: true,
	y: 500
})
//获取表格组件
const aBaseTable = ref<HTMLElement | null>(null)
//监听组件尺寸的变化
const resizeObserver = new ResizeObserver(() => {
	if (props.calculateHeight) {
		//获取表头
		let headerHeight: number
		//获取表格表头的高度
		const tableHeader = document.getElementsByClassName('ant-table-header')
		if (tableHeader.length > 0) {
			headerHeight = tableHeader[0].clientHeight
		} else {
			headerHeight = 55
		}
		let tableHeight = aBaseTable.value?.clientHeight || 500
		//获取表格总高度-表头高度
		scroll.y = tableHeight - headerHeight * 2
	}
})
onMounted(() => {
	aBaseTable.value && resizeObserver.observe(aBaseTable.value)
})
onUnmounted(() => {
	//销毁观察者事件
	aBaseTable.value && resizeObserver.unobserve(aBaseTable.value)
})
onMounted(() => {
	pagination.page = props.page
	pagination.rows = props.rows
	if (props.action) {
		params.value = getQuery(props.search || [])
		//分页请求
		pageRequest()
	} else {
		list.value = props.tableData
		pagination.total = props.tableTotal
		loading.value = false
	}
})
/*
 * 查询数据
 * */
const pageRequest = () => {
	if (props.action) {
		//打开加载动画
		loading.value = true
		//执行数据的请求
		props
			.action({
				...(params.value as QueryObjectType),
				//分页数据
				[props.pageParams.page || 'pageNum']: pagination.page,
				[props.pageParams.rows || 'pageSize']: pagination.rows,
				//默认数据
				...(props.initParams || {})
			} as QueryType)
			.then((response: ResultModel<PageModel<unknown>>) => {
				pagination.isLast = response.data.isLastPage
				pagination.page = response.data.pageNum
				pagination.total = response.data.total
				list.value = response?.data?.list ?? response?.data
			})
			.finally(() => {
				//关闭加载动画
				loading.value = false
			})
	}
}
//获取当前搜索框的内容
//父组件用ref获取子组件时，通过InstanceType获取子组件的类型
const tableSearch = ref<InstanceType<typeof TableSearch>>(null)
//点击搜索之后的查询
function handleClickSearch(e: QueryType): void {
	params.value = e
	handleChangePage()
}
/*
 * 改变页数和分页
 * */
function handleChangePage(page = 1, rows = pagination.rows): void {
	pagination.page = page
	pagination.rows = rows
	pageRequest()
}
//向Manage暴露
defineExpose({
	/*
	 * 调取查询事件
	 * */
	pageRequest: () => {
		pageRequest()
	},
	/*
	 * 渲染的源数据
	 * */
	dataList: () => list.value,
	/*
	 * 搜索条件列表
	 * */
	queryList: (): QueryType => ({
		//搜索条件
		...tableSearch.value.getQueryParams(),
		//默认数据
		...(props.initParams || [])
	}),
	/*
	 * 替换数据
	 * */
	setDataList: (array: unknown[]) => {
		list.value = array
	},
	/*
	 * 搜索参数
	 * */
	getParams: () => params.value,
	...useSelection.exposeMethod
})
</script>
