<template>
  <div class="page">
    <base-table
        ref="baseTable"
        :search="search"
        :columns="columns"
        :action="action"
        :operation="operation"
        :max-operation="5"
        :operationFixed="'right'"
    >
      <template v-slot:operation>
        <a-button type="primary" @click="useMangeMethod.handleUpdate(undefined)">新增</a-button>
      </template>
    </base-table>
    <a-drawer destroy-on-close placement="right" :closable="false" :mask-closable="false" :visible="update.visible" :width="update.width">
      <template #title>
        <drawer-header :drawer-params="{ title: update?.title, id: update?.id }" @close="update.visible = false"></drawer-header>
      </template>
      <Add :id="update.id" @cancel="update.visible = false" @refresh="useMangeMethod.refresh()" />
    </a-drawer>
    <!--    查看面板-->
    <a-drawer :visible="panel.visible" :width="panel.width" :closable="false" :mask-closable="false" placement="right" destroy-on-close>
      <template #title>
        <drawer-header :drawer-params="{id:panel.id,title:panel.title}" @close="panel.visible=false"></drawer-header>
      </template>
      <Detail :id="panel.id" @cancel="panel.visible=false" />
    </a-drawer>
  </div>
</template>

<script lang="ts" setup>
import BaseTable from '@/components/table/BaseTable.vue'
import search from "./search";
import columns from "./columns";
import requestMethodHotel from '../../../../api/menu/hotel'
import DrawerHeader from '../../../../components/drawer/DrawerHeader.vue'
import {drawerMethod, manageMethod} from "../../../../components/form/method";
import {ref} from "vue";
import Add from './ADD.vue'
import Detail from './Detail.vue'
import {OperationProps} from "../../../../components/table/table-help";
import {HotelVo} from "../../../../entity/menu/hotel";
import {messageMethod} from "../../../../utils/message-util";
//列表查询信息api
const action =ref(requestMethodHotel.page)
//使用抽屉共用的方法-查看功能共用方法
const useDrawerMethod=drawerMethod()
//查看面板
const panel=useDrawerMethod.panel
//获取manage页面共用的方法
const useMangeMethod = manageMethod()
const update = useMangeMethod.update
const baseTable=ref<InstanceType<typeof BaseTable>>(null)
//列表操作信息
const operation=ref<OperationProps<HotelVo>[]>([
  {
    title:'详情',
    action: (vo:HotelVo) =>useDrawerMethod.open(vo)
  },
  {
    title:'编辑',
    action:(vo:HotelVo)=>useMangeMethod.handleUpdate(vo)
  },
  {
    title: '删除',
    danger: true,
    action: (vo: HotelVo) => {
      requestMethodHotel.delete(vo.id).then(res => {
        messageMethod.success(res.message)
        // baseTable.value?.pageRequest()
        useMangeMethod.refresh()
      })
    }
  },

])
</script>

<style scoped lang="scss">
.page {
  :deep(.ant-image-img) {
    height:100%;
    object-fit: cover; //用于规定应该如何调整<img>或者<video>的大小来适应其容器
  }
}
</style>