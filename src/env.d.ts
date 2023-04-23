/// <reference types="vite/client" />

declare module '*.vue' {
	import type { DefineComponent } from 'vue'
	// eslint-disable-next-line @typescript-eslint/ban-types
	const component: DefineComponent<{}, {}, any>
	export default component
}
interface ImportMetaEnv {
	// 登录接口地址
	readonly VITE_APP_API_LOGIN: string
	// 登出接口地址
	readonly VITE_APP_API_LOGIN_OUT: string
	// 登录接口地址
	readonly VITE_APP_API_BASE_URL: string
	// copyright（登录页面版权信息）
	readonly VITE_APP_API_COPYRIGHT: string
	// oss前缀地址
	readonly VITE_APP_API_OSS_URL: string
	// oss水印后缀
	readonly VITE_APP_API_OSS_SUFFIX: string
	// oss上传地址
	readonly VITE_APP_API_OSS: string
	// 短信api
	readonly VITE_APP_API_MESSAGE: string
	// 短信登录api接口
	readonly VITE_APP_API_CODE_LOGIN: string
	// 短信登录api的接口的手机号码参数
	readonly VITE_APP_API_CODE_LOGIN_PARAMS_MOBILE: string
	// 短信登录api的接口的验证码参数
	readonly VITE_APP_API_CODE_LOGIN_PARAMS_CODE: string
	// 在线预览地址
	readonly VITE_APP_API_ONLINE_PREVIEW_URL: string
}
interface ImportMeta {
	readonly env: ImportMetaEnv
}
