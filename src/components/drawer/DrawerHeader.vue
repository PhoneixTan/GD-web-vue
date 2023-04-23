<template>
	<div class="ant-drawer-header" :class="{ 'no-bottom': props?.drawerParams?.id }">
		<span @click="expand">
			<RightOutlined class="ant-drawer-expand-icon" v-if="isFullScreen" />
			<LeftOutlined class="ant-drawer-expand-icon" v-else />
		</span>
		<div class="ant-drawer-indicator"></div>
		<div class="ant-drawer-header-title">{{ drawerParams.title }}</div>
		<CloseOutlined class="ant-drawer-close" @click="close" />
	</div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { RightOutlined, LeftOutlined, CloseOutlined } from '@ant-design/icons-vue'

interface DrawerParams {
	title?: string
	id?: string
}
//是否全屏
const isFullScreen = ref<boolean>(false)
//接收父组件传递过来的参数
const props = defineProps<{ drawerParams: DrawerParams }>()
// const props = defineProps<{ title: string }>()
//向父组件传值
const emits = defineEmits<{ (e: 'handleFullScreen', isFullScreen: boolean): void; (e: 'close', isClose: boolean): void }>()
/*
 * 点击展开或收缩按钮
 * */
function expand() {
	isFullScreen.value = !isFullScreen.value
	emits('handleFullScreen', isFullScreen.value)
}
/*
 * 点击关闭按钮
 * */
function close() {
	emits('handleFullScreen', false)
	emits('close', true)
}
</script>
<style lang="scss" scoped>
.no-bottom {
	border-bottom: none;
}
</style>
