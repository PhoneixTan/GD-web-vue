<template>
  <drawer-base-info v-if="props.id" :detail="formState"/>
  <a-form
      ref="formRef"
      v-if="useUpdateMethod.visible"
      :model="formState"
      :label-col="useUpdateMethod.formLabelCol"
      :wrapper-col="useUpdateMethod.formWrapperCol"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="useUpdateMethod.formFail"
  >
    <a-form-item label="文化场馆名称" name="venuesName">
      {{formState.venuesName}}
    </a-form-item>
    <a-form-item label="文化场馆地址" name="venuesAddress">
      {{formState.venuesAddress}}
    </a-form-item>
    <a-form-item label="文化场馆描述" name="venuesEvaluate">
      {{formState.venuesEvaluate}}
    </a-form-item>
    <a-form-item label="文化场馆图片" name="venuesPic">
      <a-image v-for="(item, index) in fileList" :key="`image_${index}`" :width="120" :height="80" :src="item" />
    </a-form-item>
    <a-form-item label="入园高峰数量" name="venuesMaxpeak">
      {{formState.venuesMaxpeak}}
    </a-form-item>
    <a-form-item label="今日累计流量" name="venuesTotal">
      {{formState.venuesTotal}}
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import {updateMethod} from "../../../../components/form/method";
import {onMounted, reactive, ref, watch} from "vue";
import {BaseUtil} from "../../../../utils/base-util";
import {messageMethod} from "../../../../utils/message-util";
import {QueryObjectType} from "../../../../http/request-model";
import requestMethodVenus from "../../../../api/menu/must/venus";
import {VenusVo} from "../../../../entity/menu/must/venus";

const props=defineProps<{id:string}>()
//使用操作页面的共用方法
const useUpdateMethod=updateMethod()
//表单提交对象
const formState=reactive<VenusVo>({
  //  主键id
  id:'',
  //备注
  memo:'',
  //  地址
  venuesAddress:'',
  //文化馆描述
  venuesEvaluate:'',
  // 文化馆介绍
  venuesIntroduce:'',
  //最大高峰
  venuesMaxpeak:'',
  // 标题
  venuesName:'',
  // 电话号码
  venuesPhone:'',
  //文化馆图片
  venuesPic:'',
  //累计
  venuesTotal:'',

})
onMounted(async () => {
  await getDetailById()
})
async function onFinish(params:VenusVo) {
  const data = {
    ...(params as unknown as QueryObjectType),
    version: formState.version || 0
  }
  if (props.id) {
    //提交编辑表单
    const { message } = await requestMethodVenus.update({ ...data, id: props.id })
    messageMethod.success(message)
    useUpdateMethod.handleSave()
  } else {
    //提交新增表单
    const { message } = await requestMethodVenus.add(data)
    messageMethod.success(message)
    useUpdateMethod.handleSave()
  }
}

const fileList = ref<string[]>([])
async function getDetailById() {
  if (props.id) {
    const { data } = await requestMethodVenus.getByVenusId(props.id)
    console.log(props.id)
    Object.assign(formState, data)
    fileList.value = formState.venuesPic.split(',').map(file => {
      return BaseUtil.getUploadPath(file)
    })
  }
}

</script>

<style scoped lang="scss">

</style>