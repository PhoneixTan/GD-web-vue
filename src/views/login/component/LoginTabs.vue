<template>
	<div class="tabs">
		<div class="tba-item" v-for="(item, index) in tabs" :key="item" :class="{ 'tab-active': index === props.active }" @click="onTabClick(index)">
			{{ item }}
		</div>
		<div class="indicator" v-for="(item, index) in tabs" :key="'indicator' + index" :class="{ 'indicator-active': index === props.active }"></div>
	</div>
</template>
<script lang="ts" setup>
const tabs = ['账号密码登录', '手机号登录']

let props = defineProps<{ active: number }>()
let emits = defineEmits<{ (e: 'update:active', active: number): void }>()
function onTabClick(index: number) {
	emits('update:active', index)
}
</script>
<style lang="scss" scoped>
.tabs {
	display: grid;
	//grid-template-columns: 200px 1fr 2fr; :有三列
	grid-template-columns: 1fr 1fr;
	grid-template-rows: auto 1px;
	width: 370px;
	padding: 5px 25px;
	//设置单元格内容的水平位置
	justify-self: center;
	.tba-item {
		font-size: 1rem;
		color: #030c4d;
		text-align: center;
		//1/2代表grid-row-start/grid-row-end的简写
		grid-row: 1/2;
	}
	.tab-active {
		color: #fff;
	}
	//指示器
	.indicator {
		width: 150px;
		height: 2px;
		margin-top: 8px;
		grid-row: 2/3;
	}
	.indicator-active {
		background: #fff;
	}
}
</style>
