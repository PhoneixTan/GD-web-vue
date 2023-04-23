<template>
	<a-result status="403" title="403" sub-title="抱歉，您无法访问此页面">
		<template #extra>
			<a-button type="primary">回到首页</a-button>
		</template>
	</a-result>
</template>

<script>
export default {
	name: '403',
	data() {
		return {}
	},
	methods: {
		goHome() {
			this.$router.push('/')
		}
	}
}
</script>

<style scoped></style>
