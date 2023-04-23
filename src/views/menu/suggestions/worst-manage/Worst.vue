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
      <!--      <template v-slot:operation>-->
      <!--        <a-button type="primary" @click="useMangeMethod.handleUpdate(undefined)">新增</a-button>-->
      <!--      </template>-->
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
import Add from './Add.vue'
import Detail from './Detail.vue'
import requestMethodWorst from '../../../../api/menu/worst'
import {WorstVo} from "../../../../entity/menu/worst";
import DrawerHeader from '../../../../components/drawer/DrawerHeader.vue'
import {ref} from "vue";
import {drawerMethod, manageMethod} from "../../../../components/form/method";
import {OperationProps} from "../../../../components/table/table-help";
import {messageMethod} from "../../../../utils/message-util";
const action=ref(requestMethodWorst.page)
//使用抽屉-查看功能共用方法
const useDrawerMethod=drawerMethod()
const useMangeMethod = manageMethod()
//查看面板
const panel=useDrawerMethod.panel
//获取manage页面共用的方法
const update = useMangeMethod.update
const baseTable=ref<InstanceType<typeof BaseTable>>(null)
//操作信息
const operation=ref<OperationProps<WorstVo>[]>([
  {
    title:'详情',
    action: (vo:WorstVo) =>useDrawerMethod.open(vo)
  },
  {
    title:'回复',
    action: (vo:WorstVo) =>useMangeMethod.handleUpdate(vo)
  },
  {
    title:'删除',
    danger:true,
    action:(vo:WorstVo) => {
      requestMethodWorst.delete(vo.id).then(res =>{
        messageMethod.success(res.message)
        useMangeMethod.refresh()
      })
    }
  }
])
</script>

<style scoped lang="scss">

</style>