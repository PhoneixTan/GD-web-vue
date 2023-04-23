<template>
  <div class="main-page">
    <!--logo-->
    <div class="main-logo">
      <div class="logo">
        <img src="../assets/images/login/logo.png" style="width: 120px;height: 48px;" />
      </div>

    </div>
    <!--顶部导航栏-->
    <index-header class="main-header"></index-header>
    <!--侧边菜单栏-->
    <index-menu class="main-aside"></index-menu>
    <!--主体内容-->
    <div class="main-content">
      <router-view :key="$route.fullPath" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import IndexHeader from '@/views/index/components/IndexHeader.vue'
import IndexMenu from '@/views/index/components/IndexMenu.vue'
// import LogoIcon from '../assets/images/login/logo.png'
</script>
<style lang="less" scoped>
@import '../assets/scss/theme';
//grid宫格布局
.main-page {
  height: 100vh;
  background-color: #f0f2f5;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
  'logo header'
  'aside content';
  .main-logo {
    //grid-area: logo;
    height: 64px;
    background-color: @primary-color;
    display: flex;
    justify-content: center; //水平方向
    align-items: center; //垂直方向
    .logo {

      ////background-color: #12b8af;
      width: @menu-header-logo-width;
      height: @menu-header-logo-height;
      background: @menu-header-logo-url;
      background-size: 100% 100%;
    }
  }
  .main-header {
    grid-area: header;
  }
  .main-aside {
    grid-area: aside;
  }
  .main-content {
    grid-area: content;
    padding: 30px;
    box-sizing: border-box;
    overflow: hidden;
    user-select: auto;
    background-color: #fff;
    //隐藏滚动条
    //firefox(火狐)
    scroll-width: none;
    //IE  system10+
    -ms-overflow-style: none;
    //Google 谷歌
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>