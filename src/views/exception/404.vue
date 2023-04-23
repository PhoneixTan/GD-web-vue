<template>
	<a-result status="404" title="404" sub-title="抱歉，该页面没有跳转">
		<template #extra>
			<a-button type="primary">回到首页</a-button>
		</template>
	</a-result>
</template>

<script>
export default {
	name: '404',
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
