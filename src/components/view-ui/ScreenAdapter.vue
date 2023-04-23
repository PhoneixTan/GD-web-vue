<template>
	<div class="screen-adapter" :style="style">
		<slot />
	</div>
</template>
<script lang="ts" setup>
import { onMounted, reactive } from 'vue'

interface ScreenAdapterState {
	width?: number
	height?: number
}
const props = withDefaults(defineProps<ScreenAdapterState>(), {
	width: 1920,
	height: 1080
})
const style = reactive({
	width: props.width + 'px',
	height: props.height + 'px',
	transform: 'scale(1) translate(-50%, -50%)'
})
//每个3秒就去获取屏幕的大小计算缩放比例，从而进行屏幕的适配
//函数防抖：在事件被触发n秒后在执行回调，如果在这n内又被触发了，则重新计时，先计算时间后执行
//函数节流：n秒内回调函数只会被执行一次，先执行后计算
const Debounce = (fn: () => void, t: number): (() => void) => {
	const delay = t || 500
	// t ? delay = t : delay = 500
	// eslint-disable-next-line no-undef
	let timer: NodeJS.Timeout | null
	return function () {
		if (timer) {
			clearTimeout(timer)
		}
		timer = setTimeout(() => {
			timer = null
			fn()
		}, delay)
	}
}
const getScale = () => {
	const w = window.innerWidth / props.width
	const h = window.innerHeight / props.height
	return { w, h }
}
const setScale = () => {
	const w = getScale().w
	const h = getScale().h
	style.transform = 'scaleX(' + w + ') scaleY(' + h + ') translate(-50%, -50%)'
}
onMounted(() => {
	setScale()
	window.onresize = Debounce(setScale, 1000)
})
</script>
<style lang="scss" scoped>
.screen-adapter {
	position: absolute;
	left: 50%;
	top: 50%;
	transition: 0.3s;
	transform-origin: 0 0;
}
</style>
