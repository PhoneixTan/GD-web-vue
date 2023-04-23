<template>
	<a-button
		type="link"
		v-for="item in operationArray"
		:key="item.title"
		:danger="item.danger"
		:size="'small'"
		:style="item.style"
		:text="item.title"
		@click="item.action(props.record)"
		>{{ item.title }}</a-button
	>
</template>
<script lang="ts" setup>
import { TableOperationCheckInterface } from './table-operation-check'
import { OperationProps } from './table-help'
import { computed } from 'vue'

interface TableLineOperationProps<T> extends TableOperationCheckInterface<T> {
	record?: T
	maxOperation?: number
	operationWidth?: number
	operation?: OperationProps<T>[]
}
const props = withDefaults(defineProps<TableLineOperationProps<unknown>>(), {
	operationWidth: 220,
	maxOperation: 4
})

/*
 * 获取可用的按钮
 * */
const realArray = computed<OperationProps<unknown>[]>(() => (props.operation || []).filter(item => !item.check || item.check(props.record)))
/*
 * 列表操作栏
 * */
const operationArray = computed<OperationProps<unknown>[]>(() =>
	realArray.value.length > props.maxOperation ? realArray.value.slice(0, props.maxOperation - 1) : realArray.value
)
</script>
