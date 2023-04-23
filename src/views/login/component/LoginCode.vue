<template>
	<a-form :model="formData" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
		<a-form-item :rules="[{ required: true, message: '请输入手机号码' }]" name="mobile">
			<a-input v-model:value.trim="formData.mobile" placeholder="请输入手机号码" class="form-item">
				<template #prefix>
					<mobile-outlined class="icon"></mobile-outlined>
				</template>
			</a-input>
		</a-form-item>
		<a-form-item :rules="[{ required: true, message: '请输入验证码' }]" name="code">
			<a-input v-model:value.trim="formData.code" placeholder="请输入验证码" class="form-item">
				<template #prefix>
					<message-outlined class="icon"></message-outlined>
				</template>
				<template #suffix>
					<div class="code" :class="{ disabled: codeDisabled }" @click="sendCode">发送验证码{{ showTime ? '(' + downTime + 's)' : '' }}</div>
				</template>
			</a-input>
		</a-form-item>
		<a-button class="submit-button" html-type="submit" type="primary">登录</a-button>
	</a-form>
</template>
<script lang="ts" setup>
import { MobileOutlined, MessageOutlined } from '@ant-design/icons-vue'
import { computed, onUnmounted, reactive, ref } from 'vue'
import { isPhone } from '../../../utils/verification-util'
import { messageMethod } from '../../../utils/message-util'
import requestMethod from '../../../api/login/login'
import { useRouter } from 'vue-router'
import { useSystemStore } from '../../../store/system'
import { useUserStore } from '../../../store/user'

interface FormData {
	mobile: string
	code: string
	checked: boolean
}

const router = useRouter()
const systemStore = useSystemStore()
const userStore = useUserStore()

const formData = reactive<FormData>({
	mobile: '',
	code: '',
	checked: true
})

//验证码倒计时
const downTime = ref(60)
//定义计时器
let interval: unknown = null
//是否显示时间
const showTime = computed(() => {
	return downTime.value < 60
})
const codeDisabled = computed(() => {
	return formData.mobile.length != 11 || downTime.value < 60
})

//定义方法也可以↓
//const sendCode (() => {
// })
//发送验证码
async function sendCode() {
	//验证码倒计时是否结束
	if (codeDisabled.value) return
	//输入正确的手机号码
	if (!isPhone(formData.mobile)) {
		messageMethod.info('请输入正确的手机号码')
		return
	}
	//验证码倒计时
	interval = setInterval(() => {
		downTime.value -= 1
		if (downTime.value <= 0) {
			downTime.value = 60 //重置计时器
			if (interval) clearInterval(interval as number) //清除计时器
		}
	}, 1000)
	//请求验证码，发送验证码
	if (import.meta.env.VITE_APP_API_MESSAGE) {
		await requestMethod.getCode({ mobile: formData.mobile })
	}
	//提示信息：验证码发送成功，请注意查收
	messageMethod.info('提示信息：验证码发送成功，请注意查收')
}
onUnmounted(() => {
	if (interval) clearInterval(interval as number)
})

/**
 * 提交表单且数据验证成功后回调事件
 * @param params
 */
const onFinish = async (params: FormData) => {
	// 判断VITE_APP_API_CODE_LOGIN是否存在
	if (!import.meta.env.VITE_APP_API_CODE_LOGIN) return
	// 获取mobileKey(LOGIN_PARAMS_MOBILE),codeKey(LOGIN_PARAMS_MOBILE)
	const mobileKey = import.meta.env.VITE_APP_API_CODE_LOGIN_PARAMS_MOBILE
	const codeKey = import.meta.env.VITE_APP_API_CODE_LOGIN_PARAMS_CODE
	// 提示登陆环境安全验证中
	messageMethod.success('登陆环境安全校验中. . .')
	// 执行登录
	const { data } = await requestMethod.loginByCode({
		...params,
		[mobileKey ?? 'mobile']: params.mobile,
		[codeKey ?? 'code']: params.code,
		siteCode: 'message'
	})
	// 设置系统信息缓存
	systemStore.setToken(data.authToken)
	// 设置用户信息缓存
	userStore.setInfo(data)
	// 提示成功
	messageMethod.success('注册成功,请登录')
	// 跳转到首页
	setTimeout(() => {
		router.push('/login')
	}, 1000)
}
/**
 * 提交表单数据验证失败后回调事件
 * @param params
 */
const onFinishFailed = (errorInfo: any) => {
	messageMethod.error(errorInfo)
}
</script>
<style lang="scss" scoped>
@import '../../../assets/scss/variable';
.icon {
	color: rgba(0, 0, 0, 0.25);
}
//输入框
.form-item {
	width: 370px;
	height: 40px;
	background: white;
	border-radius: 4px;
}
.submit-button {
	width: 368px;
	height: 40px;
	background-color: $primary-color-400;
	border-radius: 4px;
	border: none;
	margin-top: 25px;
}
.code {
	font-size: 15px;
	color: #2278e6;
}
.disabled {
	color: #999;
}
</style>
