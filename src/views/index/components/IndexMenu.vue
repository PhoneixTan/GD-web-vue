<template>
	<div class="main-menu">
    <a-menu mode="inline" v-model:open-keys="openKeys" v-model:selected-keys="selectKeys">
      <menu-item v-for="item of menus" :key="item.id" :menu="item" @onItemClick="clickMenu"></menu-item>
    </a-menu>
  </div>
</template>



<script lang="ts" setup>
import MenuItem from './MenuItem.vue'
import {useMenuStore} from "../../../store/menu";
import {computed, onMounted, ref} from "vue";
import {SystemMenu} from "../../../entity/system/system-menu";
import {useRoute, useRouter} from "vue-router";
const menuStore =useMenuStore()
const router=useRouter()
const menus=computed( ()=>menuStore.currentMenu?.children || [])
//当前展开的sunMenu菜单项的key数组
const openKeys=ref<string[]>([])
//当前选择菜单项key数组
const selectKeys=ref<string[]>([])

router.afterEach((to,from)=> {
  menuUpdate(decodeURI(to.path))
})
/**
 * 从地址首次进入，需要打开左侧的菜单
 */
onMounted( ()=> {
  let route =useRoute()
  console.log(route.path)
  if(selectKeys.value.length<=0) {
    menuUpdate(decodeURI(route.path))
  }
})

/**
 * 更新菜单
 */
function menuUpdate(path:string) {
  //从地址首次进入，需要打开左侧的菜单
  let systemMenu=menuStore.menuMap[path]
  if(!systemMenu) return
  console.log(systemMenu)
  const menuIds =systemMenu.menuIds
  if (menuIds && menuIds.length >=0) {
    menuStore.setIndexById(menuIds[0] || '')
  }
  //当前选中的菜单项
  selectKeys.value = [systemMenu.id]
  //当前打开的item id
  if (systemMenu.menuIds) {
    openKeys.value=openKeys.value.concat(systemMenu.menuIds)
  }
}
/**
 * 菜单点击事件
 * @param item
 */
function clickMenu(item:SystemMenu) {
  if(!item.linkUrl) return
  const pattern = /^(((http|https|ftp)):\/\/)/
  //test() 方法用于检测一个字符串是否匹配某个模式.
  if (pattern.test(item.linkUrl)) {
    window.open(item.linkUrl,'_blank')
  }else {
    router.replace(item.linkUrl)
  }
}
</script>
<!--menu下拉菜单 导航菜单-->
<!--自动完成-->
<!--input输入框  form表单 表格-->
<style lang="less" scoped>
@import '../../../assets/scss/theme';
.main-menu {
	width: @menu-width;
	background: @primary-color;
	overflow-y: scroll;
	user-select: none;
	//隐藏滚动条
	scroll-width: none;
	-ms-overflow-style: none;
	&::-webkit-scrollbar {
		display: none;
	}
	//---
}
</style>
