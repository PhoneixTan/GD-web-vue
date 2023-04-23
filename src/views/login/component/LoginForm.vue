<!--表单-->
<template>
	<a-form :model="formData" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
		<a-form-item :rules="[{ required: true, message: '请输入账号/手机号码/邮箱' }]" name="userAccount">
			<a-input v-model:value.trim="formData.userAccount" placeholder="请输入账号/手机号码/邮箱" class="form-item">
				<template #prefix>
					<user-outlined class="icon" />
				</template>
			</a-input>
		</a-form-item>
		<a-form-item :rules="[{ required: true, message: '请输入密码' }]" name="password">
			<a-input-password v-model:value.trim="formData.password" placeholder="请输入密码" class="form-item">
				<template #prefix>
					<LockOutlined class="icon" />
				</template>
			</a-input-password>
		</a-form-item>
		<div class="password">
			<a-checkbox class="remember" v-model:checked="formData.remember">记住密码</a-checkbox>
			<div class="spacer"></div>
			<span class="forget">忘记密码</span>
		</div>
		<a-button class="submit-button" html-type="submit" type="primary">登录</a-button>
	</a-form>
</template>
<script lang="ts" setup>
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { reactive } from 'vue'
import { messageMethod } from '../../../utils/message-util'
import requestMethod from '../../../api/login/login'
import { JSEncrypt } from 'jsencrypt'
import { useSystemStore } from '../../../store/system'
import { useUserStore } from '../../../store/user'
import { useRouter } from 'vue-router'

interface FormData {
	userAccount: string
	password: string
	remember: boolean
}

//使用系统缓存和用户信息缓存
const router = useRouter()
const systemStore = useSystemStore()
const userStore = useUserStore()

/**
 * ref()函数使变量拥有双向绑定的属性
 * ref对象，真实类型是RefImpl
 * 好处：区分需要界面显示的变量和只参与script内部运算的变量，从而不做不必要的数据绑定，提高开发的性能
 * reactive()
 * 真实类型是Proxy
 * const a = ref('123') a.value
 * const b = reactive({c: 1}) b.c
 */
//创建表单数据
const formData = reactive<FormData>({
	userAccount: '',
	password: '',
	remember: true
})
/**
 * 提交表单且数据验证成功后回调事件
 * @param params
 */
const onFinish = async (params: FormData) => {
	messageMethod.success('登录环境安全验证中...')
	//无需.then获取rsa信息
	const rsa = await requestMethod.rsa()
	const { publicKey, rsaKey } = rsa.data
	//加密密码信息
	const encrypt = new JSEncrypt({})
	encrypt.setPublicKey(publicKey)
	const password = encrypt.encrypt(params.password)
	//执行登录
	const { data } = await requestMethod.login({
		...params, //解构params
		password,
		rsaKey,
		siteCode: 'manage'
	})
	//设置系统信息缓存
	systemStore.setToken(data.authToken)
	//设置用户信息缓存
	userStore.setInfo(data)
	//提示登陆成功
	messageMethod.success('登录成功')
	//跳转到首页
	setTimeout(() => {
		router.push('/')
	}, 1000)
}

/**
 * 提交表单且数据验证失败后回调事件
 * @param errorInfo
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
.password {
	display: flex;
	.remember {
		font-size: 0.875rem;
		color: #fff;
	}
}
.submit-button {
	width: 368px;
	height: 40px;
	background-color: $primary-color-400;
	border-radius: 4px;
	border: none;
	margin-top: 25px;
}
</style>
