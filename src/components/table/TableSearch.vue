<template>
	<a-row v-if="props.search && props.search.length > 0" :gutter="[16, 8]" type="flex" align="middle" justify="start">
		<a-col v-for="(item, index) in props.search" :key="`search_${index}`" :span="item.span">
			<div style="display: flex; align-items: center; user-select: none">
				<span v-if="item.label" style="white-space: nowrap">{{ item.label }}：</span>
				<!--普通输入框-->
				<a-input v-if="item.type === 'text'" v-model:value="item.value" :placeholder="item.placeholder" allow-clear @press-enter="handleClickSearch" />
				<!--下拉选择框-->
				<a-select
					v-else-if="item.type === 'select'"
					v-model:value="item.value"
					:placeholder="item.placeholder"
					:options="item.options"
					:fieldNames="item.fieldName ?? { label: 'text', value: 'value' }"
					allow-clear
					show-search
					style="width: 100%"
					@select="handleClickSearch"
					@search="handleClickSearch"
				/>
				<!--日期组件-->
				<template v-else-if="item.type === 'date-picker'">
					<a-rang-picker
						v-if="item.options?.range"
						v-model:value="item.value"
						:picker="item.options.picker || 'date'"
						allow-clear
						style="width: 100%"
						@change="handleClickSearch"
					></a-rang-picker>
					<a-rang-picker
						v-else
						v-model:value="item.value"
						:picker="item.options?.picker || 'date'"
						:valueFormat="item.options?.valueFormat"
						:format="item.options?.format"
						allow-clear
						style="width: 100%"
						@change="handleClickSearch"
					></a-rang-picker>
				</template>
			</div>
		</a-col>
		<a-button type="primary" @click="handleClickSearch">
			<template #icon>
				<SearchOutlined />
			</template>
			搜索
		</a-button>
		<a-divider type="vertical" />
		<span>
			<!--插槽-->
			<slot></slot>
		</span>
	</a-row>
</template>
<script lang="ts" setup>
import { SearchProps } from './table-help'
import { SearchOutlined } from '@ant-design/icons-vue'
import { QueryObjectType } from '../../http/request-model'
import { getQuery } from './search-method'

interface TableSearchPropsState {
	//*查询条件数据
	search: Array<SearchProps>
}
const props = withDefaults(defineProps<TableSearchPropsState>(), {
	search: () => []
})
const emits = defineEmits<{ (e: 'click-search', type: QueryObjectType): void }>()
/*
 * 获取搜索的条件
 * */
function getQueryParams(): QueryObjectType {
	return getQuery(props.search || [])
}
/*
 * 处理点击查询事件
 * */
function handleClickSearch() {
	emits('click-search', { ...getQueryParams() })
}
//暴露方法参数给父组件
defineExpose({
	getQueryParams
})
</script>
