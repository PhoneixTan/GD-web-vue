<template>
	<a-result status="500" title="500" sub-title="抱歉，服务器出现了问题">
		<template #extra>
			<a-button type="primary">回到首页</a-button>
		</template>
	</a-result>
</template>

<script>
export default {
	name: '500',
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
