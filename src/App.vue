<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import 'dayjs/locale/zh-cn'
export default defineComponent({
  setup() {
    return {
      locale: zhCN
    }
  }
})
</script>
<style lang="scss">
.page {
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 5px 15px 3px #04201826;
  display: flex;
  flex-direction: column;
  //flex: 1 1 auto;
  height: 100%;
}
/*
占位符
*/
.spacer {
  flex: 1 1 auto;
}
.spacer-2 {
  flex: 2 1 auto;
}
</style>