<template>
	<div class="login-page">
		<!--占位-->
		<div class="spacer"></div>
		<!--主要内容-->
		<div class="container">
			<!--标题-->
			<div class="title"></div>
			<!--标签页-->
			<login-tabs v-model:active="active"></login-tabs>
			<login-form class="m-top" v-show="active === 0"></login-form>
			<login-code class="m-top" v-show="active === 1"></login-code>
			<!--第三方账号-->
			<div class="third-login">
				<div>其他登录方式</div>
				<alipay-circle-outlined class="icon first-icon"></alipay-circle-outlined>
				<taobao-circle-outlined class="icon"></taobao-circle-outlined>
				<weibo-circle-outlined class="icon"></weibo-circle-outlined>
				<!--占位-->
				<div class="spacer"></div>
				<div class="register">注册账号</div>
			</div>
			<!--占位-->
			<div class="spacer-2"></div>
			<div class="help">
				<div>帮助</div>
				<div>隐私</div>
				<div>条款</div>
			</div>
			<div class="copy-right" v-if="copyright">{{ copyright }}</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined } from '@ant-design/icons-vue'
import { computed, ref } from 'vue'
import LoginTabs from './component/LoginTabs.vue'
import LoginForm from './component/LoginForm.vue'
import LoginCode from './component/LoginCode.vue'
const active = ref(0)
const copyright = computed<string>(() => import.meta.env.VITE_APP_API_COPYRIGHT)
</script>
<style lang="scss" scoped>
@import '../../assets/scss/variable';
.login-page {
	width: 100vw;
	height: 100vh;
	display: flex;
	background: url('../../assets/images/login/background.png');
	background-size: 100% 100%;
	//是否能选取元素的文本
	user-select: none;
	padding: 20px;
	.m-top {
		margin-top: 25px;
	}
	//主要内容
	.container {
		width: 550px;
		height: 88%;
		background: url("@/assets/images/login/bg.png");
		position: relative;
		margin-right: 105px;
		box-shadow: 0 4px 53px 7px rgba(3, 23, 22, 0.3);
		display: flex;
		flex-direction: column;
		align-items: center;
		.title {
      position: relative;
      top: 20px;
			width: 250px;
			height: 80px;
			background: url('../../assets/images/login/logo.png');
			background-size: 100% 100%;
			margin-bottom: 30px;
		}
		.third-login {
			width: 370px;
			margin-top: 25px;
			font-size: 0.875rem;
			font-weight: 400;
			color: #fff;
			display: flex;
			align-items: center;
			.icon {
				margin: 0 8px;
				font-size: 1.5rem;
				color: #fff;
			}
			.first-icon {
				margin-left: 16px;
			}
			.register {
				opacity: 0.7;
			}
		}
		//条款
		.help {
			display: flex;
			div {
				width: 80px;
				height: 22px;
				font-size: 0.875rem;
				color: rgba(0, 0, 0, 0.45);
				display: flex;
				justify-items: center;
				align-items: center;
			}
		}
		.copy-right {
			margin: 8px 0 40px 0;
			font-size: 0.75rem;
			color: rgba(0, 0, 0, 0.45);
		}
	}
}
</style>
