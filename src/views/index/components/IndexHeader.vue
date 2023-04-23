<template>
  <div class="main-header">
    <!--面包屑-->
    <div class="menu-name">{{ menuName }}</div>
    <div class="spacer"></div>
    <!--搜索菜单 ant-自动完成-->
    <a-auto-complete :options="menuOptions" :fieldNames="{value:'displayName',label:'displayName'}" :filterOption="filterOption" @select="selectOption">
      <template #default>
        <a-input placeholder="搜索菜单" allowClear></a-input>
      </template>
    </a-auto-complete>
    <!--消息图标 ant徽标-->
    <a-badge class="icon" count="0">
      <bell-outlined />
    </a-badge>
    <!--个人信息 ant下拉菜单-->
    <a-dropdown>
      <div class="info">
        <a-avatar :size="32">
          <template #icon>
            <img v-if="userStore.avatar" :src="userStore.avatar" />
            <user-outlined v-else />
          </template>
        </a-avatar>
        <div class="user-name">{{ userStore.userName }}</div>
        <down-outlined />
      </div>
      <!--个人信息菜单-->
      <template #overlay>
        <a-menu>
          <a-menu-item key="info" @click="handleInfo">
            <user-outlined />
            个人信息
          </a-menu-item>
          <a-menu-item key="setting" @click="handleSetting">
            <setting-outlined />
            个人设置
          </a-menu-item>
          <a-menu-item key="clearCache" @click="handleClearCache">
            <clear-outlined />
            清除缓存
          </a-menu-item>
          <a-menu-item key="loginOut" @click="handleLoginOut">
            <login-outlined />
            退出登录
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script lang="ts" setup>
import {computed, onMounted, ref, watchEffect} from 'vue'
import requestMethod from '../../../api/login/login'
import { BellOutlined, UserOutlined, DownOutlined, SettingOutlined, ClearOutlined, LoginOutlined } from '@ant-design/icons-vue'
import { useUserStore } from '../../../store/user'
import {useRoute, useRouter} from 'vue-router'
import { useRequestStore } from '../../../store/request'
import { messageMethod } from '../../../utils/message-util'
import { useSystemStore } from '../../../store/system'
import {useMenuStore} from "../../../store/menu";
import {SystemMenu} from "../../../entity/system/system-menu";

const userStore = useUserStore()
const requestStore = useRequestStore()
const systemStore = useSystemStore()
const router = useRouter()
const route=useRoute()
const menuStore=useMenuStore()
//面包屑
const menuName = ref('')

onMounted( ()=> {
  menuStore.registerMenu()
})
/**
 * watch('监听的属性',(newval,oldval)=>{},{
 *   deep:true
 *   immediate:true
 * })
 */
watchEffect( ()=>{
  let systemMenu = menuStore.menuMap[route.path]
  console.log(systemMenu,route.path);
  if(systemMenu) {
    menuName.value=systemMenu.displayName?.split(',').slice(1).join(' . ')?? ''
      } else {
    menuName.value=''
  }
})
/**
 * 自动完成数据源处理
 */
const menuOptions=computed(()=>{
  console.log(menuStore.menuMap);
  return Object.values(menuStore.menuMap)
      .filter(value => value.menuLevel>2&&value.isShow&&value.children.length===0)
      .map(menu=>{
        return{
          ...menu,
          //'基础信息,邻里场景,活动管理'=>['基础信息',邻里场景','活动管理']=>=>[邻里场景','活动管理']=>‘邻里场景-活动管理’
          displayName:menu.displayName.split(',').slice(1).join('-')
        }
      })
})

/**
 * 过滤菜单
 * @param inputValue
 * @param option
 */
function filterOption(inputValue:string,option:SystemMenu){
  return option.displayName?.indexOf(inputValue)>=0||false
}

/**
 *选中菜单
 * @param value
 * @param option
 */
function selectOption(value:string,option:SystemMenu) {
  //判断是否存在url
  if (!option.linkUrl) return
  //判断菜单地址是否是http或者https或者ftp开头
  const pattern = /^(((http|https|ftp)):\/\/)/

  if(pattern.test(option.linkUrl)) {
    //若是，就是网址，新开窗口调整
    window.open(option.linkUrl,'_blank')
  } else {
    //否则，就是本地网址，router跳转
    router.replace(option.linkUrl)
  }

}
/**
 * 个人信息
 */
function handleInfo() {
  //进入个人信息页面
  /**
   * push:跳转到指定的url,向history栈添加一个新的记录,点击后退会返回至上一个页面
   * replace:跳转到指定的url,替换history栈中最后一个记录,点击后退会返回至上上一个页面
   */
  router.replace('/account/information')
}

/**
 * 个人信息设置
 */
function handleSetting() {
  router.replace('/account/information/detail')
}

/**
 * 清除缓存信息
 */
function handleClearCache() {
  requestStore.$reset()
  messageMethod.success('清除缓存成功')
}

/**
 * 退出登录
 */
async function handleLoginOut() {
  const { message } = await requestMethod.loginOut()
  messageMethod.success(message)
  //清空系统缓存
  systemStore.setToken('')
  //清空用户信息
  userStore.clearInfo()
  //返回登录
  await router.replace('/login')
}
/**
 * listMyMenu获取当前用户的权限菜单
 * 1.获取所有的一级菜单，筛选isshow=1的一级菜单
 * 2.获取一级菜单下的所有子菜单，筛选出isshow=1的子菜单
 * 3.渲染菜单
 * 4.设置menuMap的map对象，以菜单中的linkUrl作为map对象的key值
 * 对应的菜单对象为map对象的value值
 * 5. {
 *   ‘、neighbo
 * }
 */
</script>

<style lang="scss" scoped>
.main-header {
  height: 64px;
  background-color: #fff;
  box-shadow: 0 5px 15px 3px rgba(4, 32, 24, 0.15);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 24px;
  z-index: 2;
  .menu-name {
    font-size: 1rem;
    color: #232d2c;
    font-weight: 700;
  }
  .icon {
    width: 14px;
    height: 14px;
    margin: 0 12px;
  }
  .info {
    display: flex;
    align-items: center;
    margin-left: 24px;
    .user-name {
      margin: 0 8px;
      font-size: 0.875rem;
      color: rgba(0, 0, 0, 0.65);
    }
  }
}
</style>
