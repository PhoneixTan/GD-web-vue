/**
 * 状态管理
 */
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
import { createApp } from 'vue'
import App from './App.vue'
import { getRouter } from './router'
//蚂蚁
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import './assets/scss/theme.less'
createApp(App)
    .use(Antd)
    // 使用pinia代替vuex缓存
    .use(createPinia().use(piniaPluginPersist))
    .use(getRouter())
    .mount('#app')
