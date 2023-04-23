<template>
	<a-button
		size="small"
		v-for="item in realOperation"
		:key="item.title"
		:danger="item.danger"
		@click="item.action({ recordList: props.recordList || [], keys: props.recordKeysList || [] })"
		>{{ item.title }}</a-button
	>
</template>
<script lang="ts" setup>
import { BatchOperationProps } from './table-help'
import { TableEntity } from '../../entity/common/base'
import { computed } from 'vue'

interface PropsState<T> {
	//批量操作
	operation: BatchOperationProps<T>[]
	//行数据
	recordList: T[]
	//keys数据
	recordKeysList: string[]
}
const props = defineProps<PropsState<TableEntity>>()
//获取可用的批量操作按钮
const realOperation = computed(() => (props.operation || []).filter(item => !item.check || item.check(props.recordList)))
</script>
