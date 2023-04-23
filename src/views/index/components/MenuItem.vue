<template>
  <!--如果没有子菜单，那么直接显示-->
    <a-menu-item v-if="props.menu.isShow && menuChildren.length ===0" :key="props.menu.id" @click.stop="clickMenu(props.menu)">
      <template #icon class="menu">
        <a-icon v-if="props.menu.icon" :icon="props.menu.icon"></a-icon>
      </template>
      <div>{{props.menu.menuName}}</div>
    </a-menu-item>
  <!--如果有子菜单，显示子菜单-->
  <a-sub-menu v-else-if="props.menu.isShow" :key="props.menu.id">
    <template #icon>
      <a-icon v-if="props.menu.icon" :key="props.menu.icon"></a-icon>
    </template>
    <template #title>
      <div>{{props.menu.menuName}}</div>
    </template>
    <template v-for="subMenu of menuChildren">
      <!--如果有子菜单，调用menuItem组件-->
      <menu-item v-if="subMenu.children.length > 0" :key="subMenu.id" :menu="subMenu" @onItemClick="clickMenu"></menu-item>
      <!--如果么有子菜单，直接显示-->
      <a-menu-item v-else-if="subMenu.isShow" :key="subMenu.id" @click.stop="clickMenu(subMenu)">{{subMenu.menuName}}</a-menu-item>
    </template>
  </a-sub-menu>
</template>
<script setup lang="ts">
import {SystemMenu} from "../../../entity/system/system-menu";

const props=defineProps<{menu:SystemMenu}>()
let emits = defineEmits<{(e:'onItemClick',menu:SystemMenu):void}>()
//子菜单
const menuChildren=props.menu.children || []

/**
 * 点击菜单
 * @param item
 */
function clickMenu(item:SystemMenu) {
  emits('onItemClick',item)
}
</script>
<style scoped lang="scss">

</style>